"use client";
import React, { useState } from "react";
import {
  Ticket,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Tag as TagIcon
} from "lucide-react";
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
  const [errorMessage, setErrorMessage] = useState("");

  const handleValidateCoupon = async () => {
    setErrorMessage("");
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
    setErrorMessage("");
    if (token == null) {
      router.push("/log-in");
      return;
    }
    setLoading(true);
    try {
      const response = await purchaseFunction(event.event_id, couponStatus == "valid", couponCode);
      if (response.status === "success") {
        window.location.href = response.data.url;
      } else {
        setErrorMessage(response.message);
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage("Failed to complete purchase. Please try again.");
      setLoading(false);
    }
  };

  const soldPercentage = ((event.totalTickets - availableTickets) / event.totalTickets) * 100;

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-gray-100 w-full overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 leading-none">Checkout</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Instant Booking</p>
            </div>
          </div>
          <div className="px-3 py-1 bg-green-50 rounded-full border border-green-100 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">Available</span>
          </div>
        </div>

        {/* Price Card */}
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Grand Total</span>
            <div className="text-right">
              {couponStatus === "valid" && (
                <p className="text-xs font-bold text-gray-400 line-through decoration-red-400">${event.price.toFixed(2)}</p>
              )}
              <p className="text-3xl font-black text-gray-900 tracking-tighter">${finalPrice.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200/50">
            {/* Availability Line */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Seats Left</span>
                <span className="text-blue-600">{availableTickets} / {event.totalTickets}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-700"
                  style={{ width: `${Math.max(soldPercentage, 5)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Promo code"
              className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-xs"
            />
            <button
              onClick={handleValidateCoupon}
              className="px-4 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all text-[10px] active:scale-95 disabled:opacity-30"
              disabled={!couponCode}
            >
              Apply
            </button>
          </div>

          {couponStatus === "valid" && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg border border-green-100 text-[9px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" /> Discount Applied
            </div>
          )}
          {couponStatus === "invalid" && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg border border-red-100 text-[9px] font-bold uppercase tracking-wider">
              <XCircle className="w-3.5 h-3.5" /> Invalid Code
            </div>
          )}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="text-[10px] font-bold leading-tight">{errorMessage}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handlePurchase}
            disabled={availableTickets === 0 || loading}
            className={`group relative w-full px-6 py-4 rounded-xl font-black text-base transition-all duration-300 shadow-xl ${availableTickets > 0 && !loading
                ? "bg-gray-900 hover:bg-black text-white hover:scale-[1.01] active:scale-[0.98]"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                <span className="tracking-tight">Processing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 relative z-10">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="tracking-tight">{availableTickets > 0 ? "Book Tickets" : "Sold Out"}</span>
              </div>
            )}
          </button>
        </div>

        {/* Trust Badge */}
        <div className="pt-2 flex items-center justify-center gap-2 text-gray-400 text-[9px] font-bold uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3 text-blue-600" />
          Secure Transaction Guaranteed
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaseSection;
