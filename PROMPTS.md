# PROMPTS.md

These are the actual prompts I used with my AI coding assistant (Claude) during this challenge, along with honest notes on what worked and what needed iteration.

---

## Prompt 1
**Prompt:**
> "I need to build a single-page car dealership website where an AI assistant can navigate the page, filter cars, and prefill forms. Give me a full architecture plan — component structure, state management approach, and how the AI should communicate with the UI."

**Worked first time?** Yes, mostly.
**Notes:** The architecture suggestion (Context API for shared state + a dispatcher pattern for AI actions) was solid and I kept it. The one thing I changed: it initially suggested Redux Toolkit, which was overkill for this scope. I simplified to plain `useState` + Context.

---

## Prompt 2
**Prompt:**
> "Write a system prompt for Claude API that takes a user query about a car dealership and always returns a JSON object with two fields: 'action' (with a type and params) and 'reply' (a short natural language response). The action types are: FILTER_MODELS, COMPARE_CARS, HIGHLIGHT_CAR, PREFILL_BOOKING, CHANGE_CURRENCY, SCROLL_TO. Include the car inventory as context."

**Worked first time?** Partially.
**Notes:** The first version sometimes returned markdown-wrapped JSON (with ```json fences). I added an explicit rule: "Return ONLY valid JSON. No markdown, no extra text outside the JSON object." That fixed it. I also had to add examples for edge cases like "top two models" and relative date parsing ("this Saturday").

---

## Prompt 3
**Prompt:**
> "Write a React dispatcher function that takes an action object from the AI and updates React state + smooth-scrolls the page. Handle all 7 action types. Use a 400ms delay before state updates so the scroll animation completes first."

**Worked first time?** Yes.
**Notes:** The 400ms scroll-then-update pattern was exactly right. No changes needed. This became `src/utils/dispatcher.js` almost verbatim.

---

## Prompt 4
**Prompt:**
> "Build a dark-themed car dealership UI with a fixed navbar, hero section, filterable car grid, comparison table, pricing with currency toggle, booking form, and contact section. Use CSS custom properties for theming. The aesthetic should be luxury automotive — dark background, gold accent color, Bebas Neue for headings."

**Worked first time?** Mostly.
**Notes:** The initial output used Tailwind classes but I wanted plain CSS for simplicity. I re-prompted: "Rewrite all styles as plain CSS using the CSS variables already defined. No Tailwind." The second pass was clean. I also tweaked the hero background gradient manually — the first version was too subtle on dark screens.

---

## Prompt 5
**Prompt:**
> "Write an Express.js backend with a single POST /api/chat endpoint that proxies requests to the Anthropic Claude API. Keep the API key in an environment variable. Add CORS support, input validation, and proper error handling. Use ES modules (type: module in package.json)."

**Worked first time?** Yes.
**Notes:** Clean output. I only added one thing the AI didn't include: the `anthropic-version` header (`2023-06-01`), which is required by the Anthropic API and was causing 400 errors in testing.

---

## Prompt 6
**Prompt:**
> "My booking form needs to sync with AI prefill. When the AI says PREFILL_BOOKING with carId, city, and date, the form fields should update. The form also needs local state for user edits. Write a React component that handles both — controlled inputs with local state, and a useEffect that syncs from a context value when it changes."

**Worked first time?** No.
**Notes:** The first version used `useEffect` with the full `bookingPrefill` object as a dependency, which caused an infinite loop because the object reference changed on every render. I had to change the dependency to `JSON.stringify(bookingPrefill)` and then later refactored to only spread non-empty values from the prefill — that was the cleaner fix.

---

## Prompt 7
**Prompt:**
> "Write a Vite proxy config that forwards /api requests from the frontend dev server to localhost:4000 so I don't need CORS during local development."

**Worked first time?** Yes.
**Notes:** One-liner essentially. No changes.
