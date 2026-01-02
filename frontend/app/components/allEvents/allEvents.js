"use client"
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Search, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

// Variants for Animations
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
        return <p className="text-center text-gray-500 mt-20 text-xl font-light">Loading spectacular events...</p>;
    }


    const eventsPerPage = 6;
    const categories = ["All", ...new Set(events.map(e => e.category.categoryName))];

    // Pagination
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased pt-24 pb-16 relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100 blur-[120px] rounded-full pointer-events-none -z-10 opacity-60" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6 max-w-fit mx-auto backdrop-blur-md shadow-sm">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-700">Discover Experiences</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 mb-6 drop-shadow-sm">
                        Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Events</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Explore the thrill of live entertainment. Book your tickets for concerts, matches, and festivals today.
                    </p>
                </motion.header>

                {/* Search & Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-14 space-y-8"
                >
                    {/* Search Input */}
                    <div className="relative max-w-2xl mx-auto group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search events by name or venue..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-200/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-base text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
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
                                    px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                                    ${filterCategory === cat
                                        ? "bg-gray-900 text-white border-gray-900 shadow-md transform scale-105"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300"
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
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                    >
                        {currentEvents.length > 0 ? (
                            currentEvents.map((event) => (
                                <motion.div
                                    key={event._id}
                                    variants={cardVariants}
                                    whileHover={{ y: -8 }}
                                    className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col relative"
                                >
                                    {/* Image Section */}
                                    <div className="relative overflow-hidden aspect-[4/3]">
                                        <Image
                                            src={event.image}
                                            alt={event.event_title}
                                            width={1200}
                                            height={600}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                        {/* Category Badge */}
                                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                            {event.category.categoryName}
                                        </span>

                                        {/* Date Badge */}
                                        <div className="absolute top-4 right-4 w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                                                {new Date(event.event_date).toLocaleDateString("en-US", { month: "short" })}
                                            </span>
                                            <span className="text-xl font-black text-gray-900 leading-none mt-0.5">
                                                {new Date(event.event_date).getDate()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6 flex flex-col flex-1 space-y-4 relative z-10">
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                                            {event.event_title}
                                        </h3>

                                        <div className="flex items-center text-gray-600 text-sm gap-2.5">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            <span className="font-medium tracking-wide">
                                                {new Date(event.event_date).toLocaleDateString("en-US", {
                                                    weekday: "long",
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        <div className="flex items-center text-gray-600 text-sm gap-2.5">
                                            <MapPin className="w-4 h-4 text-blue-500" />
                                            <span className="font-medium line-clamp-1">{event.venue}</span>
                                        </div>

                                        <div className="pt-4 mt-auto">
                                            <Link
                                                href={`/all-events/${event._id}`}
                                                className="block w-full py-3.5 bg-gray-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-gray-900 hover:text-white font-bold rounded-xl border border-gray-100 hover:border-transparent transition-all text-center tracking-wide group-hover:shadow-lg group-hover:shadow-blue-500/30"
                                            >
                                                Book Tickets
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
                                    <Search className="w-10 h-10 text-gray-400" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-2">No events found</p>
                                <p className="text-gray-500">Try adjusting your search filters to find what you're looking for.</p>
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
                        className="flex items-center justify-center gap-3"
                    >
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-3 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-xl font-bold transition-all border ${currentPage === i + 1
                                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-110"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
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
