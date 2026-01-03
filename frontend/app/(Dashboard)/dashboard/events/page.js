"use client";
import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  ChevronLeft,
  ChevronRight,
  Eye,
  CalendarDays,
  MapPin,
  MoreVertical,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Plus,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import api from '@/app/libs/axios';
import { motion, AnimatePresence } from 'framer-motion';

const fetchGlobalEvents = async () => {
  try {
    const response = await api.get("/events");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

const StatusPill = ({ status }) => {
  let style = '';
  switch (status) {
    case 'Active': style = 'bg-emerald-50 text-emerald-600 border-emerald-100'; break;
    case 'Completed': style = 'bg-gray-50 text-gray-500 border-gray-100'; break;
    default: style = 'bg-rose-50 text-rose-600 border-rose-100'; break;
  }
  return (
    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-full ${style}`}>
      {status}
    </span>
  );
};

export default function EventsManagement() {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  useEffect(() => {
    const loadInitialData = async () => {
      const data = await fetchGlobalEvents();
      setAllEvents(data);
      setLoading(false);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    let result = [...allEvents];

    // Search
    if (searchQuery) {
      result = result.filter(e =>
        e.event_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status Filter
    if (statusFilter !== 'All') {
      result = result.filter(e => e.status === statusFilter);
    }

    // Sorting
    result.sort((a, b) => {
      let valA = a[sortBy === 'date' ? 'event_date' : sortBy === 'name' ? 'event_title' : sortBy] || '';
      let valB = b[sortBy === 'date' ? 'event_date' : sortBy === 'name' ? 'event_title' : sortBy] || '';

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredEvents(result);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortBy, sortOrder, allEvents]);

  const handleSort = (column) => {
    if (sortBy === column) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortBy(column); setSortOrder('asc'); }
  };

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Events Management</h1>
          <p className="text-gray-500 font-medium">Manage and track all events from your organization.</p>
        </div>
        <Link
          href="/dashboard/create-event"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
        >
          <Plus size={20} />
          New Event
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input
            type="text"
            placeholder="Search events by title or venue..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <select
              className="w-full pl-12 pr-10 py-3 bg-gray-50/50 border-none rounded-2xl text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-100"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 group cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Event Details
                    {sortBy === 'name' && (sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                  </div>
                </th>
                <th className="px-8 py-5 group cursor-pointer" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Date & Time
                    {sortBy === 'date' && (sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                  </div>
                </th>
                <th className="px-8 py-5">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Venue</div>
                </th>
                <th className="px-8 py-5">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</div>
                </th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="5" className="px-8 py-6 bg-gray-50/30"></td>
                  </tr>
                ))
              ) : currentEvents.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {currentEvents.map((event, idx) => (
                    <motion.tr
                      key={event._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group hover:bg-gray-50/50 transition-all cursor-default"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:scale-110 transition-transform">
                            <CalendarDays className="text-indigo-600" size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-900 leading-tight mb-1">{event.event_title}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{event.category?.categoryName || "General"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                          {new Date(event.event_date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 mt-1">
                          <Clock size={12} /> {event.time}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                          <MapPin size={16} className="text-gray-300" />
                          {event.venue}
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 ml-6">{event.city}</p>
                      </td>
                      <td className="px-8 py-6">
                        <StatusPill status={event.status} />
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end items-center gap-3">
                          <Link
                            href={`/dashboard/events/${event._id}`}
                            className="p-2.5 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 transition-all shadow-sm"
                            title="View Analytics"
                          >
                            <Eye size={18} />
                          </Link>
                          <button className="p-2.5 rounded-xl text-gray-300 hover:text-gray-600 transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Search className="text-gray-200" size={40} />
                      <p className="text-gray-400 font-medium">No events found matching your current filters.</p>
                      <button onClick={() => { setSearchQuery(''); setStatusFilter('All'); }} className="text-xs font-black uppercase text-indigo-600 tracking-widest hover:underline">Clear all filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50/30 px-8 py-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing {(currentPage - 1) * eventsPerPage + 1} to {Math.min(currentPage * eventsPerPage, filteredEvents.length)} of {filteredEvents.length} Events
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-xs font-black transition-all border shadow-sm
                                    ${currentPage === i + 1
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-indigo-100"
                    : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
