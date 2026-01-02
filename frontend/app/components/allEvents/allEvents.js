"use client"
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Search, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
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


    const eventsPerPage = 6;
    const categories = ["All", ...new Set(events.map(e => e.category.categoryName))];



    // Pagination
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    return (
        <div className="bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/20 min-h-screen font-sans antialiased pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-600">Discover Events</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 mb-4">
                        Upcoming Events
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Browse all the exciting events happening near you and book your tickets now.
                    </p>
                </motion.header>

                {/* Search & Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12 space-y-6"
                >
                    {/* Search Input */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search events by name or venue..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-14 pr-6 py-4 bg-white/80 backdrop-blur-xl border-2 border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base placeholder:text-gray-400"
                        />
                    </div>

                    {/* Category Filter Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setFilterCategory(cat);
                                    setCurrentPage(1);
                                }}
                                className={`
                                    px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105
                                    ${filterCategory === cat
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                    }
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Event Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage + searchQuery + filterCategory}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                    >
                        {currentEvents.length > 0 ? (
                            currentEvents.map((event) => (
                                <motion.div
                                    key={event._id}
                                    variants={cardVariants}
                                    whileHover={{ y: -8 }}
                                    className="group cursor-pointer rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100"
                                >
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={event.image}
                                            alt={event.event_title}
                                            width={1200}
                                            height={600}
                                            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                            {event.category.categoryName}
                                        </span>
                                        <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex flex-col items-center justify-center shadow-lg">
                                            <span className="text-xs font-bold text-blue-600">
                                                {new Date(event.event_date).toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
                                            </span>
                                            <span className="text-lg font-black text-gray-900">
                                                {new Date(event.event_date).getDate()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1 space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                            {event.event_title}
                                        </h3>

                                        <div className="flex items-center text-gray-600 text-sm gap-2">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            <span className="font-medium">
                                                {new Date(event.event_date).toLocaleDateString("en-US", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        <div className="flex items-center text-gray-600 text-sm gap-2">
                                            <MapPin className="w-4 h-4 text-blue-500" />
                                            <span className="font-medium line-clamp-1">{event.venue}</span>
                                        </div>

                                        <Link
                                            href={`/all-events/${event._id}`}
                                            className="mt-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all text-center"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-xl font-semibold text-gray-600">No events found</p>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-2"
                    >
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-xl bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded-xl font-bold transition-all shadow-md ${currentPage === i + 1
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-110"
                                        : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-xl bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
