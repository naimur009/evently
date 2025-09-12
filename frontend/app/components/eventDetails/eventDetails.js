import { MapPin, CalendarDays, User, Clock, Building2 } from 'lucide-react';
import TicketPurchaseSection from '../purchase/purchaseSection';

const App = ({ event }) => {
  const ticketData = {
    event_id: event._id,
    availableTickets: event.ticket_limit - event.ticket_sold,
    totalTickets: event.ticket_limit,
    price: event.price,
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-800">
      {/* Hero Section */}
      <div
        className="relative h-[45vh] md:h-[60vh] flex items-center justify-center text-center px-4 sm:px-6"
        style={{
          backgroundImage: `url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
            {event.event_title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-lg mx-auto">
            {event.tagline || "An unforgettable experience awaits"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-12 sm:-mt-16 z-20 max-w-6xl mx-auto px-3 sm:px-6 lg:px-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-5 sm:p-8 lg:p-10">
          
          {/* Event Info Section */}
          <section className="flex flex-col space-y-8">
            
            {/* About */}
            <article>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-6 sm:w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
                About the Event
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-700">
                {event.description}
              </p>
            </article>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              
              {/* Organizer */}
              <InfoBlock
                icon={<User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
                label="Organizer"
                value={event?.organizer}
              />

              {/* Date & Time */}
              <InfoBlock
                icon={<CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
                label="Date & Time"
                value={
                  <>
                    {new Date(event.event_date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                    <br />
                    {event.time || "10 PM"}
                  </>
                }
              />

              {/* Ticket Deadline */}
              <InfoBlock
                icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
                label="Ticket Deadline"
                value={
                  event.deadline
                    ? new Date(event.deadline).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Not specified"
                }
              />

              {/* City */}
              <InfoBlock
                icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
                label="City"
                value={event.city}
              />

              {/* Location */}
              <InfoBlock
                icon={<Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
                label="Location"
                value={event.venue}
              />
            </div>
          </section>
        </div>

        {/* Ticket Section */}
        <div className="mt-8 sm:mt-12">
          <TicketPurchaseSection event={ticketData} />
        </div>
      </div>
    </div>
  );
};

const InfoBlock = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="bg-blue-100 p-2 rounded-xl">{icon}</div>
    <div>
      <p className="text-xs sm:text-sm font-semibold text-gray-900">{label}</p>
      <p className="text-sm sm:text-base text-gray-700">{value}</p>
    </div>
  </div>
);

export default App;
