"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/add", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Form submitted successfully!",
        });
        reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Failed to submit form",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    }

    // Clear status after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <div className="bg-gray-900 text-amber-50 py-10">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:flex lg:items-center lg:justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Image - Hidden on small screens, visible from md up */}
          <motion.div
            className="hidden md:block md:w-full lg:w-1/2 xl:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <Image
                  alt="Contact image"
                  src="/person2.jpg"
                  width={1824}
                  height={1080}
                  className="w-full h-auto rounded-md bg-white/5 ring-1 ring-white/10"
                />
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="w-full lg:w-1/2 xl:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              Get in touch
            </h1>
            <h2 className="text-lg md:text-xl mb-6">
              Let's build something amazing together! Feel free to reach out
            </h2>

            {/* Status Message */}
            {submitStatus && (
              <motion.div
                className={`mb-4 p-4 rounded-md ${
                  submitStatus.type === "success"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name fields - side by side on sm and up, stacked on mobile */}
              <div className="mb-6">
                <h2 className="text-xl mb-3">Name *</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/2">
                    <input
                      className="bg-amber-50 text-black h-10 w-full px-3 text-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      {...register("firstName", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        minLength: { value: 2, message: "Min length is 2" },
                        maxLength: { value: 50, message: "Max length is 50" },
                      })}
                    />
                    <label htmlFor="firstName" className="text-sm block mt-1">
                      First Name *
                    </label>
                    {errors.firstName && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.firstName.message}
                      </div>
                    )}
                  </div>

                  <div className="w-full sm:w-1/2">
                    <input
                      className="bg-amber-50 text-black h-10 w-full px-3 text-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      {...register("lastName", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        minLength: { value: 2, message: "Min length is 2" },
                        maxLength: { value: 50, message: "Max length is 50" },
                      })}
                    />
                    <label htmlFor="lastName" className="text-sm block mt-1">
                      Last Name *
                    </label>
                    {errors.lastName && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="text-xl block mb-3">
                  Email *
                </label>
                <input
                  className="bg-amber-50 text-black h-10 w-full px-3 text-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: {
                      value: 5,
                      message: "Min length is 5 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Max length is 50 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="text-xl block mb-3">
                  Message *
                </label>
                <textarea
                  className="bg-amber-50 text-black h-32 w-full px-3 py-2 text-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="message"
                  placeholder="Enter your Message"
                  {...register("message", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: { value: 10, message: "Min length is 10" },
                    maxLength: { value: 1000, message: "Max length is 1000" },
                  })}
                />
                {errors.message && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </div>
                )}
              </div>

              {/* Security text */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-full sm:w-1/2">
                    <input
                      className="bg-amber-50 text-black h-10 w-full px-3 text-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="securitytext"
                      placeholder="Enter security text"
                      {...register("securitytext", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                        minLength: { value: 3, message: "Min length is 3" },
                        maxLength: {
                          value: 3,
                          message: "Max length is 3",
                        },
                      })}
                    />
                    {errors.securitytext && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.securitytext.message}
                      </div>
                    )}
                  </div>
                  <div className="bg-white/10 h-10 px-4 flex items-center rounded">
                    <h2 className="text-xl">IJn</h2>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-8">
                <div className="flex justify-start sm:justify-center lg:justify-start">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
