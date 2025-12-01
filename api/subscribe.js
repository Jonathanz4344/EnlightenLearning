// /api/subscribe.js
export default async function handler(req, res) {
  // Add error boundary at the very top
  try {
    console.log("API Subscribe called - Method:", req.method);
    console.log("Environment check - GOOGLE_SCRIPT_URL exists:", !!process.env.GOOGLE_SCRIPT_URL);

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
      console.log("Method not allowed:", req.method);
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    console.log("Request body:", req.body);
    const { email } = req.body || {};

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("Invalid email:", email);
      res.status(400).json({ error: "Invalid email address" });
      return;
    }

    // Check if Google Script URL is configured
    if (!process.env.GOOGLE_SCRIPT_URL) {
      console.error("GOOGLE_SCRIPT_URL environment variable not set");
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    console.log("Attempting to forward email to Google Apps Script:", email);
    
    // Set timeout for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      // Forward to Google Apps Script
      const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log("Google Apps Script response status:", response.status);
      console.log("Google Apps Script response headers:", Object.fromEntries(response.headers.entries()));

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
          error: "Failed to parse response from subscription service",
          details: parseError.message 
        });
        return;
      }

      console.log("Parsed Google Apps Script data:", data);

      // Handle the response
      if (!response.ok) {
        console.log("Google Apps Script returned error status:", response.status);
        res.status(response.status).json({ 
          error: "Subscription service error", 
          message: data.message || data.error || "Unknown error"
        });
        return;
      }

      // Success response
      console.log("Success - sending response");
      res.status(200).json({
        result: "success",
        message: data.message || "Successfully subscribed to newsletter!",
        ...data
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error("Request to Google Apps Script timed out");
        res.status(408).json({ 
          error: "Request timeout", 
          message: "The subscription request took too long to process"
        });
      } else {
        console.error("Fetch error:", fetchError);
        res.status(500).json({ 
          error: "Failed to connect to subscription service",
          details: fetchError.message
        });
      }
      return;
    }

  } catch (globalError) {
    console.error("Global error in subscribe API:", globalError);
    console.error("Global error stack:", globalError.stack);
    
    // Make sure we always send a response
    if (!res.headersSent) {
      res.status(500).json({ 
        error: "Internal server error", 
        message: "An unexpected error occurred",
        details: globalError.message
      });
    }
  }
}