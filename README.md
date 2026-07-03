# <chronix/> — Personal Portfolio

> It started with Hello World. Three years and several production deployments
> later, the scale has changed but the drive has not.

**Live:** [chronix-dev.vercel.app](https://chronix-dev.vercel.app) • **Author:** Raghvendra Singh (chronix)

---

## Overview

Personal portfolio built entirely from scratch — no templates, no UI component
libraries. Custom amber design system, scroll-animated project timeline, and
a live AI chat assistant named **ECHO** that answers recruiter questions about
my projects, skills, and availability in real time.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5.4 |
| Styling | Plain CSS + CSS Custom Properties |
| Icons | Lucide React |
| AI Chat (ECHO) | Claude → Gemini 1.5 Flash → Groq (LLaMA 3.3 70B) cascade |
| Contact Form | Web3Forms API |
| Visitor Counter | CountAPI |
| Deployment | Vercel (CLI) |

---

## Project Structure

chronix-dev/
├── api/
│   ├── chat.js              # Serverless AI proxy — Claude → Gemini → Groq cascade
│   └── visitors.js          # Serverless visitor counter via CountAPI
├── public/
│   └── resume.pdf           # Downloadable resume
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky nav, scroll-spy active links, mobile hamburger
│   │   ├── Hero.jsx         # Typing animation, CTAs, stats, live visitor counter
│   │   ├── About.jsx        # Bio, trait cards, tags
│   │   ├── Experience.jsx   # Projects — scroll-animated left timeline bar
│   │   ├── Projects.jsx     # Experience — education, leadership, club cards
│   │   ├── TechStack.jsx    # Logo + name pill grid across 5 categories
│   │   ├── WebPresence.jsx  # LinkedIn, GitHub, LeetCode, Email cards
│   │   ├── AskMe.jsx        # ECHO — AI chat widget
│   │   ├── Contact.jsx      # Web3Forms contact form with validation
│   │   └── Footer.jsx       # CHRONIX brand footer
│   ├── App.jsx              # Root — Intersection Observer, cursor glow
│   ├── main.jsx             # React entry point
│   └── index.css            # Full design system
├── index.html               # HTML shell with SEO meta tags
├── vite.config.js           # Vite config
└── package.json             # Dependencies and scripts

---

## ECHO — AI Chat Assistant

The **Ask Me** section features **ECHO**, a personal AI assistant trained on
my resume that answers questions about projects, skills, and availability.

### How it works

Browser → /api/chat (Vercel serverless) → AI Provider → Response

The serverless function implements a **3-provider cascade**:

1. **Claude (Anthropic)** — primary, best quality
2. **Gemini 1.5 Flash (Google)** — fallback if Claude unavailable
3. **LLaMA 3.3 70B via Groq** — final fallback, very generous free tier

This means ECHO stays online even if one or two providers go down or hit
rate limits — important for a portfolio that needs to work reliably when
a recruiter visits.

### Why a serverless proxy?

Direct browser-to-AI-API calls are blocked by CORS on deployed websites.
The serverless function handles requests server-side where CORS does not
apply, and keeps all API keys out of the browser bundle.

---

## Features

- **Scroll-animated project timeline** — amber bar fills as you scroll
- **ECHO AI chat** — 3-provider cascade, always online
- **Live visitor counter** — real-time eye icon showing portfolio visits
- **Typing animation** — natural variance timing, smooth delete/retype
- **Active nav tracking** — links highlight as sections enter viewport
- **Cursor glow** — ambient amber glow follows mouse on desktop
- **Scroll reveal animations** — Intersection Observer on all sections
- **Contact form** — Web3Forms with email validation, subject field,
  loading/success/error states
- **Mobile responsive** — clean single column at 768px and 480px

---

## Sections

| # | Section | Description |
|---|---|---|
| 01 | Hero | Name, typing animation, resume CTA, live visitor count |
| 02 | About | Bio, trait cards, status tags |
| 03 | Projects | 4 cards — Portfolio, SupportSense AI, AI Style Mirror, Loan Calculator |
| 04 | Experience | IIIT Kota, Techknow Council, Clutch E-Sports |
| 05 | Tech Stack | 5 categories — AI, Frontend, Backend, Tools, Languages |
| 06 | Web Presence | LinkedIn, GitHub, LeetCode, Email network cards |
| 07 | Ask Me | ECHO — live AI chat assistant |
| 08 | Contact | Web3Forms form + info cards |
| — | Footer | CHRONIX brand, socials, copyright |

---

## Projects Showcased

| Project | Stack | Status |
|---|---|---|
| chronix Portfolio | React, Vite, CSS, Vercel | Live |
| SupportSense AI | React, Node.js, Express.js, OpenAI API, Socket.io, Docker, Railway | Live |
| AI Style Mirror | React, Node.js, Express.js, MongoDB, JWT | Private |
| Loan Calculator | Node.js, Express.js, AngularJS | Private |

---

## Local Development

```bash
# Clone
git clone https://github.com/Raghvendrasingh-CS/chronix-dev.git
cd chronix-dev

# Install
npm install

# Frontend only (ECHO chat won't work without Vercel CLI)
npm run dev

# Full stack including serverless functions
vercel dev
```

---

## Environment Variables

Set these in **Vercel → Settings → Environment Variables:**

| Variable | Provider | Required |
|---|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com | Optional (primary) |
| `GEMINI_API_KEY` | aistudio.google.com | Optional (fallback 1) |
| `GROQ_API_KEY` | console.groq.com | Optional (fallback 2) |

At least one key must be set. The cascade tries each provider in order
until one succeeds.

The Web3Forms key in `Contact.jsx` is intentionally public — Web3Forms
keys are designed to be exposed client-side.

---

## Design System

```css
/* Colors */
--bg-primary:   #141414    /* Deep charcoal */
--bg-card:      #1E1C1A    /* Card surfaces */
--accent:       #E8A33D    /* Amber — primary */
--accent-light: #F2BC6B    /* Soft amber */
--text-primary: #F5F1E8    /* Warm off-white */
--text-muted:   #A39B8B    /* Muted warm gray */

/* Fonts */
Space Grotesk  → headings, display text
Inter          → body, descriptions
JetBrains Mono → labels, badges, terminal elements
```

---

## Deployment

```bash
npm run build   # verify clean build locally
vercel --prod   # deploy to production
```

Vercel handles both the static React frontend and the serverless API
functions (`/api/chat`, `/api/visitors`) in a single deployment with
zero additional configuration.

---

## Contact

**Raghvendra Singh (chronix)**
- Email: chronix6996@gmail.com
- LinkedIn: [raghvendra-singh-850399323](https://www.linkedin.com/in/raghvendra-singh-850399323)
- GitHub: [Raghvendrasingh-CS](https://github.com/Raghvendrasingh-CS)
- Location: Sri Ganganagar, Rajasthan, India

---

## License

MIT License — open source, feel free to reference or fork.

---

*Built from scratch with React. Deployed on Vercel.*
*© 2026 Raghvendra Singh (chronix)*
