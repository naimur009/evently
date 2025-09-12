
import { MapPin, DollarSign, Users, Clock, Edit, Trash2, User, Percent, Tag, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import CouponManager from './coupon';
import CouponList from './coupon';

export default function EventDetailsPage({ data }) {

    const event = data.event_data[0];
    const payment = data.payment[0];
    const coupons = data.coupons;



    const ticketsRemaining = event.ticket_limit - event.ticket_sold;
    const revenue = event.ticket_sold * event.price;
    const salesPercentage = (event.ticket_sold / event.ticket_limit) * 100;
    const netSells = payment?.totalAmount || 0;
    const couponDiscount = revenue - netSells;



    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
                {/* Header */}
                <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                        {event.event_title}
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                            href={`/dashboard/events/edit/${event._id}`}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl text-indigo-600 bg-indigo-100 cursor-pointer"
                        >
                            <Edit size={16} /> Edit
                        </Link>
                        <Link
                            href={`/dashboard/events/delete/${event._id}`}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl text-red-600 bg-red-100 cursor-pointer"
                        >
                            <Trash2 size={16} /> Delete
                        </Link>
                    </div>
                </header>

                {/* Hero */}
                <section className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-7xl mx-auto my-6">
                    {/* Event Image */}
                    <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96">
                        <img
                            src={event.image || `https://placehold.co/1200x600/60a5fa/ffffff?text=${event.event_title.split(" ").join("+")}`}
                            alt={event.event_title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>

                    {/* Event Details */}
                    <div className="bg-white rounded-3xl shadow-md p-6 mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <CalendarDays className="text-blue-600" size={22} /> Event Details
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {/* Date */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-xl">
                                    <CalendarDays className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="text-gray-800 font-medium">
                                        {new Date(event.event_date).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Time */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-100 rounded-xl">
                                    <Clock className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Time</p>
                                    <p className="text-gray-800 font-medium">{event.time}</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-red-100 rounded-xl">
                                    <MapPin className="text-red-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="text-gray-800 font-medium">{event.venue}, {event.city}</p>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-yellow-100 rounded-xl">
                                    <DollarSign className="text-yellow-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Price</p>
                                    <p className="text-gray-800 font-medium">
                                        {event.price === 0 ? "Free Entry" : `$${event.price.toFixed(2)}`}
                                    </p>
                                </div>
                            </div>

                            {/* Deadline */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-purple-100 rounded-xl">
                                    <CalendarDays className="text-purple-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Registration Deadline</p>
                                    <p className="text-gray-800 font-medium">
                                        {new Date(event.deadline).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        })}
                                    </p>
                                </div>
                            </div>


                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-indigo-100 rounded-xl">
                                    <User className="text-indigo-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Organizer</p>
                                    <p className="text-gray-800 font-medium">{event.organizer}</p>
                                </div>
                            </div>

                            {/* Category */}
                            {event.category && (
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-pink-100 rounded-xl">
                                        <Tag className="text-pink-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Category</p>
                                        <p className="text-gray-800 font-medium">{event.category.categoryName}</p>
                                    </div>
                                </div>
                            )}

                            {/* Created By */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-indigo-100 rounded-xl">
                                    <User className="text-indigo-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">CreatedBy</p>
                                    <p className="text-gray-800 font-medium">{event.createdBy.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>



                {/* Main Content */}
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Sales Report */}
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow space-y-6 lg:col-span-2">
                        <h2 className="text-lg font-semibold text-gray-900">Sales Report</h2>

                        {/* Stats: 1 column on mobile, 2-3 columns on larger screens */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            <StatCard icon={<Users size={18} className="text-indigo-500" />} label="Total Ticket" value={event.ticket_limit} />
                            <StatCard icon={<Users size={18} className="text-indigo-500" />} label="Tickets Sold" value={event.ticket_sold} />
                            <StatCard label="Tickets Remaining" value={ticketsRemaining} />
                            <StatCard icon={<DollarSign size={18} className="text-indigo-500" />} label="Revenue" value={`$${revenue.toFixed(2)}`} />
                            <StatCard icon={<Percent size={18} className="text-red-500" />} label="Discounts" value={`-$${couponDiscount.toFixed(2)}`} valueClass="text-red-600" />
                            <StatCard label="Final Revenue" value={`$${netSells.toFixed(2)}`} />
                        </div>

                        {/* Ticket Progress */}
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Ticket Progress</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                                <div
                                    className="bg-indigo-600 h-2 sm:h-3 rounded-full transition-all"
                                    style={{ width: `${salesPercentage}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 text-right mt-1">
                                {salesPercentage.toFixed(1)}% Sold
                            </p>
                        </div>
                    </div>



                    {/* Coupons */}
                <CouponList id = {event._id} coupon = {coupons}/>


                </main>

                {/* Description */}
                <section className="bg-white p-4 sm:p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-3">About this Event</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {event.description}
                    </p>
                </section>
            </div>
        </div>
    );
}

// --- Reusable UI Components ---
function InfoItem({ icon, label }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-indigo-500">{icon}</span>
            <span>{label}</span>
        </div>
    );
}

function StatCard({ icon, label, value, valueClass }) {
    return (
        <div className="p-3 sm:p-4 rounded-xl bg-gray-50">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                {icon} {label}
            </div>
            <p className={`text-lg sm:text-xl font-bold mt-1 ${valueClass || 'text-gray-900'}`}>{value}</p>
        </div>
    );
}
