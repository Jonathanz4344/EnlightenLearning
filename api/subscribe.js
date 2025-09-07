// /api/subscribe.js
export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { email } = req.body || {};

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  // Check if Google Script URL is configured
  if (!process.env.GOOGLE_SCRIPT_URL) {
    console.error("GOOGLE_SCRIPT_URL environment variable not set");
    res.status(500).json({ error: "Server configuration error" });
    return;
  }

  try {
    console.log("Forwarding email to Google Apps Script:", email);
    
    // Forward to Google Apps Script
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email }),
    });

    console.log("Google Apps Script response status:", response.status);

    // Google Apps Script might return text/plain instead of JSON
    const contentType = response.headers.get("content-type");
    let data;
    
    try {
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        console.log("Google Apps Script text response:", textResponse);
        
        // Try to parse as JSON in case it's JSON with wrong content-type
        try {
          data = JSON.parse(textResponse);
        } catch {
          // If it's not JSON, treat as plain text response
          data = { 
            result: response.ok ? "success" : "error",
            message: textResponse 
          };
        }
      }
    } catch (parseError) {
      console.error("Error parsing Google Apps Script response:", parseError);
      res.status(500).json({ 
        error: "Failed to parse response from subscription service" 
      });
      return;
    }

    console.log("Parsed Google Apps Script data:", data);

    // Handle the response
    if (!response.ok) {
      res.status(response.status).json({ 
        error: "Subscription service error", 
        message: data.message || data.error || "Unknown error"
      });
      return;
    }

    // Success response
    res.status(200).json({
      result: "success",
      message: data.message || "Successfully subscribed to newsletter!",
      ...data
    });

  } catch (err) {
    console.error("Serverless subscription error:", err);
    res.status(500).json({ 
      error: "Internal server error", 
      message: "Failed to process subscription request"
    });
  }
}