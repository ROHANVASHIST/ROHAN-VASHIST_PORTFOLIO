# Portfolio Website

Personal portfolio website for **Rohan Vashist** — AI Engineer Intern & Clean Energy Researcher. Showcases projects, research, blog, and professional experience.

## Features

- **Projects** — AI-powered tools, full-stack apps, and energy research with filtering/search
- **Research** — Publications, sustainable energy systems, analytical chemistry
- **Blog** — Markdown-based articles with AI copilot writing assistant
- **Admin Dashboard** — Authenticated content editor with JSON editor, AI copilot, inbox, and subscriber management
- **AI Chat** — Gemini-powered assistant answering questions about Rohan's work
- **Dark Mode** — Full theme support with persistent user preference

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, Motion |
| Backend | Node.js, Express, tsx |
| AI | Google Gemini (via @google/genai SDK) |
| Auth | Supabase (admin login) |
| Storage | Local JSON files + optional Supabase sync |
| Database | Supabase (projects, profile, skills, etc.) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/ROHANVASHIST/PORTFOLIO-WEBSITE.git
cd PORTFOLIO-WEBSITE
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI chat & copilot |
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anon/publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | For seed scripts only |
| `APP_URL` | No | Deployed app URL |
| `EMAIL_USER` / `EMAIL_PASS` | No | Gmail App Password for contact form |

### Development

Starts both the Vite dev server (HMR) and Express API server:

```bash
npm run dev
```

The app runs at **http://localhost:3000**.

### Build

```bash
npm run build
```

Produces a static `dist/` folder for the frontend and a bundled `dist/server.cjs` for the API server.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── data/             # Local JSON data files (projects, profile, skills, etc.)
├── lib/              # Utilities, hooks, auth, data store
├── pages/            # Route page components
├── assets/           # Images and static assets
server.ts             # Express API server (chat, data, contact, AI copilot)
```

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/chat` | POST | Public Gemini AI chat assistant |
| `/api/admin/ai` | POST | Admin AI copilot with full portfolio context |
| `/api/data/:type` | GET | Read portfolio data (local-first, Supabase fallback) |
| `/api/data/:type` | POST | Save portfolio data (admin auth required) |
| `/api/contact` | POST | Submit contact form (saves to JSON + optional email) |
| `/api/subscribe` | POST | Newsletter subscription |
