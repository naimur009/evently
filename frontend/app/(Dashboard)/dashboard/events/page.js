"use client"
import React, { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, SortDesc, ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import Link from 'next/link';
import api from '@/app/libs/axios';

let events = []; // global variable in this file

// Fetch data globally
const fetchGlobalEvents = async () => {
  try {    
    const response = await api.get("/events");
    events = response.data.data
    return response.data.data; // update the global variable
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

// Immediately fetch events
fetchGlobalEvents();


const fetchEvents = (filters) => {
  return new Promise(resolve => {
    setTimeout(() => {
      let filteredEvents = events.filter(event => {
        if (filters.searchQuery && !event.event_title.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
        if (filters.statusFilter && filters.statusFilter !== 'All' && event.status !== filters.statusFilter) return false;
        return true;
      });

      if (filters.sortBy) {
        filteredEvents.sort((a, b) => {
          if (a[filters.sortBy] < b[filters.sortBy]) return filters.sortOrder === 'asc' ? -1 : 1;
          if (a[filters.sortBy] > b[filters.sortBy]) return filters.sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }

      resolve(filteredEvents);
    }, 500);
  });
};

const StatusPill = ({ status }) => {
  let color = '';
  switch (status) {
    case 'Active': color = 'bg-green-100 text-green-800'; break;
    case 'Completed': color = 'bg-gray-100 text-gray-800'; break;
    default: color = 'bg-red-100 text-red-800'; break;
  }
  return <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${color}`}>{status}</span>;
};

export default function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;


  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await fetchGlobalEvents();
      setEvents(res)
    }
    fetchData()
  }, [])

  useEffect(() => {
    setLoading(true);
    const filters = { searchQuery, statusFilter, sortBy, sortOrder };
    fetchEvents(filters).then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, [searchQuery, statusFilter, sortBy, sortOrder]);

  const handleSort = (column) => {
    if (sortBy === column) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortBy(column); setSortOrder('asc'); }
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const paginate = (pageNumber) => { if (pageNumber > 0 && pageNumber <= totalPages) setCurrentPage(pageNumber); };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">All Events</h1>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
          <div className="relative flex-grow min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="appearance-none w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Events Table for large screens */}
        <div className="hidden md:block overflow-x-auto shadow-sm rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['name', 'date', 'location', 'status'].map((col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  >
                    <div className="flex items-center">
                      {col === 'name' ? 'Event Name' : col.charAt(0).toUpperCase() + col.slice(1)}
                      {sortBy === col && (sortOrder === 'asc' ? <SortAsc size={16} className="ml-2" /> : <SortDesc size={16} className="ml-2" />)}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading events...</td></tr>
              ) : currentEvents.length > 0 ? (
                currentEvents.map(event => (
                  <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.event_title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span>
                        {new Date(event.event_date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).replace(" ", ", ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.venue}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusPill status={event.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-4">
                      <Link href={`/dashboard/events/${event._id}`}>
                        <Edit size={18} className="text-indigo-600 hover:text-indigo-900 cursor-pointer" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No events found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden grid gap-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading events...</div>
          ) : currentEvents.length > 0 ? (
            currentEvents.map(event => (
              <div key={event._id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-semibold text-gray-900">{event.event_name}</h2>
                  <StatusPill status={event.status} />
                </div>
                <p className="text-xs text-gray-500">{event.event_date}</p>
                <p className="text-xs text-gray-500 mb-2">{event.venue}</p>
                <div className="flex gap-4 justify-end">
                  <Link href={`/dashboard/events/${event._id}`}>
                    <Edit size={18} className="text-indigo-600 hover:text-indigo-900 cursor-pointer" />
                  </Link>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No events found.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <span className="text-sm text-gray-700">
            Showing {indexOfFirstEvent + 1} to {Math.min(indexOfLastEvent, events.length)} of {events.length} results
          </span>
          <div className="flex rounded-lg shadow-sm">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 text-sm font-medium rounded-l-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-2 border-t border-b border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors ${currentPage === i + 1 ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-gray-700'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 text-sm font-medium rounded-r-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
