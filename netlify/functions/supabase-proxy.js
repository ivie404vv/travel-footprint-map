// Netlify Function - Proxy Supabase API using Node.js https module
// More reliable than fetch in AWS Lambda environment

const https = require("https");

const SUPABASE_HOST = "xsouqeqcstyolopmttpr.supabase.co";

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "access-control-allow-headers": "authorization, x-client-info, apikey, content-type, prefer",
        "access-control-max-age": "86400",
      },
      body: "",
    };
  }

  // Extract original path from rawUrl
  let apiPath = "/rest/v1/";
  if (event.rawUrl) {
    try {
      const parsed = new URL(event.rawUrl);
      apiPath = parsed.pathname + (parsed.search || "");
    } catch (e) {
      // fallback
    }
  }

  return new Promise((resolve) => {
    const options = {
      hostname: SUPABASE_HOST,
      path: apiPath,
      method: event.httpMethod || "GET",
      headers: {},
    };

    // Forward relevant headers
    const skipHeaders = new Set([
      "host", "x-forwarded-for", "x-forwarded-proto", "x-forwarded-port",
      "x-forwarded-host", "x-nf-client-connection-ip", "x-nf-request-id",
      "accept-encoding", "connection", "content-length", "transfer-encoding",
    ]);

    for (const [key, value] of Object.entries(event.headers || {})) {
      if (!skipHeaders.has(key.toLowerCase())) {
        options.headers[key] = value;
      }
    }

    // Fix host header
    options.headers["host"] = SUPABASE_HOST;

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        // Forward response headers, handling multi-value headers properly
        const responseHeaders = {};
        for (const [key, value] of Object.entries(res.headers)) {
          const lowerKey = key.toLowerCase();
          if (lowerKey === "transfer-encoding") continue;

          // Node.js http module stores set-cookie as array; Netlify needs it as
          // comma-separated string for multi-value headers
          responseHeaders[key] = Array.isArray(value) ? value.join(", ") : value;
        }
        // Ensure CORS
        responseHeaders["access-control-allow-origin"] = "*";
        responseHeaders["access-control-allow-credentials"] = "true";

        // If request has Authorization header, expose it
        responseHeaders["access-control-allow-headers"] =
          "authorization, x-client-info, apikey, content-type";

        resolve({
          statusCode: res.statusCode || 200,
          headers: responseHeaders,
          body: body,
        });
      });
    });

    req.on("error", (err) => {
      resolve({
        statusCode: 502,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ error: "Proxy error", message: err.message }),
      });
    });

    // Send body for POST/PUT/PATCH
    if (event.body && ["POST", "PUT", "PATCH", "DELETE"].includes(event.httpMethod)) {
      const bodyData = event.isBase64Encoded
        ? Buffer.from(event.body, "base64").toString()
        : event.body;
      req.write(bodyData);
    }

    req.end();
  });
};
