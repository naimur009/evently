"use client";
import React from 'react';
import {
    MapPin,
    DollarSign,
    Users,
    Clock,
    Edit,
    Trash2,
    User,
    Percent,
    Tag,
    CalendarDays,
    ChevronLeft,
    TrendingUp,
    BarChart3,
    Ticket
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CouponList from './coupon';
import { motion } from 'framer-motion';

export default function EventDetailsPage({ data }) {
    if (!data || !data.event_data || data.event_data.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-gray-500 font-medium">No event data found.</p>
            </div>
        );
    }

    const event = data.event_data[0];
    const payment = data.payment[0];
    const coupons = data.coupons;

    const ticketsRemaining = event.ticket_limit - event.ticket_sold;
    const revenue = event.ticket_sold * event.price;
    const salesPercentage = (event.ticket_sold / event.ticket_limit) * 100;
    const netSells = payment?.totalAmount || 0;
    const couponDiscount = revenue - netSells;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen pb-20"
        >
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Top Navigation & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <Link
                        href="/dashboard/events"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors group w-fit"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Events
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href={`/dashboard/events/edit/${event._id}`}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                        >
                            <Edit size={16} /> Edit Event
                        </Link>
                        <Link
                            href={`/dashboard/events/delete/${event._id}`}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-all active:scale-95"
                        >
                            <Trash2 size={16} /> Delete
                        </Link>
                    </div>
                </div>

                {/* Hero Section */}
                <motion.div variants={itemVariants} className="relative rounded-[2rem] overflow-hidden bg-white shadow-xl shadow-gray-200/50 border border-gray-100">
                    <div className="flex flex-col lg:flex-row">
                        {/* Image Side */}
                        <div className="lg:w-2/5 relative h-64 lg:h-auto">
                            <Image
                                src={event.image}
                                alt={event.event_title}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:hidden" />
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg
                                    ${ticketsRemaining <= 0 ? "bg-red-500 text-white" : "bg-white/90 backdrop-blur-md text-gray-900"}
                                `}>
                                    {ticketsRemaining <= 0 ? "Sold Out" : "Active Selling"}
                                </span>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="lg:w-3/5 p-8 sm:p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-3">
                                    <Tag size={14} />
                                    {event.category?.categoryName || "General Event"}
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                                    {event.event_title}
                                </h1>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                    <DetailItem
                                        icon={<CalendarDays className="text-blue-500" />}
                                        label="Date & Time"
                                        value={`${new Date(event.event_date).toLocaleDateString()} at ${event.time}`}
                                    />
                                    <DetailItem
                                        icon={<MapPin className="text-red-500" />}
                                        label="Venue"
                                        value={`${event.venue}, ${event.city}`}
                                    />
                                    <DetailItem
                                        icon={<User className="text-indigo-500" />}
                                        label="Organizer"
                                        value={event.organizer}
                                    />
                                    <DetailItem
                                        icon={<TrendingUp className="text-emerald-500" />}
                                        label="Registration Price"
                                        value={event.price === 0 ? "Free Entry" : `$${event.price.toFixed(2)}`}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                                            <div className="w-full h-full bg-gradient-to-tr from-gray-300 to-gray-400" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                                        +{event.ticket_sold}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 font-medium italic">Already registered</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Performance Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sales Metrics Cards */}
                    <div className="lg:col-span-8 space-y-8">
                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <StatCard
                                icon={<Ticket className="text-indigo-600" />}
                                label="Total Capacity"
                                value={event.ticket_limit}
                                trend="+0% growth"
                            />
                            <StatCard
                                icon={<Users className="text-emerald-600" />}
                                label="Tickets Sold"
                                value={event.ticket_sold}
                                subValue={`${salesPercentage.toFixed(1)}% Fill rate`}
                            />
                            <StatCard
                                icon={<BoxIcon className="text-orange-600" />}
                                label="Remaining"
                                value={ticketsRemaining}
                                subValue="Available"
                            />
                            <StatCard
                                icon={<DollarSign className="text-blue-600" />}
                                label="Gross Revenue"
                                value={`$${revenue.toFixed(2)}`}
                            />
                            <StatCard
                                icon={<Percent className="text-red-600" />}
                                label="Discounts"
                                value={`$${couponDiscount.toFixed(2)}`}
                                valueClass="text-red-500"
                            />
                            <StatCard
                                icon={<BarChart3 className="text-indigo-600" />}
                                label="Net Earnings"
                                value={`$${netSells.toFixed(2)}`}
                                highlight
                            />
                        </motion.div>

                        {/* Progress Visualization */}
                        <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-black text-gray-900 tracking-tight">Sales Velocity</h3>
                                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                                    {salesPercentage >= 100 ? "Sold Out" : `${salesPercentage.toFixed(1)}% Reached`}
                                </span>
                            </div>
                            <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${salesPercentage}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                                />
                            </div>
                            <div className="mt-4 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <span>0 Reserved</span>
                                <span>{event.ticket_limit} Capacity</span>
                            </div>
                        </motion.div>

                        {/* About Section */}
                        <motion.section variants={itemVariants} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight mb-4">Event Strategy & Info</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                {event.description}
                            </p>
                        </motion.section>
                    </div>

                    {/* Coupons Sidebar */}
                    <motion.div variants={itemVariants} className="lg:col-span-4">
                        <CouponList id={event._id} coupon={coupons} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

// --- Internal Reusable Components ---

function DetailItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                {React.cloneElement(icon, { size: 18 })}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 leading-none">{label}</p>
                <p className="text-sm font-bold text-gray-800 leading-tight">{value}</p>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, subValue, trend, valueClass, highlight }) {
    return (
        <div className={`p-6 rounded-[2rem] transition-all duration-300 border
            ${highlight
                ? "bg-indigo-600 border-indigo-700 shadow-xl shadow-indigo-200"
                : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:translate-y-[-2px]"
            }`}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                    ${highlight ? "bg-white/20" : "bg-gray-50"}
                `}>
                    {React.cloneElement(icon, { size: 20, className: highlight ? "text-white" : icon.props.className })}
                </div>
                {trend && (
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {trend}
                    </span>
                )}
            </div>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-1
                ${highlight ? "text-indigo-100" : "text-gray-400"}
            `}>
                {label}
            </p>
            <p className={`text-2xl font-black tracking-tight
                ${highlight ? "text-white" : valueClass || "text-gray-900"}
            `}>
                {value}
            </p>
            {subValue && (
                <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight
                    ${highlight ? "text-indigo-200" : "text-gray-400"}
                `}>
                    {subValue}
                </p>
            )}
        </div>
    );
}

function BoxIcon({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    );
}
