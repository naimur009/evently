"use client";

import Link from 'next/link';
import { Music, Mic, Film, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const CategorySection = () => {
  const categories = [
    {
      name: "Music",
      desc: "Concerts and live shows.",
      color: "bg-blue-100 text-blue-600",
      hoverColor: "group-hover:bg-blue-600 group-hover:text-white",
      icon: <Music className="w-8 h-8" />,
    },
    {
      name: "Sports",
      desc: "Games and tournaments.",
      color: "bg-red-100 text-red-600",
      hoverColor: "group-hover:bg-red-600 group-hover:text-white",
      icon: <Trophy className="w-8 h-8" />,
    },
    {
      name: "Comedy",
      desc: "Stand-up and shows.",
      color: "bg-yellow-100 text-yellow-600",
      hoverColor: "group-hover:bg-yellow-600 group-hover:text-white",
      icon: <Mic className="w-8 h-8" />,
    },
    {
      name: "Theater",
      desc: "Plays and musicals.",
      color: "bg-green-100 text-green-600",
      hoverColor: "group-hover:bg-green-600 group-hover:text-white",
      icon: <Film className="w-8 h-8" />,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative py-24 px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover experiences tailored to your interests and passions.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={item}>
              <Link
                href="/all-events"
                className="group relative flex flex-col items-center p-8 rounded-3xl bg-gray-50 border border-transparent hover:border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`mb-6 p-5 rounded-2xl ${cat.color} ${cat.hoverColor} transition-colors duration-300 shadow-sm`}
                >
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {cat.name}
                </h3>
                <p className="text-sm text-center text-gray-500">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySection;
