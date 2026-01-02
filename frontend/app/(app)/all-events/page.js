"use client"
import EventsPage from '@/app/components/allEvents/allEvents';
import api from '@/app/libs/axios';
import { useEffect, useState } from 'react';

const Page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/events/");
      const eventsData = res.data.data;
      if (Array.isArray(eventsData) && eventsData.length > 0) {
        setEvents(eventsData);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "All-Events";
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600">
            <div className="h-10 w-10 rounded-full bg-blue-100/50"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || (events.length === 0 && !loading)) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
        <div
          className="text-center max-w-lg w-full bg-white p-12 rounded-3xl shadow-xl border border-gray-100"
        >
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${error ? "bg-red-50" : "bg-blue-50"}`}>
            {error ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M12 20h.01" /><path d="M8.5 16.429a5 5 0 0 1 7 0" /><path d="M5 12.859a10 10 0 0 1 14 0" /><path d="M2 8.571a15 15 0 0 1 20 0" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="m9 16 2 2 4-4" /></svg>
            )}
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">
            {error ? "Connection Issue" : "No Events Found"}
          </h3>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed">
            {error
              ? "We couldn't connect to the server to load the events. Please check your internet connection and try again."
              : "We couldn't find any upcoming events at the moment. Please check back later for updates!"}
          </p>
          <button
            onClick={fetchEvents}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>
            {error ? "Retry Connection" : "Refresh Events"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EventsPage events={events} />
    </div>
  );
};

export default Page;