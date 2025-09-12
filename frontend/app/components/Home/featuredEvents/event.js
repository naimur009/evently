import api from "@/app/libs/axios";
import Link from "next/link";


// api call for fetching data
const getEvents = async ()=> {
  try {
    const response = await api.get("/events");
    const events = response.data.data;
    return events.slice(0, 9);
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

const FeaturedEventsListSection = async () => {

  const events = await getEvents();

  if (!events || !Array.isArray(events) || events.length === 0) {
    return <p className="text-center text-gray-600 mt-10">Loading events...</p>;
  }


  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-gray-100 py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Featured Events
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-14">
          Discover the hottest concerts, sports games, and festivals near you.
        </p>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {events.map(event => (
            <Link
              key={event._id}
              href={`/all-events/${event._id}`}
              className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative">
                <img
                  src={event.image || `https://placehold.co/1200x600/60a5fa/ffffff?text=${event.event_title.split(" ").join("+")}`}
                  alt={event.event_title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-white/80 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {event.category.categoryName}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {event.event_title}
                </h3>
                <div className="flex items-center text-gray-600 text-sm mt-3">
                  {/* Date Icon Replacement: You can add an SVG inline or remove */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10m-7 4h4m-7 4h10a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {new Date(event.event_date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).replace(" ", ", ")}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  {/* Location Icon Replacement */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10c-1.104 0-2 .896-2 2 0 .963.678 2.12 2 3.492 1.321-1.372 2-2.529 2-3.492 0-1.104-.896-2-2-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21c5-4.5 6-8 6-10a6 6 0 10-12 0c0 2 1 5.5 6 10z"
                    />
                  </svg>
                  <span>{event.venue}</span>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/40 transition-all duration-500"></div>
            </Link>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="text-center">
          <Link
            href="/all-events"
            className="px-6 py-3 rounded-full bg-gray-200 border border-gray-300 text-gray-800 font-medium text-sm hover:bg-gray-300 hover:border-gray-400 transition-all duration-300"
          >
            View All Upcoming Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsListSection;
