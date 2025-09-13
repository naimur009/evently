"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import api from "@/app/libs/axios";

const EmailVerificationPage = () => {

  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");


  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isVerifying, setIsVerifying] = useState(false);
  const [shake, setShake] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setMessage("");
    setShake(false);

    const response = await api.get(
      `/verifyuser/${email}/${verificationCode}`,
    )

    if (response.data.status === "success") {
      router.push('/log-in');
      return;
    }

    setMessage("Invalid verification code. Please try again.");
    setMessageType("error");
    setShake(true);
    setIsVerifying(false);
    // return;
  };

  const handleResendCode = () => {
    // Start cooldown and simulate resend API call
    setResendCooldown(60);
    // In a real app, you would make an API call here to resend the code
    setMessage("New verification code sent to your email.");
    setMessageType("success");
  };

  // Cooldown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Auto-hide message after 3 seconds
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
            Verify Your Email
          </h1>
          <p className="mt-2 text-sm text-gray-600">A verification code has been sent to your email address.</p>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              variants={messageVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
              className={`mb-4 p-3 text-sm rounded-lg text-center border ${messageType === "success"
                  ? "text-green-700 bg-green-100 border-green-500"
                  : "text-red-700 bg-red-100 border-red-500"
                }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleVerify} className="space-y-6">
          {/* Verification Code */}
          <motion.div variants={inputVariant} initial="rest" whileFocus="focused">
            <input
              type="text"
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-sm placeholder-gray-500 text-center tracking-widest focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter Code"
              maxLength="6"
            />
          </motion.div>

          {/* Resend Code Button */}
          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendCooldown > 0}
            className="w-full text-center text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend Code"}
          </button>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isVerifying}
            whileTap={{ scale: 0.95 }}
            className="relative w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-[1.02] shadow-lg shadow-blue-500/30 transition-colors duration-200 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">{isVerifying ? "Verifying..." : "Verify"}</span>
            {isVerifying && (
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

export default EmailVerificationPage;
