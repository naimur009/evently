
import Link from 'next/link'; // Import Link from Next.js
import { Music, Mic, Film, Trophy } from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      name: "Music",
      desc: "Concerts and live shows.",
      color: "from-blue-400 to-indigo-500",
      icon: <Music className="w-8 h-8" />,
    },
    {
      name: "Sports",
      desc: "Games and tournaments.",
      color: "from-red-400 to-rose-500",
      icon: <Trophy className="w-8 h-8" />,
    },
    {
      name: "Comedy",
      desc: "Stand-up and shows.",
      color: "from-yellow-400 to-orange-500",
      icon: <Mic className="w-8 h-8" />,
    },
    {
      name: "Theater",
      desc: "Plays and musicals.",
      color: "from-green-400 to-emerald-500",
      icon: <Film className="w-8 h-8" />,
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-24 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Explore by Category
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover experiences tailored to your interests and passions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="/all-events" // Redirect to events page with category as query
              className="group relative rounded-2xl bg-white border border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-300/50"
            >
              <div className="p-8 flex flex-col items-center text-center relative z-10">
                <div
                  className={`mb-5 p-4 rounded-full bg-gradient-to-r ${cat.color} text-white shadow-md transition-transform duration-300 group-hover:scale-105`}
                >
                  {cat.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-600">{cat.desc}</p>
              </div>

              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 bg-gradient-to-r ${cat.color} blur-xl transition duration-500`}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
