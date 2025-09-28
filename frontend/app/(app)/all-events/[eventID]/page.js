"use client"
import EventDetails from "@/app/components/eventDetails/eventDetails";
import api from "@/app/libs/axios";
import { useEffect, useState } from "react";

const EventPage = ({ params }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Event-Details";
    
    const fetchEvent = async () => {
      try {
        const { eventID } = await params;
        const res = await api.get(`/events/${eventID}`);
        setEvent(res?.data?.data?.[0] || null);
      } catch (error) {
        console.error("Failed to fetch event:", error);
        setError("Event not found.");
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
