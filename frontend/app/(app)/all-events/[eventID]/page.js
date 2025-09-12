import EventDetails from "@/app/components/eventDetails/eventDetails";
import api from "@/app/libs/axios";

export const metadata = {
  title: "Event-Details",
};

const EventPage = async ({ params }) => {
  const { eventID } = await params;

  let event = null;

  try {
    const res = await api.get(`/events/${eventID}`); // Use baseURL from axios instance
    event = res?.data?.data?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch event:", error);
  }

  if (!event) {
    return (
      <div className="text-center text-gray-600 mt-10">
        Event not found.
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
