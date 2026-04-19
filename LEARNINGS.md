# LEARNINGS.md

## What Was New to Me in This Challenge

### 1. Structuring AI output for UI control

The hardest design problem wasn't writing React — it was figuring out how to make a language model reliably drive a UI. My first instinct was to parse free-text responses and look for keywords like "SUV" or "compare." That quickly broke down on edge cases.

The insight that changed everything: **treat the AI as a structured API, not a chatbot.** By writing a system prompt that forces Claude to always return a JSON object with a known schema (`{ action, reply }`), I turned an unpredictable language model into a reliable state machine. The UI just reads `action.type` and switches on it — no NLP needed on the frontend at all.

I figured this out by reading Anthropic's documentation on prompt engineering, specifically the section on "output formatting" and how to get consistent JSON from the model. The key instructions that made it work were: explicitly listing every allowed action type with its exact schema, adding rules for ambiguous cases ("top two models" = Arc + Crest), and ending the prompt with "Return ONLY valid JSON. No markdown."

### 2. The dispatcher pattern for AI → UI communication

I hadn't previously thought about how to cleanly separate "what the AI decides" from "what the UI does." On this project, I created `dispatcher.js` — a single function that takes an action object and translates it into state updates + scroll calls. Every AI response goes through this one function.

This made the code much easier to reason about: the AI component never touches DOM directly, and page sections never know about AI. Adding a new action type later means editing one switch statement, not hunting through components.

### 3. Scroll-then-update timing

An early bug: when the AI said "filter SUVs," the page would filter the grid and then scroll. Because the grid shrank, the scroll target moved, so the final position was wrong. I learned that you need to scroll first, then update state after a short delay (I used 400ms). This way React re-renders after the viewport has already settled.

### 4. useEffect dependency gotcha with objects

I ran into a React bug where a `useEffect` watching an object from Context fired on every render, causing an infinite loop. Objects are compared by reference in JavaScript, so even `{ carId: '' }` and `{ carId: '' }` are not equal. I learned to either destructure primitive values as dependencies, or use `JSON.stringify()` as a stable dependency value.

### 5. Keeping the API key server-side

I initially built the whole thing as a pure frontend app. It worked, but the API key was visible in browser network requests. Adding a Node.js proxy took about 30 minutes and required learning how to configure Vite's `server.proxy` for local development so I didn't need two different API URLs during dev vs production.

## Sources I Used

- Anthropic prompt engineering docs: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Vite proxy config docs: https://vitejs.dev/config/server-options.html#server-proxy
- React useEffect dependency rules: https://react.dev/learn/synchronizing-with-effects
- MDN: `scrollIntoView` options for smooth scroll behavior
