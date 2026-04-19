import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { dispatchAIAction } from '../utils/dispatcher';
import { CARS } from '../data/cars';

const SUGGESTIONS = [
  "Show me SUVs under 20 lakhs",
  "Compare your top two models",
  "Best car for a family of 5",
  "Show prices in dollars",
  "Book test drive for flagship in Kochi",
  "Show electric cars",
];

const buildSystemPrompt = () => {
  const carContext = JSON.stringify(
    CARS.map((c) => ({
      id: c.id, name: c.name, type: c.type, seats: c.seats,
      price_inr: c.price_inr, price_usd: c.price_usd,
      fuel: c.fuel, mileage: c.mileage, power: c.power, flagship: c.flagship,
    }))
  );

  return `You are VELO AI, the intelligent assistant for VELO Motors car dealership website.
Car inventory: ${carContext}

Your job: understand the user's query and return ONLY a JSON object with two fields:
1. "action" — one of these objects describing what the website should do:
   - {"type":"FILTER_MODELS","filter":"suv"|"sedan"|"hatchback"|"electric"|"all"}
   - {"type":"COMPARE_CARS","carA":"car-id","carB":"car-id"}
   - {"type":"HIGHLIGHT_CAR","carId":"car-id"}
   - {"type":"PREFILL_BOOKING","carId":"car-id","city":"cityname","date":"YYYY-MM-DD"}
   - {"type":"CHANGE_CURRENCY","currency":"usd"|"inr"}
   - {"type":"SCROLL_TO","section":"models"|"features"|"comparison"|"pricing"|"booking"|"contact"}
2. "reply" — a short conversational reply (max 60 words).

Rules:
- 20 lakhs = 2000000 INR. SUVs under 20L → type:suv (note Terra and Crest are both SUVs, Terra is under 20L)
- "top two models" → Arc (flagship) + Crest (most expensive non-flagship)
- "family of 5 or 7" → recommend velo-crest (7-seat)
- "flagship" or "best" → velo-arc
- For booking with city/date, extract city name and convert relative dates to YYYY-MM-DD format (today is ${new Date().toISOString().split('T')[0]})
- Return ONLY valid JSON. No markdown, no extra text outside the JSON object.`;
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your VELO AI guide. Ask me about any model, compare cars, filter by budget, or let me book a test drive. What are you looking for today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const appContext = useApp();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const addMsg = (text, role) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  const sendMessage = async (overrideText) => {
    const query = (overrideText || input).trim();
    if (!query || loading) return;
    setInput('');
    addMsg(query, 'user');
    setLoading(true);

    try {
      // Call your backend proxy (set VITE_API_URL in .env, defaults to relative /api)
      const apiUrl = import.meta.env.VITE_API_URL || '';
      console.log(apiUrl);
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: buildSystemPrompt(),
          query,
        }),
      });
      console.log(res);
      const data = await res.json();
      const raw = data.reply || '{}';

      let parsed;
      try {
        parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
      } catch {
        parsed = {
          action: { type: 'SCROLL_TO', section: 'models' },
          reply: "I didn't quite catch that. Try asking about a specific model or saying 'show me SUVs'!",
        };
      }

      if (parsed.action) {
        dispatchAIAction(parsed.action, appContext);
      }
      addMsg(parsed.reply || 'Done! Let me know if you need anything else.', 'bot');
    } catch {
      addMsg('Sorry, I had trouble connecting. Please try again in a moment.', 'bot');
    }

    setLoading(false);
  };

  return (
    <>
      <button className={`ai-fab ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Open AI Assistant">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      <div className={`ai-panel ${open ? 'open' : ''}`}>
        <div className="ai-header">
          <div className="ai-avatar">V</div>
          <div>
            <div className="ai-name">VELO AI Assistant</div>
            <div className="ai-status">Online — ready to help</div>
          </div>
          <button className="ai-close" onClick={() => setOpen(false)}>×</button>
        </div>

        <div className="ai-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`}>{msg.text}</div>
          ))}
          {loading && <div className="msg bot typing">Thinking...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-suggestions">
          {SUGGESTIONS.slice(0, 4).map((s) => (
            <button key={s} className="suggestion-chip" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>

        <div className="ai-input-row">
          <input
            ref={inputRef}
            className="ai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask anything about VELO..."
          />
          <button className="ai-send" onClick={() => sendMessage()} disabled={loading}>↑</button>
        </div>
      </div>
    </>
  );
}
