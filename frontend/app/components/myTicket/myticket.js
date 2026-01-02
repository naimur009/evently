"use client";

import React, { useState } from "react";
import {
  Download,
  MapPin,
  CalendarDays,
  Ticket as TicketIcon,
  Loader2,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const MyTicketsPage = ({ tickets = [] }) => {
  const [downloadingTicketId, setDownloadingTicketId] = useState(null);

  const handleDownloadTicket = (ticketId) => {
    setDownloadingTicketId(ticketId);
    // Simulate generation
    setTimeout(() => {
      setDownloadingTicketId(null);
    }, 2000);
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-900 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-purple-100/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Modern Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Verified Assets</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] text-gray-900"
            >
              My<br /><span className="text-blue-600">Vault</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 font-medium max-w-sm leading-relaxed"
            >
              Securely managing your digital access tokens for the world&apos;s most exclusive experiences.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50"
          >
            <div className="text-right pr-6 border-r border-gray-100">
              <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-1">Active</p>
              <p className="text-3xl font-black text-gray-900 leading-none">{tickets.length}</p>
            </div>
            <div className="pl-2 flex items-center">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <TicketIcon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </header>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {tickets.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full py-24 text-center border-2 border-dashed border-gray-100 rounded-[3rem] bg-white/50"
              >
                <TicketIcon className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-gray-900 mb-2">The Vault is Empty</h3>
                <p className="text-gray-500 font-medium mb-8">You haven&apos;t secured any access tokens yet.</p>
                <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl shadow-gray-200">
                  Explore Experiences
                </button>
              </motion.div>
            ) : (
              tickets.map((ticket, index) => (
                <TicketItem
                  key={ticket._id}
                  ticket={ticket}
                  index={index}
                  isDownloading={downloadingTicketId === ticket._id}
                  onDownload={() => handleDownloadTicket(ticket._id)}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const TicketItem = ({ ticket, index, isDownloading, onDownload }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500"
    >
      {/* Top Image Section */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={ticket.eventDetails.image}
          alt={ticket.eventDetails.event_title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Verification Badge */}
        <div className="absolute top-6 left-6 px-4 py-1.5 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-500/40 border border-white/20 scale-90 origin-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">Verified NFT Receipt</span>
          </div>
        </div>
      </div>

      {/* Perforation Effect Divider */}
      <div className="relative h-8 w-full flex items-center px-4 -mt-4 z-20">
        <div className="absolute left-0 -ml-4 w-8 h-8 rounded-full bg-[#fafbfc] border-r border-gray-100/50 shadow-inner" />
        <div className="w-full h-[2px] border-t-2 border-dashed border-gray-100 mx-2" />
        <div className="absolute right-0 -mr-4 w-8 h-8 rounded-full bg-[#fafbfc] border-l border-gray-100/50 shadow-inner" />
      </div>

      {/* Content Section */}
      <div className="p-8 pt-4 space-y-8 flex-grow">
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-3xl font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
              {ticket.eventDetails.event_title}
            </h3>
            <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition-colors duration-300">
              <TicketIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 font-bold text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <CalendarDays className="w-4 h-4" />
              </div>
              <span>
                {new Date(ticket.eventDetails.event_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="truncate max-w-[120px]">{ticket.eventDetails.city}</span>
            </div>
          </div>
        </div>

        {/* Technical Data Bar */}
        <div className="bg-gray-50/50 rounded-2xl p-4 grid grid-cols-2 gap-4 border border-gray-100/50">
          <div className="space-y-1">
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 block">Access Key</span>
            <p className="text-[10px] font-black text-gray-900 truncate uppercase">#{ticket.ticket_id?.slice(-12).toUpperCase()}</p>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 block">Tier</span>
            <p className="text-[10px] font-black text-blue-600 uppercase">Premium General</p>
          </div>
        </div>

        {/* Interactive Footer */}
        <div className="flex items-center gap-3">
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className={`flex-1 flex items-center justify-center gap-2 py-4.5 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${isDownloading
                ? "bg-blue-50 text-blue-600"
                : "bg-gray-900 text-white hover:bg-black hover:shadow-xl hover:shadow-gray-200"
              }`}
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
            )}
            {isDownloading ? "Synthesizing..." : "Download Pass"}
          </button>
          <button className="w-14 h-14 flex items-center justify-center rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all duration-300 group/btn">
            <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          </button>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="bg-gray-50/50 px-8 py-3 flex items-center justify-center gap-2 border-t border-gray-50/50">
        <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Verified Blockchain Entry</span>
      </div>
    </motion.div>
  );
};

export default MyTicketsPage;
