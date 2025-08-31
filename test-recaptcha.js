// Test script to debug reCAPTCHA configuration
// Run this in browser console to test your keys

async function testRecaptcha() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  console.log("Site Key:", siteKey ? "Present" : "Missing");
  console.log("Secret Key:", secretKey ? "Present" : "Missing");

  if (!siteKey || !secretKey) {
    console.error("❌ Keys are missing from environment variables");
    return;
  }

  // Test the verification endpoint
  try {
    const response = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        message: "Test message for reCAPTCHA debugging",
        recaptchaToken: "test_token", // This will fail but show us the error
      }),
    });

    const result = await response.json();
    console.log("API Response:", result);
  } catch (error) {
    console.error("API Error:", error);
  }
}

// Call the test function
testRecaptcha();
