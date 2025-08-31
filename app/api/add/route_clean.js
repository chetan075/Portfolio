import { connectToDatabase } from "@/lib/mongodb";
import validator from "validator";

export async function POST(req) {
  try {
    // Check if we're in build time (no request object)
    if (!req || typeof req.json !== "function") {
      return Response.json(
        { success: false, message: "Service temporarily unavailable" },
        { status: 503 }
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
    const { firstName, lastName, email, message, securitytext } = body;

    // Check if the required fields are present
    if (!firstName || !lastName || !email || !message || !securitytext) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Sanitize and validate inputs
    const sanitizedFirstName = validator.escape(validator.trim(firstName));
    const sanitizedLastName = validator.escape(validator.trim(lastName));
    const sanitizedEmail = validator.normalizeEmail(email);
    const sanitizedMessage = validator.escape(validator.trim(message));
    const sanitizedSecurityText = validator.escape(
      validator.trim(securitytext)
    );

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

    // TODO: Replace with proper CAPTCHA service (Google reCAPTCHA, hCaptcha, etc.)
    // For now, using a more secure approach with multiple options
    const validSecurityCodes = ["ijn", "IJN", "Ijn"];
    if (!validSecurityCodes.includes(sanitizedSecurityText)) {
      return Response.json(
        { success: false, message: "Incorrect security code" },
        { status: 400 }
      );
    }

    // Only connect to database when actually processing the request
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
      securitytext: sanitizedSecurityText,
      createdAt: new Date(),
      ip:
        req.headers?.get("x-forwarded-for") ||
        req.headers?.get("x-real-ip") ||
        req.headers?.get("cf-connecting-ip") ||
        "unknown",
      userAgent: req.headers?.get("user-agent") || "unknown",
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
