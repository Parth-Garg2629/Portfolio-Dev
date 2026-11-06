# <chronix/> — Personal Portfolio

Live: [chronix-dev.vercel.app](https://chronix-dev.vercel.app) &middot; Author: Raghvendra Singh

---

## Overview

Personal developer portfolio for Raghvendra Singh, a Computer Science student at IIIT Kota. Features project timelines, an interactive unix terminal, and an AI chat assistant named ECHO.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5.4 |
| Styling | Plain CSS + CSS Custom Properties |
| Icons | Lucide React |
| AI Chat (ECHO) | Serverless Gemini API with optional Groq cascade |
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
│   │   ├── Navbar.jsx       # Sticky nav with section tracking
│   │   ├── Hero.jsx         # Left-aligned hero, typewriter, stats line
│   │   ├── About.jsx        # Bio with [ --short ] / [ --long ] CLI view toggle
│   │   ├── Projects.jsx     # Featured block, project rows, archive list
│   │   ├── Experience.jsx   # Education, leadership, club roles, journey list
│   │   ├── TechStack.jsx    # Text-based category stack and daily drivers
│   │   ├── GitHubActivity.jsx # Public repo counts and top repository rows
│   │   ├── AskMe.jsx        # ECHO AI chat & Terminal view
│   │   ├── Terminal.jsx     # Unix terminal emulator with command parser & themes
│   │   ├── WebPresence.jsx  # Flat profile links
│   │   ├── Contact.jsx      # Web3Forms contact form with graceful fallback
│   │   ├── SideRails.jsx    # Fixed desktop side rails
│   │   └── Footer.jsx       # CHRONIX wordmark and repo stats
│   ├── config.js            # Central data configuration
│   ├── App.jsx              # Root component and layout assembly
│   ├── main.jsx             # React entry point
│   └── index.css            # Flat, restrained design system
├── index.html               # HTML entry shell
├── vite.config.js           # Vite configuration
├── .env.example             # Documented environment variables
└── package.json             # Scripts and dependencies
```

---

## ECHO — AI Chat Assistant

The Ask Me section includes ECHO, a portfolio assistant answering questions about projects, coursework, and background.

### Architecture

Browser &rarr; `/api/chat` (Vercel serverless) &rarr; Gemini API (or Groq fallback) &rarr; Client

ECHO runs through a serverless function so API keys stay on the server.

---

## Sections

| # | Section | Description |
|---|---|---|
| — | Hero | Left-aligned intro, typewriter line, resume link, stats line |
| 01 | About | Bio with [ --short ] / [ --long ] view toggle |
| 02 | Projects | Featured project block, inventory rows, archive |
| 03 | Experience | IIIT Kota, TechKnow Council, Clutch E-Sports, journey |
| 04 | Tech Stack | Plain text stack categories and daily driver tools |
| 05 | GitHub Activity | Public repo counts and top repository rows |
| 06 | Ask Me | Dual view: ECHO AI assistant and bash terminal |
| 07 | Web Presence | Flat profile cards for LinkedIn, GitHub, and email |
| 08 | Contact | Web3Forms contact form and direct details |
| — | Footer | CHRONIX wordmark and repository metadata |

---

## Local Development

```bash
# Clone
git clone https://github.com/Chronix6996/Portfolio-Dev.git
cd Portfolio-Dev

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## Environment Variables

Copy `.env.example` to `.env.local` or configure in Vercel settings:

| Variable | Description | Required |
|---|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for contact form | Optional |
| `GEMINI_API_KEY` | Google Gemini API key for ECHO serverless chat | Required for ECHO |
| `GROQ_API_KEY` | Groq Cloud API key (LLaMA fallback) | Optional |

---

## Contact

**Raghvendra Singh**
- Email: chronix6996@gmail.com
- LinkedIn: [raghvendra-singh](https://www.linkedin.com/in/raghvendra-singh-850399323)
- GitHub: [Chronix6996](https://github.com/Chronix6996)
- Location: Kota, Rajasthan, India

---

## License

MIT License.
