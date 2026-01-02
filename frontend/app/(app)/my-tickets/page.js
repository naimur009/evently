"use client";

import { useEffect, useState } from 'react';
import MyTicketsPage from '../../components/myTicket/myticket';
import api from '@/app/libs/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Ticket as TicketIcon } from 'lucide-react';

const Page = () => {
  const [tickets, setTickets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "My Tickets | Evently";

    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await api.get("/myticket");

        if (res.data.status === "success") {
          setTickets(res.data.data || []);
        } else if (res.data.status === "failed") {
          setTickets([]);
        } else {
          setError("Failed to fetch tickets.");
        }
      } catch (err) {
        console.error("Fetch tickets error:", err);
        setError(err.response?.data?.message || "An error occurred while loading your tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="p-3 bg-blue-50 rounded-2xl text-blue-600"
        >
          <Loader2 className="w-10 h-10" />
        </motion.div>
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Authenticating your access...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mb-6">
          <TicketIcon className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Connection Issue</h2>
        <p className="text-gray-500 max-w-xs">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-xl hover:bg-black transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="tickets-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MyTicketsPage tickets={tickets} />
      </motion.div>
    </AnimatePresence>
  );
};

export default Page;