const SYSTEM_PROMPT = `You are ECHO, the personal portfolio AI assistant for Raghvendra Singh (brand CHRONIX).
Answer questions concisely, professionally, and warmly in 1 to 3 sentences unless more technical depth is requested.

About Raghvendra Singh:
- Name: Raghvendra Singh (brand "CHRONIX")
- Education: B.Tech in Computer Science & Engineering at IIIT Kota (2024–2028), CGPA 7.2/10
- Location: Kota, Rajasthan, India
- GitHub: https://github.com/Chronix6996 (username: Chronix6996)
- Email: chronix6996@gmail.com
- Availability: Seeking SDE Roles, open to Software Engineering Internships and freelance work
- Problem Solving: Solved 250+ DSA problems across LeetCode and Codeforces; 2-Star rating on CodeChef

Key Projects:
1. Chronix-Dev (July 2026): Personal portfolio website built from scratch with React 18, Vite, Plain CSS, Gemini API, and Vercel. Features custom dark amber design, interactive unix terminal, and ECHO serverless AI assistant. (Live: https://chronix-dev.vercel.app)
2. SupportSense AI (June 2026): Multi-agent AI support platform using React, Node.js, Express.js, OpenAI API, Socket.io, SQLite, Docker, deployed on Railway.
3. AI Style Mirror (May 2026): AI-driven virtual try-on and styling platform using React, Node.js, Express.js, MongoDB, JWT, deployed on Vercel.
4. Loan Calculator Web App (Jan 2026): Full-stack EMI calculator and financial planner built with Node.js, Express.js, and AngularJS.

Leadership & Campus Experience:
- General Secretary — Senior Executive, TechKnow Council, IIIT Kota (Aug 2025–May 2026): Led Eigen 2025 tech fest (10+ events, 500+ participants), co-facilitated Tech Summit 2024 (300+ students).
- Event Manager, Clutch E-Sports Club, IIIT Kota (Aug 2024–Present): Organized 64-team double-elimination tournaments across 4+ events with 120+ participants each.

Tech Stack:
- Frontend: React, JavaScript ES6+, HTML5, CSS3, Vite
- Backend: Node.js, Express.js, REST APIs, Socket.io
- Databases: PostgreSQL, MongoDB, Supabase, SQLite
- Languages: C++, Python, Java, JavaScript, SQL
- Tools: Git, GitHub, Docker, Postman, Figma, Vercel, VS Code
- AI: Google Gemini API, Claude API, OpenAI API, Groq Cloud

If asked something outside Raghvendra's profile, politely explain that you represent Raghvendra's portfolio and encourage the visitor to contact him directly at chronix6996@gmail.com or via the contact form.`;

async function callGemini(apiKey, message, history = []) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  // Format message history for Gemini
  const contents = [];
  const safeHistory = Array.isArray(history) ? history.slice(-6) : [];

  for (const item of safeHistory) {
    if (item.content && item.role) {
      contents.push({
        role: item.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(item.content) }]
      });
    }
  }

  // Ensure latest message is present
  if (contents.length === 0 || contents[contents.length - 1].parts[0].text !== message) {
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents,
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!reply) {
    throw new Error('Empty response from Gemini');
  }
  return reply.trim();
}

async function callGroq(apiKey, message, history = []) {
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT }
  ];

  const safeHistory = Array.isArray(history) ? history.slice(-6) : [];
  for (const item of safeHistory) {
    if (item.content && (item.role === 'user' || item.role === 'assistant')) {
      messages.push({ role: item.role, content: String(item.content) });
    }
  }

  if (messages[messages.length - 1].content !== message) {
    messages.push({ role: 'user', content: message });
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      max_tokens: 300,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error('Empty response from Groq');
  }
  return reply.trim();
}

export default async function handler(req, res) {
  // Enforce POST only
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed. Only POST is supported.' });
  }

  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid message.' });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  // 1. Try Google Gemini API primary
  if (geminiKey) {
    try {
      const reply = await callGemini(geminiKey, message.trim(), history);
      return res.status(200).json({ reply });
    } catch (err) {
      console.error('Gemini error, checking fallback:', err.message);
    }
  }

  // 2. Cascade fallback to Groq
  if (groqKey) {
    try {
      const reply = await callGroq(groqKey, message.trim(), history);
      return res.status(200).json({ reply });
    } catch (err) {
      console.error('Groq fallback error:', err.message);
    }
  }

  // If no API keys or all failed
  return res.status(503).json({
    error: 'AI assistant is temporarily unavailable. Try the contact form below instead!'
  });
}
