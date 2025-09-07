// /api/subscribe.js
export default async function handler(req, res) {
  // ---- Optional CORS (handy for local dev if you call the deployed API) ----
  const allowOrigins = [
    process.env.PUBLIC_SITE_URL,       // e.g. https://yourapp.vercel.app
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ].filter(Boolean);

  const origin = req.headers.origin || "";
  if (allowOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  // -------------------------------------------------------------------------

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { email } = req.body || {};
  const emailOk = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  try {
    const upstream = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const text = await upstream.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: "Upstream error", data });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
}
