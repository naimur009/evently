'use client';

import { MapPin, CalendarDays, User, Clock, Building2, Sparkles, Users, Tag } from 'lucide-react';
import TicketPurchaseSection from '../purchase/purchaseSection';
import { motion } from 'framer-motion';

const EventDetails = ({ event }) => {
  const ticketData = {
    event_id: event._id,
    availableTickets: event.ticket_limit - event.ticket_sold,
    totalTickets: event.ticket_limit,
    price: event.price,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 min-h-screen font-sans antialiased">
      {/* Hero Section */}
      <div
        className="relative h-[50vh] md:h-[65vh] flex items-center justify-center text-center px-4 sm:px-6 -mt-16 overflow-hidden"
        style={{
          backgroundImage: `url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-indigo-900/30" />

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto space-y-6 pt-16"
        >
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-semibold"
          >
            <Tag className="w-4 h-4" />
            {event.category?.categoryName || "Special Event"}
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white drop-shadow-2xl leading-tight tracking-tight">
            {event.event_title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed">
            {event.tagline || "An unforgettable experience awaits you"}
          </p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4"
          >
            <div className="flex items-center gap-2 text-white/90">
              <CalendarDays className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {new Date(event.event_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-semibold">{event.city}</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Users className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {event.ticket_limit - event.ticket_sold} tickets left
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-20 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Main Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  About the Event
                </h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                {event.description}
              </p>
            </div>

            {/* Event Details Grid */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></span>
                Event Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoCard
                  icon={<User className="w-6 h-6" />}
                  label="Organizer"
                  value={event?.organizer}
                  gradient="from-blue-500 to-cyan-500"
                />

                <InfoCard
                  icon={<CalendarDays className="w-6 h-6" />}
                  label="Date & Time"
                  value={
                    <>
                      {new Date(event.event_date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      <br />
                      <span className="text-sm text-gray-600">{event.time || "10:00 PM"}</span>
                    </>
                  }
                  gradient="from-indigo-500 to-purple-500"
                />

                <InfoCard
                  icon={<Clock className="w-6 h-6" />}
                  label="Ticket Deadline"
                  value={
                    event.deadline
                      ? new Date(event.deadline).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      : "Not specified"
                  }
                  gradient="from-purple-500 to-pink-500"
                />

                <InfoCard
                  icon={<MapPin className="w-6 h-6" />}
                  label="City"
                  value={event.city}
                  gradient="from-pink-500 to-rose-500"
                />

                <InfoCard
                  icon={<Building2 className="w-6 h-6" />}
                  label="Venue"
                  value={event.venue}
                  gradient="from-orange-500 to-amber-500"
                  className="sm:col-span-2"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Ticket Purchase */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="sticky top-24">
              <TicketPurchaseSection event={ticketData} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, gradient, className = "" }) => (
  <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-[2px] hover:scale-105 transition-transform duration-300 ${className}`}>
    <div className="bg-white rounded-2xl p-5 h-full">
      <div className="flex items-start gap-4">
        <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
            {value}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default EventDetails;
