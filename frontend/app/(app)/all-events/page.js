"use client"
import EventsPage from '@/app/components/allEvents/allEvents';
import api from '@/app/libs/axios';
import { useEffect, useState } from 'react';

const Page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "All-Events";
    
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events/");
        setEvents(res.data.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div>
      <EventsPage events={events} />
    </div>
  );
};

export default Page;