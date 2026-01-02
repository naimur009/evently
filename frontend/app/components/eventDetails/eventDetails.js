'use client';

import {
  MapPin,
  CalendarDays,
  User,
  Building2,
  Users,
  Tag,
  Trophy
} from 'lucide-react';
import TicketPurchaseSection from '../purchase/purchaseSection';
import { motion } from 'framer-motion';
import Image from 'next/image';

const EventDetails = ({ event }) => {
  const ticketData = {
    event_id: event._id,
    availableTickets: event.ticket_limit - event.ticket_sold,
    totalTickets: event.ticket_limit,
    price: event.price,
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-gray-900 pb-20">

      {/* Premium Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          {event.image && (
            <Image
              src={event.image}
              alt={event.event_title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl space-y-4"
          >
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                {event.category?.categoryName || "Event"}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter shadow-sm">
              {event.event_title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90 pt-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-bold">
                  {new Date(event.event_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold">{event.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold">
                  {ticketData.availableTickets > 0 ? `${ticketData.availableTickets} Tickets Left` : "Sold Out"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Description & Metadata */}
          <div className="lg:col-span-8 space-y-12">

            {/* Description Card */}
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full" />
                <h2 className="text-3xl font-black tracking-tight text-gray-900">About Event</h2>
              </div>
              <p className="text-lg leading-relaxed text-gray-600 font-medium">
                {event.description}
              </p>
            </motion.section>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MetadataTile
                label="Organizer"
                value={event.organizer}
                icon={<User className="text-blue-600" />}
              />
              <MetadataTile
                label="Venue"
                value={event.venue}
                icon={<Building2 className="text-purple-600" />}
              />
              <MetadataTile
                label="Total Capacity"
                value={`${event.ticket_limit} Tickets`}
                icon={<Tag className="text-yellow-600" />}
              />
              <MetadataTile
                label="Tickets Sold"
                value={`${event.ticket_sold || 0} Tickets`}
                icon={<Users className="text-pink-600" />}
              />
            </div>

          </div>

          {/* Right Column: Checkout */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <TicketPurchaseSection event={ticketData} />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

const MetadataTile = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all group">
    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{label}</p>
      <p className="text-sm font-black text-gray-900">{value || "N/A"}</p>
    </div>
  </div>
);

export default EventDetails;
