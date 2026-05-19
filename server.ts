import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
