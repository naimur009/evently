import Link from "next/link";
import React from "react";

export default function PaymentSuccess() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }

          @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            80% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
          }
          .animate-pop-in {
            animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
          }
          .animate-pulse-slow {
            animation: pulse 2s infinite;
          }
        `}
      </style>

      {/* Success Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10 text-center flex flex-col items-center animate-fade-in">
        
        {/* Animated Success Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center border-4 border-green-200 transform scale-0 animate-pop-in shadow-lg">
            <svg
              className="w-14 h-14 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* Glowing Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-green-400 opacity-50 animate-pulse-slow"></div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 font-light max-w-sm">
          Your ticket purchase is confirmed. A confirmation email has been sent
          to your inbox.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="flex-1 sm:flex-none px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Back to Home
          </Link>
          <Link
            href="/my-tickets"
            className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-1"
          >
            View My Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}
