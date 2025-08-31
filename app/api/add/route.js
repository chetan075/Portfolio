import { connectToDatabase } from "@/lib/mongodb";
import validator from "validator";

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per window

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const requests = rateLimitStore.get(ip);
  // Remove old requests outside the window
  const validRequests = requests.filter((time) => now - time < windowMs);
  rateLimitStore.set(ip, validRequests);

  if (validRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  validRequests.push(now);
  return true; // OK to proceed
}

async function verifyRecaptcha(token) {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn("reCAPTCHA secret key not configured");
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();

    if (!data.success) {
      console.error("reCAPTCHA verification failed:", data["error-codes"]);
      return false;
    }

    // For v3, check the score (0.0 - 1.0, where 1.0 is very likely a human)
    if (data.score !== undefined) {
      // Accept scores above 0.5 (you can adjust this threshold)
      return data.score > 0.5;
    }

    // For v2, just check success
    return data.success;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

export async function POST(req) {
  try {
    // Check if we're in build time (no request object)
    if (!req || typeof req.json !== "function") {
      return Response.json(
        { success: false, message: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    // Rate limiting
    const clientIP =
      req.headers?.get("x-forwarded-for") ||
      req.headers?.get("x-real-ip") ||
      req.headers?.get("cf-connecting-ip") ||
      "unknown";

    if (!checkRateLimit(clientIP)) {
      return Response.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Check if MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI not configured");
      return Response.json(
        { success: false, message: "Service configuration error" },
        { status: 500 }
      );
    }

    // Parse the request body
    const body = await req.json();
    const { firstName, lastName, email, message, recaptchaToken } = body;

    // Check if the required fields are present
    if (!firstName || !lastName || !email || !message) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA (required)
    if (!recaptchaToken) {
      return Response.json(
        { success: false, message: "reCAPTCHA verification is required" },
        { status: 400 }
      );
    }

    const isValidCaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidCaptcha) {
      return Response.json(
        { success: false, message: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Sanitize and validate inputs
    const sanitizedFirstName = validator.escape(validator.trim(firstName));
    const sanitizedLastName = validator.escape(validator.trim(lastName));
    const sanitizedEmail = validator.normalizeEmail(email);
    const sanitizedMessage = validator.escape(validator.trim(message));

    // Validate email
    if (!validator.isEmail(sanitizedEmail)) {
      return Response.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate lengths
    if (sanitizedFirstName.length < 2 || sanitizedFirstName.length > 50) {
      return Response.json(
        {
          success: false,
          message: "First name must be between 2 and 50 characters",
        },
        { status: 400 }
      );
    }

    if (sanitizedLastName.length < 2 || sanitizedLastName.length > 50) {
      return Response.json(
        {
          success: false,
          message: "Last name must be between 2 and 50 characters",
        },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
      return Response.json(
        {
          success: false,
          message: "Message must be between 10 and 1000 characters",
        },
        { status: 400 }
      );
    }

    // Connect to database
    let db;
    try {
      db = await connectToDatabase();
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return Response.json(
        { success: false, message: "Service temporarily unavailable" },
        { status: 500 }
      );
    }

    // Insert the data into the collection
    await db.collection("form_submissions").insertOne({
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      createdAt: new Date(),
      ip: clientIP,
      userAgent: req.headers?.get("user-agent") || "unknown",
      recaptchaVerified: true,
    });

    return Response.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    // Don't expose internal error details
    return Response.json(
      { success: false, message: "Service temporarily unavailable" },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return Response.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}

export async function PUT() {
  return Response.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}

export async function DELETE() {
  return Response.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}
