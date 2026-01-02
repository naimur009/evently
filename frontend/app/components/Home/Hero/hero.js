"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Main App component to display the Hero Section
const HeroSection = () => {
  return (
    // Hero section container with a light background and a clean layout
    <div className="relative flex items-center justify-center min-h-screen bg-white pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Background blobs for modern feel */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none" />

      {/* Main content container */}
      <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

        {/* Text content area */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-sm font-semibold tracking-wide uppercase"
          >
            Live Moments, Real Memories
          </motion.div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Adventure</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
            Secure tickets to concerts, sports events, festivals, and more. Your journey to unforgettable moments starts here.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/all-events" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-colors"
              >
                Explore Events
              </motion.button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg text-gray-700 bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Image collage container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:w-1/2 flex justify-center relative"
        >
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg relative z-10">
            {/* First image */}
            <div className="flex flex-col gap-4 mt-8">
              <motion.div whileHover={{ y: -5 }} className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-2xl relative group">
                <Image
                  src="https://placehold.co/400x500/60a5fa/ffffff?text=CONCERT"
                  alt="Concert"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  priority
                />
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="w-full h-32 sm:h-48 rounded-2xl overflow-hidden shadow-2xl relative group">
                <Image
                  src="https://placehold.co/400x300/f87171/ffffff?text=SPORTS"
                  alt="Sports"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Second column */}
            <div className="flex flex-col gap-4">
              <motion.div whileHover={{ y: -5 }} className="w-full h-32 sm:h-48 rounded-2xl overflow-hidden shadow-2xl relative group">
                <Image
                  src="https://placehold.co/400x300/fbbf24/ffffff?text=COMEDY"
                  alt="Comedy"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-2xl relative group">
                <Image
                  src="https://placehold.co/400x500/4ade80/ffffff?text=THEATER"
                  alt="Theater"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </motion.div>
            </div>
          </div>

          {/* Decorative elements behind images */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full filter blur-3xl transform scale-110 -z-10" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
