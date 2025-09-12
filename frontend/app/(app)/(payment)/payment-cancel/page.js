import Link from "next/link";

export default function PaymentCancelPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        {/* Cancel Icon */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. If this was a mistake, you can try
          again.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/all-events"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
