"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [submitStatus, setSubmitStatus] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  // Prevent hydration mismatch by only rendering on client
  useEffect(() => {
    setIsClient(true);

    // Load reCAPTCHA v3 script
    if (!window.grecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      console.log("📜 Loading reCAPTCHA script...");
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        console.log("✅ reCAPTCHA script loaded");
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            console.log("🎯 reCAPTCHA v3 ready for use");
          });
        } else {
          console.error("❌ grecaptcha object not found after script load");
        }
      };

      script.onerror = () => {
        console.error("❌ Failed to load reCAPTCHA script");
      };
    } else {
      console.log("ℹ️ reCAPTCHA already loaded or no site key");
    }
  }, []);

  const executeRecaptcha = async () => {
    console.log("🔍 executeRecaptcha called");
    console.log("🔑 Site Key:", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    console.log("🤖 grecaptcha available:", !!window.grecaptcha);

    if (window.grecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      try {
        console.log("🚀 Executing reCAPTCHA...");
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          { action: "contact_form" }
        );
        console.log("✅ reCAPTCHA token received:", token ? "YES" : "NO");
        setRecaptchaToken(token);
        return token;
      } catch (error) {
        console.error("❌ reCAPTCHA execution failed:", error);
        return null;
      }
    } else {
      console.error("❌ reCAPTCHA not available:", {
        grecaptcha: !!window.grecaptcha,
        siteKey: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      });
      return null;
    }
  };

  const onSubmit = async (data) => {
    console.log("📝 Form submitted with data:", data);

    try {
      // Execute reCAPTCHA v3
      console.log("🔐 Starting reCAPTCHA verification...");
      const token = await executeRecaptcha();
      console.log(
        "🔑 reCAPTCHA result:",
        token ? "Token received" : "No token"
      );

      if (!token) {
        console.error("❌ reCAPTCHA verification failed - no token");
        setSubmitStatus({
          type: "error",
          message: "reCAPTCHA verification failed. Please try again.",
        });
        return;
      }

      const formData = {
        ...data,
        recaptchaToken: token,
      };
      console.log("📤 Sending form data to API...");

      const response = await fetch("/api/add", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("📥 API response status:", response.status);
      const result = await response.json();
      console.log("📋 API response:", result);

      if (result.success) {
        console.log("✅ Form submission successful");
        setSubmitStatus({
          type: "success",
          message: "Form submitted successfully!",
        });
        reset();
        setRecaptchaToken(null);
      } else {
        console.error("❌ API returned error:", result.message);
        setSubmitStatus({
          type: "error",
          message: result.message || "Failed to submit form",
        });
      }
    } catch (error) {
      console.error("💥 Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    }

    // Clear status after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  if (!isClient) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 mb-6">
              <span className="text-sm font-medium text-blue-400">
                Get In Touch
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Let's Build Something
              </span>
              <br />
              <span className="text-gray-300">Amazing Together</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Loading contact form...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 mb-6">
            <span className="text-sm font-medium text-blue-400">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Let's Build Something
            </span>
            <br />
            <span className="text-gray-300">Amazing Together</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat about technology? I'd
            love to hear from you. Let's create something extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-200">
                Let's Connect
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                I'm always interested in new opportunities, whether it's a
                full-time position, freelance project, or just a friendly chat
                about technology and innovation.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Email</h4>
                  <p className="text-gray-400">chetan@example.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Phone</h4>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Location</h4>
                  <p className="text-gray-400">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-semibold mb-6 text-gray-200">
              Send a Message
            </h3>

            {/* Status Message */}
            {submitStatus && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-600/20 border border-green-500/30 text-green-400"
                    : "bg-red-600/20 border border-red-500/30 text-red-400"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    type="text"
                    name="firstName"
                    placeholder="John"
                    {...register("firstName", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: { value: 2, message: "Min length is 2" },
                      maxLength: { value: 50, message: "Max length is 50" },
                    })}
                  />
                  {errors.firstName && (
                    <div className="text-red-400 text-sm mt-1">
                      {errors.firstName.message}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    {...register("lastName", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: { value: 2, message: "Min length is 2" },
                      maxLength: { value: 50, message: "Max length is 50" },
                    })}
                  />
                  {errors.lastName && (
                    <div className="text-red-400 text-sm mt-1">
                      {errors.lastName.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email *
                </label>
                <input
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message *
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  {...register("message", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: {
                      value: 10,
                      message: "Min length is 10 characters",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Max length is 1000 characters",
                    },
                  })}
                />
                {errors.message && (
                  <div className="text-red-400 text-sm mt-1">
                    {errors.message.message}
                  </div>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
