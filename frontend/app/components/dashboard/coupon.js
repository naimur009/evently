import api from "@/app/libs/axios";
import React, { useState, useCallback, useEffect } from "react";

// Ticket Icon
const TicketIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M2 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 1 0 4h-2a2 2 0 0 0-2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 0-2-2h-2a2 2 0 0 1 0-4h2a2 2 0 0 0 2-2z" />
    </svg>
);

// Trash Icon
const TrashIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
    </svg>
);

const CouponCard = ({ coupon, onDelete }) => {
    const { coupon_code, discount, total_used } = coupon;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border bg-[#F9FAFB] border-indigo-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow">
            {/* Left */}
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <TicketIcon className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-base sm:text-lg text-indigo-800">{coupon_code}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                    {discount > 0 ? `${discount}% off` : "Free Shipping"}
                </p>
                <span className="text-xs text-gray-500 mt-1">{coupon.total_used} used</span>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button
                    onClick={onDelete}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition text-sm shadow-sm"
                >
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

const CouponList = ({id, coupon}) => {
    

    const [showAddForm, setShowAddForm] = useState(false);
    const [newCoupon, setNewCoupon] = useState({ coupon_code: "", discount: 0 });

    const handleDeleteCoupon = async (id)=>{
        
        await api.delete(`/coupon/${id}`);
        window.location.reload();
        
    }

    const handleAddCouponClick = () => setShowAddForm((prev) => !prev);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCoupon((prev) => ({ ...prev, [name]: name === "discount" ? Number(value) : value }));
    };

    const handleAddNewCoupon = async () => {
        if (!newCoupon.coupon_code) return alert("Coupon code is required");
        const couponData = {
            eventID: id,
            coupon_code: newCoupon.coupon_code,
            discount: newCoupon.discount
        }
        await api.post(
            "/coupon/create/",
            {couponData}
        )
        window.location.reload();
        setShowAddForm(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">🎟 Coupons</h2>
                <button
                    onClick={handleAddCouponClick}
                    className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition text-sm font-medium shadow-sm"
                >
                    {showAddForm ? "Cancel" : "+ Add Coupon"}
                </button>
            </div>

            {/* Add Coupon Form */}
            {showAddForm && (
                <div className="flex flex-col gap-3 mb-6 max-w-md mx-auto">
                    <input
                        type="text"
                        name="coupon_code"
                        placeholder="Coupon Code"
                        value={newCoupon.coupon_code}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder-gray-400"
                    />
                    <input
                        type="text"
                        name="discount"
                        placeholder="Discount %"
                        value={newCoupon.discount || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder-gray-400"
                    />
                    <button
                        onClick={handleAddNewCoupon}
                        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
                    >
                        Add Coupon
                    </button>
                </div>

            )}

            {/* Coupon List */}
            {coupon.length === 0 ? (
                <div className="text-gray-500 text-center py-6">No coupons found.</div>
            ) : (
                <div className="space-y-4">
                    {coupon.map((coupon, idx) => (
                        <CouponCard key={coupon._id} coupon={coupon} onDelete={() => handleDeleteCoupon(coupon._id)} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CouponList;
