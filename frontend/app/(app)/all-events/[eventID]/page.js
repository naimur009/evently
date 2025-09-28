"use client"
import EventDetails from "@/app/components/eventDetails/eventDetails";
import api from "@/app/libs/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Tell Vercel this is a dynamic route
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

const EventPage = ({ params }) => {
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Event-Details";
    
    const fetchEvent = async () => {
      try {
        const { eventID } = await params;
        console.log('Fetching event with ID:', eventID);
        
        if (!eventID) {
          setError("Invalid event ID");
          setLoading(false);
          return;
        }
        
        const res = await api.get(`/events/${eventID}`);
        console.log('Event API response:', res.data);
        
        const eventData = res?.data?.data?.[0] || null;
        if (!eventData) {
          setError("Event not found in response");
        } else {
          setEvent(eventData);
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
        
        // If it's a network error and we're in production, show a better message
        if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
          setError("Unable to connect to server. Please try again later.");
        } else {
          setError(error.response?.data?.message || "Failed to load event details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-10">
        Loading event details...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center text-gray-600 mt-10">
        {error || "Event not found."}
      </div>
    );
  }

  return (
    <div>
      <EventDetails event={event} />
    </div>
  );
};

export default EventPage;
