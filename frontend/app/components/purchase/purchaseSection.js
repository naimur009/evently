"use client";
import React, { useState } from "react";
import { Ticket, CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { isValidCoupon } from "@/app/libs/couponVerify";
import { purchaseFunction } from "@/app/libs/purchase";

const TicketPurchaseSection = ({ event }) => {
  const token = Cookies.get("Token") || null;
  const router = useRouter();

  const [availableTickets, setAvailableTickets] = useState(event.availableTickets);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState(null);
  const [finalPrice, setFinalPrice] = useState(event.price);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 🔹 error message state

  const handleValidateCoupon = async () => {
    setErrorMessage(""); // reset error
    const data = await isValidCoupon(couponCode, event.event_id);

    if (data?.status === true) {
      setCouponStatus("valid");
      setFinalPrice((event.price - (event.price * data?.discount) / 100) || event.price);
    } else {
      setCouponStatus("invalid");
      setFinalPrice(event.price);
    }
  };

  const handlePurchase = async () => {
    setErrorMessage(""); // reset error

    if (token == null) {
      router.push("/log-in");
      return;
    }

    setLoading(true);
    console.log("Initiating purchase...");
    
    try {
      const response = await purchaseFunction(event.event_id, couponStatus == "valid", couponCode);
      console.log(response);

      if (response.status === "success") {
        window.location.href = response.data.url;
      } else {
        setErrorMessage(response.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      setErrorMessage("Failed to complete purchase. Please try again.");
      setLoading(false);
    }
  };

  const soldPercentage =
    ((event.totalTickets - availableTickets) / event.totalTickets) * 100;

  return (
    <div className="relative mt-10 bg-white/90 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-200 w-[95%] max-w-lg mx-auto overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-40 rounded-3xl" />

      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
        🎟️ Ticket Information
      </h3>

      {/* Tickets progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
          <span>Available Tickets</span>
          <span>{availableTickets} left</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
            style={{ width: `${soldPercentage}%` }}
          />
        </div>
      </div>

      {/* Price section */}
      <div className="mb-6 flex justify-between items-center">
        <span className="text-lg font-medium text-gray-700">Price</span>
        <div className="flex items-baseline space-x-3">
          <span
            className={`text-xl sm:text-2xl font-bold ${couponStatus === "valid"
                ? "text-gray-400 line-through"
                : "text-gray-900"
              }`}
          >
            ${event.price.toFixed(2)}
          </span>
          {couponStatus === "valid" && (
            <span className="text-xl sm:text-2xl font-bold text-green-600">
              ${finalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Coupon Field */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-600 mb-1 block">
          Coupon Code
        </label>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="SAVE10"
            className="w-full flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleValidateCoupon}
            className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition-all text-sm"
          >
            Apply
          </button>
        </div>

        {/* Coupon Status */}
        {couponStatus === "valid" && (
          <div className="flex items-center mt-2 text-sm text-green-600 font-medium">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Coupon applied!
          </div>
        )}
        {couponStatus === "invalid" && (
          <div className="flex items-center mt-2 text-sm text-red-600 font-medium">
            <XCircle className="w-4 h-4 mr-1" />
            Invalid coupon code.
          </div>
        )}
      </div>


      {/* 🔹 Error Message */}
      {errorMessage && (
        <div className="flex items-center mb-4 text-sm text-red-600 font-medium">
          <AlertCircle className="w-5 h-5 mr-2" />
          {errorMessage}
        </div>
      )}

      {/* Buy Button */}
      <button
        onClick={handlePurchase}
        disabled={availableTickets === 0 || loading}
        className={`w-full px-8 py-3 rounded-full font-bold text-lg text-white flex items-center justify-center space-x-2 transition-all duration-300 ${availableTickets > 0 && !loading
            ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-[1.02] shadow-lg shadow-blue-500/30"
            : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Ticket className="w-6 h-6" />
            <span>{availableTickets > 0 ? "Buy Ticket" : "Sold Out"}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default TicketPurchaseSection;
