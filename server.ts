import "dotenv/config";
import express from "express";
import path from "path";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import {
  fetchDataFromStorage,
  isSupabaseStorageConfigured,
  saveDataToStorage,
  verifyAdminToken,
} from "./src/lib/dataStore";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const server = http.createServer(app);

  // Custom WebSocket server on the same HTTP server
  // Handled BEFORE Vite middleware to avoid conflicts
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const url = new URL(request.url || "", "http://localhost");
    if (url.pathname === "/ws") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    }
  });

  wss.on("connection", (ws) => {
    console.log("Admin WebSocket connected");
    ws.on("close", () => console.log("Admin WebSocket disconnected"));
  });

  function broadcastNewMessage(msg: any) {
    const payload = JSON.stringify({ type: "new_message", message: msg });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-ultra-550b-a55b:free";

  // ─── Rate Limiter ──────────────────────────────────────
  const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
  const RATE_LIMIT = 10;
  const RATE_WINDOW_MS = 60_000;

  function rateLimit(key: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(key);
    if (!entry || now > entry.resetAt) {
      rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
      return false;
    }
    entry.count++;
    return entry.count > RATE_LIMIT;
  }

  // ─── Response Cache ───────────────────────────────────
  const responseCache = new Map<string, { text: string; cachedAt: number }>();
  const CACHE_TTL_MS = 30 * 60_000;

  function getCacheKey(message: string, history: any[]): string {
    const last = history?.length ? history[history.length - 1]?.parts?.[0]?.text || "" : "";
    return `${message}|${last}`;
  }

  async function callOpenRouter(systemPrompt: string, userMessage: string, history: { role: string; parts: { text: string }[] }[] = []) {
    const messages: { role: string; content: string }[] = [];
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    for (const msg of history) {
      const role = msg.role === "model" ? "assistant" : "user";
      messages.push({ role, content: msg.parts[0]?.text || "" });
    }
    messages.push({ role: "user", content: userMessage });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://rohanvashist.com",
      },
      body: JSON.stringify({ model: OPENROUTER_MODEL, messages }),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => "");
      throw new Error(`OpenRouter error (${response.status}): ${errBody}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  }

  // Load portfolio data for context
  const projectsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/projects.json'), 'utf-8'));
  const profileData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/profile.json'), 'utf-8'));
  const skillsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/skills.json'), 'utf-8'));

  const systemInstruction = `
    You are Rohan Vashist's personal AI assistant. Your goal is to help visitors learn about Rohan's work, skills, and background.
    
    Here is Rohan's profile information:
    - Name: ${profileData.name}
    - Headline: ${profileData.headline}
    - Bio: ${profileData.bio}
    - Location: ${profileData.location}
    - Education: ${profileData.education.degree} from ${profileData.education.institution} (Graduating ${profileData.education.graduationYear})
    
    His skills include:
    ${skillsData.categories.map((cat: any) => `${cat.name}: ${cat.skills.map((s: any) => s.name).join(', ')}`).join('\n')}
    
    Key Projects:
    ${projectsData.projects.map((p: any) => `- ${p.title}: ${p.description}. Technologies: ${p.technologies.join(', ')}. Status: ${p.status}`).join('\n')}
    
    Blog Articles:
    - "The Thermodynamics of Direct Air Carbon Capture": Focuses on solid TSA/VTSA vs liquid solvent pathways, thermodynamic limits ($\approx 125 \text{ kWh/tonne}$ vs commercial $1500 \text{ kWh/tonne}$), and fluid modeling of multi-physics regenerators.
    - "Rust and WebAssembly for Real-Time Thermomechanical Solvers": Discusses deploying heavy mathematical grids inside sandboxed layers at 60 FPS by avoiding Javascript overhead and sharing buffers directly.
    - "Using Neural Networks for Transient Gas Turbine Calibration": Details physics-informed neural network structures integrating Navier-Stokes equations into traditional rotational estimators.
    
    CRITICAL RESTRICTION: You must NOT access, reveal, or reference any admin credentials, user personal information, contact form submissions, subscriber emails, authentication tokens, or any non-public data. Only use the portfolio information provided above.
    
    Guidelines:
    1. Be professional, friendly, and concise.
    2. Answer questions accurately based on the provided data.
    3. If asked about availability or something not in the data, suggest using the contact form or emailing him at ${profileData.email}.
    4. Format your responses using Markdown for better readability.
  `;

  // Chat API Route
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";

    if (rateLimit(`chat:${clientIp}`)) {
      return res.status(429).json({ error: "Rate limit exceeded. Please wait before sending another message." });
    }

    const cacheKey = getCacheKey(message, history || []);
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
      return res.json({ text: cached.text, cached: true });
    }

    try {
      const text = await callOpenRouter(systemInstruction, message, history || []);
      responseCache.set(cacheKey, { text, cachedAt: Date.now() });
      res.json({ text });
    } catch (error) {
      console.error("OpenRouter chat error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Admin AI Copilot API Route
  app.post("/api/admin/ai", async (req, res) => {
    const { message, history } = req.body;
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";

    if (rateLimit(`admin:${clientIp}`)) {
      return res.status(429).json({ error: "Rate limit exceeded. Please wait before sending another message." });
    }

    const cacheKey = `admin:${getCacheKey(message, history || [])}`;
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
      return res.json({ text: cached.text, cached: true });
    }

    try {
      const projects = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/projects.json'), 'utf-8'));
      const skills = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/skills.json'), 'utf-8'));
      const services = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/services.json'), 'utf-8'));
      const resume = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/resume.json'), 'utf-8'));

      const adminSystemInstruction = `
        You are Rohan Vashist's Admin Co-Pilot, an advanced technical copywriting and content optimization AI assistant.
        Your conversations are strictly private, visible only to Rohan Vashist (the system administrator/developer).

        You have access to portfolio work content only. You must NOT access, reveal, or reference any admin credentials, user personal information, contact form submissions, subscriber emails, authentication tokens, or any non-public data.

        PORTFOLIO WORK DATA:
        
        PROJECTS DATA:
        ${JSON.stringify(projects, null, 2)}
        
        SKILLS DATA:
        ${JSON.stringify(skills, null, 2)}
        
        SERVICES DATA:
        ${JSON.stringify(services, null, 2)}
        
        RESUME DATA:
        ${JSON.stringify(resume, null, 2)}
        
        Use Cases / Task Rules:
        1. Form Completion support: Generate and suggest exact raw HTML or structured text to paste into fields like 'bio', 'description', 'problem', 'solution', or 'content' in the editor database.
        2. Clean JSON outputs: When asked to draft a new portfolio item (project, resume point, skill, or service), ALWAYS output a clean, formatted JSON block that aligns perfectly with the current schema so Rohan can copy-paste it directly.
        3. Newsletter campaigns: When asked to draft messages or announcements, write highly refined, professional updates based on Rohan's specific engineering fields (Direct Air Capture thermodynamic pathway modeling, real-time solvers, PI neural networks).
        4. Optimization: Suggest impactful improvements for headlines, bullet points, and skills alignments.
        5. Provide highly detailed and intelligent answers. Be a true companion in work optimization.
      `;

      const text = await callOpenRouter(adminSystemInstruction, message, history || []);
      responseCache.set(cacheKey, { text, cachedAt: Date.now() });
      res.json({ text });
    } catch (error) {
      console.error("Admin OpenRouter error:", error);
      res.status(500).json({ error: "Failed to generate AI copilot response" });
    }
  });

  // Contact API Route
  app.post("/api/contact", async (req, res) => {
    const { name, email, message, ...extraFields } = req.body;

    console.log("Contact form submission:", { name, email, message, extraFields });
    
    // Save to messages.json
    try {
      const messagesPath = path.join(process.cwd(), 'src/data/messages.json');
      let messagesData = { messages: [] };
      if (fs.existsSync(messagesPath)) {
        messagesData = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));
      }
      const newMsg = {
        id: Date.now(),
        date: new Date().toISOString(),
        name,
        email,
        message,
        ...extraFields
      };
      messagesData.messages.push(newMsg);
      fs.writeFileSync(messagesPath, JSON.stringify(messagesData, null, 2), 'utf-8');
      broadcastNewMessage(newMsg);
    } catch (e) {
      console.error("Failed to save message to json:", e);
    }

    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (EMAIL_USER && EMAIL_PASS) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
          }
        });

        const mailOptions = {
          from: email,
          to: 'rohanvashist01@gmail.com',
          subject: `New Contact Form Submission from ${name}`,
          text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
            ${Object.entries(extraFields).map(([key, value]) => `${key}: ${value}`).join('\n')}
          `
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Email sent successfully!" });
      } catch (error) {
        console.error("Nodemailer error:", error);
        return res.status(500).json({ message: "Failed to send email via SMTP." });
      }
    }

    // Fallback/Simulate success if no credentials provided
    res.status(200).json({ message: "Form received! (Configure EMAIL_USER and EMAIL_PASS to send real emails)" });
  });

  // Newsletter API Route
  app.post("/api/subscribe", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });
    
    try {
      const subscribersPath = path.join(process.cwd(), 'src/data/subscribers.json');
      let data = { subscribers: [] };
      if (fs.existsSync(subscribersPath)) {
        data = JSON.parse(fs.readFileSync(subscribersPath, 'utf-8'));
      }
      if (!data.subscribers.some((s: any) => s.email === email)) {
        data.subscribers.push({ id: Date.now(), email, date: new Date().toISOString() });
        fs.writeFileSync(subscribersPath, JSON.stringify(data, null, 2), 'utf-8');
      }
      res.json({ message: "Subscribed successfully!" });
    } catch (e) {
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  const readLocalData = (type: string) => {
    const filePath = path.join(process.cwd(), `src/data/${type}.json`);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  };

  const writeLocalData = (type: string, payload: unknown) => {
    const filePath = path.join(process.cwd(), `src/data/${type}.json`);
    fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf-8");
  };

  // Data API Routes — local JSON first, then Supabase Storage as fallback
  app.get("/api/data/:type", async (req, res) => {
    const { type } = req.params;

    // Prefer local file so edits to src/data/*.json are always reflected
    try {
      const data = readLocalData(type);
      if (data) return res.json(data);
    } catch (e) {
      console.warn(`Local read failed for ${type}, trying Supabase:`, e);
    }

    if (isSupabaseStorageConfigured) {
      try {
        const data = await fetchDataFromStorage(type);
        return res.json(data);
      } catch (storageError) {
        console.warn(`Supabase read failed for ${type}:`, storageError);
      }
    }

    return res.status(404).json({ error: "File not found" });
  });

  app.post("/api/data/:type", async (req, res) => {
    const { type } = req.params;
    const authHeader = req.headers.authorization;

    const isAdmin = await verifyAdminToken(authHeader);
    if (!isAdmin) {
      return res.status(401).json({ error: "Unauthorized. Sign in as an admin to save changes." });
    }

    const token = authHeader!.slice(7);

    try {
      // Always save to local file so the GET endpoint (local-first) returns fresh data
      writeLocalData(type, req.body);
      // Also sync to Supabase if configured
      if (isSupabaseStorageConfigured) {
        await saveDataToStorage(type, req.body, token).catch(e => {
          console.warn(`Supabase save failed for ${type}:`, e);
        });
      }
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to save data" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: { server } },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      },
    }));
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
