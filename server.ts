import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

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

  // Contact API Route
  app.post("/api/contact", async (req, res) => {
    const { name, email, message, ...extraFields } = req.body;

    console.log("Contact form submission:", { name, email, message, extraFields });

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
