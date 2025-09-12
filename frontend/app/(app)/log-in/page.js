"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/app/libs/axios";

const inputBaseClasses =
  "w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 peer pr-12";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setShake(false);

    const response = await api.post(
      '/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );    

    if (response.data.status === "success") {
      router.push('/');
      return;
    }

    setMessage("Invalid credentials. Please try again.");
    setShake(true);
    setIsSubmitting(false);
    return;
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const inputVariant = {
    focused: { scale: 1.02 },
    rest: { scale: 1 },
  };

  const messageVariant = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 text-gray-800 font-['Inter'] antialiased p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className={`relative z-10 w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl border border-gray-200/50 ${shake ? "animate-shake" : ""
          }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
            Access Portal
          </h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to your dashboard</p>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              variants={messageVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
              className={"mb-4 p-3 text-sm rounded-lg text-center border text-red-700 bg-red-100 border-red-500"}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <motion.div variants={inputVariant} initial="rest" whileFocus="focused">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 peer"
              placeholder="Email address"
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={inputVariant} initial="rest" whileFocus="focused" className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pr-12 px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 peer"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.564-2.828M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.065 7-9.543 7-4.478 0-8.268-2.943-9.543-7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.95 }}
            className="relative w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-[1.02] shadow-lg shadow-blue-500/30 transition-colors duration-200 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">{isSubmitting ? "Signing In..." : "Sign In"}</span>
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 ml-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center text-gray-500 text-sm space-y-2">
          <p>
            <Link href="#" className="font-medium text-gray-600 hover:text-blue-500 transition-colors">
              Forgot password?
            </Link>
          </p>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>

      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
          }
          .animate-shake {
            animation: shake 0.6s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
