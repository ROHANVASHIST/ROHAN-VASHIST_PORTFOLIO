# Portfolio Content Management Guide

Welcome to your portfolio management dashboard. This guide explains how to maintain and update the content of your professional website. All data is managed through structured JSON files for maximum flexibility and performance.

---

## 🛠️ Data Architecture

The website's content is localized in the `src/data/` directory. Each file governs a specific aspect of the application:

### 1. Personal Profile (`src/data/profile.json`)
Manage your core brand identity:
- **Headline & Name:** Update your primary professional title.
- **Biography:** Long-form bio for the About page.
- **Education:** Academic history and qualifications.

### 2. Project Catalog (`src/data/projects.json`)
The most frequent update point. Each project object supports:
- **Media:** Main `image` and an optional `images` array for the detail gallery.
- **Metadata:** GitHub links, Live Demo URLs, and technology tags.
- **Case Study Data:** Detail blocks for "Problem", "Solution", and "Learnings".
- **Status:** Use "Completed", "In Development", or "Archived".

### 3. Competencies (`src/data/skills.json`)
Categorical skill management:
- Group skills into sets like "Frontend", "Backend", or "Engineering".
- Automatically updates the visual skills grid on the Expertise page.

---

## 🖼️ Media Guidelines

To maintain high performance and visual consistency:

1. **Storage:** Save all assets in `/public/images/`.
2. **Naming:** Use lowercase with hyphens (e.g., `sustainability-dashboard-v1.png`).
3. **Paths:** Always reference relative to public root (e.g., `/images/projects/photo.jpg`).
4. **Optimization:** Standardize project images to a **16:9 aspect ratio** for optimal display in the gallery.

---

## 🚀 Deployment Workflow

This application uses a modern CI/CD pipeline:

1. **Modify:** Update the JSON files or images locally.
2. **Verify:** Run a local dev server to check layout and performance.
3. **Publish:** Commit and push your changes to your repository.
4. **Live:** The build system (Vercel/Netlify/Cloud Run) will trigger an atomic deployment within seconds.

---

*Need help? Contact the developer at rohanvashist01@gmail.com*
