# DriveAI — VELO Motors

> An AI-navigated single-page car dealership. Ask the assistant anything — it drives the page for you.

**Live URL:** `https://driveai-velo.vercel.app` *(update after deployment)*

---

## Quick Start

### Prerequisites
- Node.js 18+
- An Anthropic API key from [console.anthropic.com](https://console.anthropic.com)

### 1. Clone the repo
```bash
git clone https://github.com/your-username/driveai.git
cd driveai
```

### 2. Run the backend
```bash
cd driveai-backend
npm install
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
npm run dev
# Backend runs on http://localhost:4000
```

### 3. Run the frontend
```bash
cd driveai-frontend
npm install
cp .env.example .env
# VITE_API_URL can stay empty for local dev (proxied via vite.config.js)
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Stack Choices & Why

| Layer | Choice | Reason |
|---|---|---|
| Frontend | React + Vite | Fast DX, component-based state management, familiar to most reviewers |
| Styling | Plain CSS (no Tailwind) | Full control, zero build-time overhead, easier to read for reviewers |
| State | React Context + useState | No Redux needed — shared state is shallow (filter, compare, currency, prefill) |
| AI | Claude claude-3-5-haiku via Anthropic API | Fast, cheap, excellent instruction-following for JSON responses |
| Backend | Node.js + Express | Keeps API key server-side; natural choice given my Node background |
| Frontend deploy | Vercel | Free, instant deploys from GitHub, great env var support |
| Backend deploy | Render | Free tier, Node support, no credit card required |

**Why not a full framework (Next.js)?** The task is a single-page site with no routing needs. Vite + React is leaner and deploys faster.

**Why a separate backend at all?** Calling the Anthropic API directly from the browser exposes the API key in network requests. A thin Express proxy keeps the key secure without adding meaningful complexity.

---

## AI Query Types Supported

The assistant handles these **7 distinct query types**, each producing a different page change:

| # | Query Type | Example Phrasings | Page Change |
|---|---|---|---|
| 1 | **Filter models** | "Show me SUVs", "Show only electric cars", "What hatchbacks do you have?" | Filters the car grid, scrolls to Models |
| 2 | **Filter by price** | "SUVs under 20 lakhs", "Cars below 15 lakhs" | Filters grid by type (price context in AI reply) |
| 3 | **Compare two cars** | "Compare Surge and Arc", "Compare your top two models", "Put Crest vs Terra side by side" | Loads both cars into comparison table, scrolls to Compare |
| 4 | **Highlight / recommend** | "Best car for a family of 5", "Which car is best for long drives?", "Show me your flagship" | Highlights the recommended car card, scrolls to it |
| 5 | **Prefill booking** | "Book a test drive for the Arc in Mumbai this Saturday", "I want to test drive the Crest in Pune" | Prefills model, city, and date in booking form, scrolls to Booking |
| 6 | **Change currency** | "Show prices in dollars", "Switch to USD", "Convert pricing to INR" | Toggles all pricing across Models, Pricing, and Comparison sections |
| 7 | **Navigate to section** | "Tell me about your features", "Go to contact", "Show me pricing" | Smooth-scrolls to the relevant section |

---

## What I'd Build Next (with another week)

- **Voice input** — Web Speech API for hands-free queries
- **Persistent chat history** — localStorage so conversations survive a refresh
- **Image assets** — Replace emoji placeholders with real car renders (Unsplash or generated)
- **EMI calculator** — AI can answer "what's the monthly payment?" and show a live calculator
- **Multi-turn context** — Send conversation history to Claude so follow-up questions like "what about the cheaper one?" work correctly
- **Loading skeleton** — Skeleton screens instead of blank grids while data renders
- **Accessibility** — ARIA live regions so screen readers announce AI-driven page changes
