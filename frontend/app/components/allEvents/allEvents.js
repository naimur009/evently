"use client"
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";


const CalendarIcon = () => (
    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 10h5v5H7z" opacity=".3" />
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13zm0-15H5V5h14v1z" />
    </svg>
);

const LocationIcon = () => (
    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
    </svg>
);

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const EventsPage = ({ events }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    // Apply search and category filters only
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch =
                event.event_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.venue.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory =
                filterCategory === "All" || event.category.categoryName === filterCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, filterCategory, events]);

    if (!events || !Array.isArray(events) || events.length === 0) {
        return <p className="text-center text-gray-600 mt-10">Loading events...</p>;
    }
    

    const eventsPerPage = 4;
    const categories = ["All", ...new Set(events.map(e => e.category.categoryName))];

    

    // Pagination
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-['Inter'] antialiased text-gray-800 py-16 px-4 sm:px-6 lg:px-8 mt-10">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                        Upcoming Events
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Browse all the exciting events happening near you.
                    </p>
                </header>

                {/* Updated Search & Filter Section */}
                <div className="flex flex-col gap-6 mb-10">
                    {/* Search Input */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Category Filter Buttons */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setFilterCategory(cat);
                                    setCurrentPage(1);
                                }}
                                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg
                  ${filterCategory === cat
                                        ? "bg-blue-600 text-white transform scale-105"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }
                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Event Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage + searchQuery + filterCategory}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {currentEvents.length > 0 ? (
                            currentEvents.map((event) => (
                                <motion.div
                                    key={event._id}
                                    variants={cardVariants}
                                    className="group cursor-pointer rounded-3xl overflow-hidden border border-gray-200 bg-white/30 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
                                >
                                    <div className="relative">
                                        <Image
                                            src={event.image}
                                            alt={event.event_title}
                                            width={1200}
                                            height={600}
                                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                            unoptimized
                                        />
                                        <span className="absolute top-3 left-3 bg-white/80 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                            {event.category.categoryName}
                                        </span>
                                    </div>

                                    <div className="p-5 flex flex-col flex-1 space-y-3">
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                            {event.event_title}
                                        </h3>

                                        <div className="flex items-center text-gray-600 text-sm space-x-2">
                                            <CalendarIcon />
                                            <span>
                                                {new Date(event.event_date).toLocaleDateString("en-US", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }).replace(" ", ", ")}
                                            </span>
                                        </div>

                                        <div className="flex items-center text-gray-600 text-sm space-x-2">
                                            <LocationIcon />
                                            <span>{event.venue}</span>
                                        </div>

                                        <Link
                                            href={`/all-events/${event._id}`}
                                            className="mt-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all text-center"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-600 text-lg">No events found.</p>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10 space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded-md ${currentPage === i + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    } transition-colors`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
