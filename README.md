# <chronix/> — Personal Portfolio

> Built from scratch. Three years and several production deployments
> later, the scale has changed but the drive has not.

**Live:** [chronix-dev.vercel.app](https://chronix-dev.vercel.app) • **Author:** Raghvendra Singh (chronix)

---

## Overview

Personal portfolio built entirely from scratch — no templates, no UI component
libraries. Custom dark amber design system, scroll-animated project timeline,
an interactive unix terminal with theme presets, and a live AI chat assistant named **ECHO**
that answers recruiter questions about my projects, skills, and availability in real time.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5.4 |
| Styling | Plain CSS + CSS Custom Properties |
| Icons | Lucide React + Devicon SVG |
| AI Chat (ECHO) | Serverless Gemini API (Google AI) with optional Groq cascade |
| Contact Form | Web3Forms API |
| Deployment | Vercel |

---

## Project Structure

```
Portfolio-Dev/
├── api/
│   └── chat.js              # Serverless AI proxy — Gemini API + Groq fallback
├── public/
│   └── resume.pdf           # Downloadable resume
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky nav, scroll-spy active links, mobile hamburger
│   │   ├── Hero.jsx         # Typing animation, CTAs, stats, availability badge
│   │   ├── Marquee.jsx      # Pure-CSS continuous marquee ticker
│   │   ├── About.jsx        # Bio with [ --short ] / [ --long ] CLI view toggle
│   │   ├── Projects.jsx     # Projects timeline bar, border-beam, project archive
│   │   ├── Experience.jsx   # Education, leadership, club cards, milestone journey
│   │   ├── TechStack.jsx    # Devicon SVG pill grid + daily driver setup list
│   │   ├── GitHubActivity.jsx # Live GitHub stats, top repos, contribution graph
│   │   ├── AskMe.jsx        # ECHO AI chat & Interactive Terminal tabs
│   │   ├── Terminal.jsx     # Unix terminal with help, themes, sudo easter egg
│   │   ├── WebPresence.jsx  # LinkedIn, GitHub, LeetCode, Email network cards
│   │   ├── Contact.jsx      # Web3Forms contact form with Subject & graceful fallback
│   │   ├── SideRails.jsx    # Fixed vertical desktop side rails
│   │   └── Footer.jsx       # CHRONIX brand wordmark, social links, repo stars
│   ├── config.js            # Single source of truth for personal data & projects
│   ├── App.jsx              # Root — scroll progress, cursor glow, section order
│   ├── main.jsx             # React entry point
│   └── index.css            # Dark amber design system & CSS custom properties
├── index.html               # HTML shell with SEO meta tags & amber pre-loader
├── vite.config.js           # Vite config
├── .env.example             # Documented environment variables
└── package.json             # Dependencies and scripts
```

---

## ECHO — AI Chat Assistant

The **Ask Me** section features **ECHO**, a personal AI assistant trained on
my background that answers questions about projects, engineering skills, and availability.

### How it works

Browser → `/api/chat` (Vercel serverless) → Gemini API (or Groq fallback) → Response

### Why a serverless proxy?

Direct browser-to-AI-API calls are insecure and blocked by CORS.
The serverless function handles requests server-side where CORS does not apply, and keeps all API keys strictly on the server.

---

## Features

- **Scroll-animated project timeline** — amber bar fills progressively as you scroll
- **Interactive Terminal** — full unix CLI with command history, auto-complete, and theme changer (amber, hacker, matrix, dracula, tokyo-night)
- **ECHO AI chat** — serverless Gemini API assistant with smart suggested queries
- **GitHub Live Activity** — live repository telemetry and contribution graph
- **Project Archive** — terminal-styled monospace archive of older systems
- **Fixed Desktop Side Rails** — vertical social icon rail and vertical email address
- **Pure-CSS Marquee** — smooth infinite ticker between Hero and About
- **About CLI Toggle** — `[ --short ]` and `[ --long ]` bio modes
- **Typing animation** — natural typing cadence with role transitions
- **Active nav tracking** — links highlight automatically via Intersection Observer
- **Scroll progress bar** — thin 3px amber line fixed at the very top of the window
- **Accessibility & Motion** — full respect for `prefers-reduced-motion` and touch screen controls
- **Mobile responsive** — tailored layouts for desktop, 768px tablet, and 480px mobile

---

## Sections

| # | Section | Description |
|---|---|---|
| — | Hero | Name, typing animation, resume CTA, stats strip, availability badge |
| 01 | About | Bio with CLI view toggle, traits, status tags |
| 02 | Projects | 4 projects with timeline bar, border beam, and archive table |
| 03 | Experience | Education (IIIT Kota), Leadership (TechKnow), Club (Clutch) |
| 04 | Tech Stack | 5 categories with Devicon SVG icons + Daily Drivers list |
| 05 | GitHub Activity | Live public repositories, follower count, top repos, contribution graph |
| 06 | Ask Me | Dual mode: ECHO AI chat + Interactive Unix Terminal |
| 07 | Web Presence | LinkedIn, GitHub, LeetCode (when configured), Email cards |
| 08 | Contact | Web3Forms form with Subject field + info cards |
| — | Footer | Large CHRONIX wordmark, live repository stars & forks |

---

## Projects Showcased

| Project | Stack | Status |
|---|---|---|
| Chronix-Dev | React 18, Vite, Plain CSS, Gemini API, Vercel | [Live Demo](https://chronix-dev.vercel.app) |
| SupportSense AI | React, Node.js, Express.js, OpenAI API, Socket.io, Docker, Railway | [Live Demo](https://supportsense-ai-production.up.railway.app) |
| AI Style Mirror | React, Node.js, Express.js, MongoDB, JWT | [Live Demo](https://ai-style-mirror.vercel.app/) |
| Loan Calculator Web App | Node.js, Express.js, AngularJS | Private / Code |

---

## Local Development

```bash
# Clone
git clone https://github.com/Chronix6996/Portfolio-Dev.git
cd Portfolio-Dev

# Install dependencies
npm install

# Start local frontend
npm run dev

# Full stack with Vercel Serverless Functions
vercel dev
```

---

## Environment Variables

Copy `.env.example` to `.env.local` or set these in **Vercel → Settings → Environment Variables**:

| Variable | Description | Required |
|---|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for Contact form | Optional (graceful fallback to email) |
| `GEMINI_API_KEY` | Google Gemini API key for ECHO serverless chat | Required for ECHO chat |
| `GROQ_API_KEY` | Groq Cloud API key (LLaMA 3.3 70B fallback) | Optional |

---

## Design System

```css
/* Core Palette */
--bg-primary:   #141414    /* Deep charcoal */
--bg-card:      #1E1C1A    /* Card surfaces */
--accent:       #E8A33D    /* Amber primary */
--accent-light: #F2BC6B    /* Soft amber accent */
--text-primary: #F5F1E8    /* Warm off-white */
--text-muted:   #A39B8B    /* Muted warm gray */

/* Typography */
Space Grotesk  → Headings and display titles
Inter          → Body text and descriptions
JetBrains Mono → Labels, terminal, badges, stats
```

---

## Contact

**Raghvendra Singh (chronix)**
- Email: chronix6996@gmail.com
- LinkedIn: [raghvendra-singh-850399323](https://www.linkedin.com/in/raghvendra-singh-850399323)
- GitHub: [Chronix6996](https://github.com/Chronix6996)
- Location: Kota, Rajasthan, India

---

## License

MIT License — feel free to reference or fork.

*Built from scratch with React. Deployed on Vercel.*
*© 2026 Raghvendra Singh (chronix)*
