import { NextResponse } from "next/server";

const rateLimitMap = new Map();

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Change to specific domain in production
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

export function middleware(request) {
  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const ip =
      request.ip || request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 10; // max 10 requests per window for API routes

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, []);
    }

    const requests = rateLimitMap.get(ip);
    // Remove old requests
    const validRequests = requests.filter((time) => now - time < windowMs);
    rateLimitMap.set(ip, validRequests);

    if (validRequests.length >= maxRequests) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": "900", // 15 minutes in seconds
            ...corsHeaders,
          },
        }
      );
    }

    validRequests.push(now);
  }

  // Add CORS headers to all responses
  const response = NextResponse.next();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
