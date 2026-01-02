"use client";
import api from "@/app/libs/axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight, RefreshCw, WifiOff, AlertCircle } from "lucide-react";

const FeaturedEventsListSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/events");
      const eventsData = response.data.data;
      if (Array.isArray(eventsData) && eventsData.length > 0) {
        setEvents(eventsData.slice(0, 8));
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex justify-center items-center bg-gray-50 min-h-[400px]">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600">
            <div className="h-8 w-8 rounded-full bg-blue-100/50"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || events.length === 0) {
    return (
      <section className="py-24 px-6 lg:px-8 bg-gray-50 flex justify-center items-center min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
        >
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${error ? "bg-red-50" : "bg-blue-50"}`}>
            {error ? (
              <WifiOff className="w-10 h-10 text-red-500" />
            ) : (
              <AlertCircle className="w-10 h-10 text-blue-500" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {error ? "Connection Issue" : "No Events Found"}
          </h3>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {error
              ? "We couldn't connect to the server. Please check your internet connection and try again."
              : "It looks like there are no upcoming events at the moment. Check back soon for updates!"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchEvents}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          >
            <RefreshCw className="w-5 h-5" />
            Retry
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4 flex items-center gap-3">
              Featured Events
            </h2>
            <p className="text-lg text-gray-600">
              Discover the hottest concerts, sports games, and festivals near you.
            </p>
          </div>
          <Link
            href="/all-events"
            className="group flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            View All Events
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/all-events/${event._id}`}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image || "https://placehold.co/600x400"}
                      alt={event.event_title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    {event.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gray-900 shadow-sm">
                        {event.category.categoryName}
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-4">
                      {event.event_title}
                    </h3>

                    <div className="mt-auto space-y-3">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                        <span suppressHydrationWarning>
                          {new Date(event.event_date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsListSection;
