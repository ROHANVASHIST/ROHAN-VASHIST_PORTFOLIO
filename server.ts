import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
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

  // Initialize Gemini
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

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
    
    Guidelines:
    1. Be professional, friendly, and concise.
    2. Answer questions accurately based on the provided data.
    3. If asked about availability or something not in the data, suggest using the contact form or emailing him at ${profileData.email}.
    4. Format your responses using Markdown for better readability.
  `;

  // Chat API Route
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    try {
      const chat = ai.chats.create({
        model: "gemini-3.1-flash-lite", // Using a fast, efficient model for simple Q&A
        config: {
          systemInstruction,
        },
        history: history || [],
      });

      const result = await chat.sendMessage({ message });
      res.json({ text: result.text });
    } catch (error) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Admin AI Copilot API Route
  app.post("/api/admin/ai", async (req, res) => {
    const { message, history } = req.body;

    try {
      // Dynamically load current state of all database collections
      const projects = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/projects.json'), 'utf-8'));
      const profile = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/profile.json'), 'utf-8'));
      const skills = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/skills.json'), 'utf-8'));
      const services = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/services.json'), 'utf-8'));
      const resume = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/resume.json'), 'utf-8'));
      
      let subscribersCount = 0;
      try {
        const subs = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/subscribers.json'), 'utf-8'));
        subscribersCount = subs.subscribers?.length || 0;
      } catch {}

      const adminSystemInstruction = `
        You are Rohan Vashist's Admin Co-Pilot, an advanced technical copywriting and content optimization AI assistant.
        Your conversations are strictly private, visible only to Rohan Vashist (the system administrator/developer).

        You have real-time access to the live portfolio content:
        
        PROFILE DATA:
        ${JSON.stringify(profile, null, 2)}
        
        PROJECTS DATA:
        ${JSON.stringify(projects, null, 2)}
        
        SKILLS DATA:
        ${JSON.stringify(skills, null, 2)}
        
        SERVICES DATA:
        ${JSON.stringify(services, null, 2)}
        
        RESUME DATA:
        ${JSON.stringify(resume, null, 2)}
        
        CURRENT SYSTEM STATS:
        - Newsletter Subscribers: ${subscribersCount}
        
        Use Cases / Task Rules:
        1. Form Completion support: Generate and suggest exact raw HTML or structured text to paste into fields like 'bio', 'description', 'problem', 'solution', or 'content' in the editor database.
        2. Clean JSON outputs: When asked to draft a new portfolio item (project, resume point, skill, or service), ALWAYS output a clean, formatted JSON block that aligns perfectly with the current schema so Rohan can copy-paste it directly.
        3. Newsletter campaigns: When asked to draft messages or announcements, write highly refined, professional updates based on Rohan's specific engineering fields (Direct Air Capture thermodynamic pathway modeling, real-time solvers, PI neural networks).
        4. Optimization: Suggest impactful improvements for headlines, bullet points, and skills alignments.
        5. Provide highly detailed and intelligent answers. Be a true companion in work optimization.
      `;

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: adminSystemInstruction,
        },
        history: history || [],
      });

      const result = await chat.sendMessage({ message });
      res.json({ text: result.text });
    } catch (error) {
      console.error("Admin Gemini API error:", error);
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
      messagesData.messages.push({
        id: Date.now(),
        date: new Date().toISOString(),
        name,
        email,
        message,
        ...extraFields
      });
      fs.writeFileSync(messagesPath, JSON.stringify(messagesData, null, 2), 'utf-8');
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

  // Data API Routes — Supabase Storage when configured, local JSON fallback
  app.get("/api/data/:type", async (req, res) => {
    const { type } = req.params;

    if (isSupabaseStorageConfigured) {
      try {
        const data = await fetchDataFromStorage(type);
        return res.json(data);
      } catch (storageError) {
        console.warn(`Supabase read failed for ${type}, falling back to local file:`, storageError);
      }
    }

    try {
      const data = readLocalData(type);
      if (data) return res.json(data);
      return res.status(404).json({ error: "File not found" });
    } catch (e) {
      return res.status(500).json({ error: "Failed to parse data" });
    }
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
      if (isSupabaseStorageConfigured) {
        await saveDataToStorage(type, req.body, token);
      } else {
        writeLocalData(type, req.body);
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
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
