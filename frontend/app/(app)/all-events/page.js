import EventsPage from '@/app/components/allEvents/allEvents';
import api from '@/app/libs/axios';

export const metadata = {
  title: "All-Events",
};

const page = async () => {
  try {
    const res = await api.get("/events/");
    const events = res.data;
    
    return (
      <div>
        <EventsPage events={events.data} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    return <div>Failed to load events.</div>;
  }
};

export default page;