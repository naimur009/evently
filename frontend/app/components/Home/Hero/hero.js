"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Main App component to display the Hero Section
const HeroSection = () => {
  return (
    // Hero section container with a light premium background
    <div className="relative flex items-center justify-center min-h-screen bg-white pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Background Gradients & Glows - Light Theme */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,black,rgba(0,0,0,0))] opacity-5" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[100px] opacity-60 pointer-events-none" />

      {/* Main content container */}
      <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10">

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
            className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide uppercase shadow-sm"
          >
            Live Moments, Real Memories
          </motion.div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Discover Your <br /> Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Adventure</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
            Secure tickets to concerts, sports events, festivals, and more. Your journey to unforgettable moments starts here.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link href="/all-events" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
              >
                Explore Events
              </motion.button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:text-gray-900 shadow-sm transition-all"
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
              <motion.div whileHover={{ y: -5 }} className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-gray-100 shadow-2xl shadow-blue-900/10 relative group bg-gray-100">
                <Image
                  src="https://placehold.co/400x500/1e3a8a/ffffff?text=CONCERT"
                  alt="Concert"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
                <span className="absolute bottom-3 left-3 z-20 text-white font-bold text-sm bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-lg">CONCERT</span>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="w-full h-32 sm:h-48 rounded-2xl overflow-hidden border border-gray-100 shadow-2xl shadow-indigo-900/10 relative group bg-gray-100">
                <Image
                  src="https://placehold.co/400x300/be123c/ffffff?text=SPORTS"
                  alt="Sports"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
                <span className="absolute bottom-3 left-3 z-20 text-white font-bold text-sm bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-lg">SPORTS</span>
              </motion.div>
            </div>

            {/* Second column */}
            <div className="flex flex-col gap-4">
              <motion.div whileHover={{ y: -5 }} className="w-full h-32 sm:h-48 rounded-2xl overflow-hidden border border-gray-100 shadow-2xl shadow-yellow-900/10 relative group bg-gray-100">
                <Image
                  src="https://placehold.co/400x300/b45309/ffffff?text=COMEDY"
                  alt="Comedy"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
                <span className="absolute bottom-3 left-3 z-20 text-white font-bold text-sm bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-lg">COMEDY</span>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-gray-100 shadow-2xl shadow-green-900/10 relative group bg-gray-100">
                <Image
                  src="https://placehold.co/400x500/15803d/ffffff?text=THEATER"
                  alt="Theater"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
                <span className="absolute bottom-3 left-3 z-20 text-white font-bold text-sm bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-lg">THEATER</span>
              </motion.div>
            </div>
          </div>

          {/* Decorative glowing gradient behind images */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full filter blur-[80px] scale-110 -z-10" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
