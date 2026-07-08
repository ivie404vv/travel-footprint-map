// Netlify Serverless Function - Proxy Supabase API requests
// This allows users in China to access Supabase through Netlify's CDN

const SUPABASE_URL = "https://xsouqeqcstyolopmttp.supabase.co";

exports.handler = async (event) => {
  // Extract the API path from the rewritten URL
  // netlify.toml rewrites /rest/v1/xxx to /.netlify/functions/supabase-proxy/rest/v1/xxx
  const path = event.path.replace("/.netlify/functions/supabase-proxy", "");

  // Build full Supabase URL with query params
  let url = `${SUPABASE_URL}${path}`;
  if (event.rawQuery) {
    url += `?${event.rawQuery}`;
  }

  // Forward headers, filtering out host-specific and Netlify-internal ones
  const headers = {};
  const skipHeaders = new Set([
    "host", "x-forwarded-for", "x-forwarded-proto", "x-forwarded-port",
    "x-forwarded-host", "x-nf-client-connection-ip", "x-nf-request-id",
    "accept-encoding", "connection", "content-length",
  ]);

  for (const [key, value] of Object.entries(event.headers)) {
    if (!skipHeaders.has(key.toLowerCase())) {
      headers[key] = value;
    }
  }

  try {
    const fetchOptions = {
      method: event.httpMethod,
      headers: headers,
    };

    // Include body for non-GET/HEAD requests
    const hasBody = event.body && event.httpMethod !== "GET" && event.httpMethod !== "HEAD";
    if (hasBody) {
      fetchOptions.body = event.isBase64Encoded
        ? Buffer.from(event.body, "base64")
        : event.body;
    }

    const response = await fetch(url, fetchOptions);

    // Forward response headers (especially Set-Cookie for auth)
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      // Skip transfer-encoding as Netlify will handle it
      if (key.toLowerCase() !== "transfer-encoding") {
        responseHeaders[key] = value;
      }
    });

    return {
      statusCode: response.status,
      headers: responseHeaders,
      body: await response.text(),
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: "Proxy error", message: err.message }),
    };
  }
};
