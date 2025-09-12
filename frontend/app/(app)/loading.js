"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-blue-900">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Spinner */}
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-blue-300 border-t-sky-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

        {/* Loading Text */}
        <motion.span
          className="text-lg font-medium tracking-wide text-blue-600"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Loading...
        </motion.span>
      </motion.div>
    </div>
  );
}
