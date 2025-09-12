"use client";
import React, { useState, useEffect } from "react";
import { Home, BarChart2, LogOut, Menu, ArrowLeftToLine, CalendarDays, BadgePlus, User } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Sidebar = () => {
  const [active, setActive] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  // ✅ Auto-collapse for small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true); // collapsed on mobile/tablet
      } else {
        setCollapsed(false); // open on large screens
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Home Page", icon: <Home size={20} />, link: "/" },
    { name: "Overview", icon: <BarChart2 size={20} />, link: "/dashboard" },
    { name: "All Events", icon: <CalendarDays size={20}/>, link: "/dashboard/events" },
    { name: "Cretate New Event", icon: <BadgePlus size={20}/>, link: "/dashboard/create-event" },
    { name: "Users", icon: <User size={20} />, link: "/dashboard/users/" },
    { name: "Logout", icon: <LogOut size={20} />, link: "/dashboard/logout" },
  ];

  return (
    <div>
      <motion.nav
        initial={{ width: 350 }}
        animate={{ width: collapsed ? 80 : 350 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="h-screen bg-white text-gray-700 flex flex-col shadow-lg border-r border-gray-200 rounded-r-xl overflow-hidden select-none"
        role="navigation"
        aria-label="Admin sidebar"
      >
        {/* Header: Logo / Title and Toggle button */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          {!collapsed && (
            <h1 className="text-2xl font-bold tracking-wide text-indigo-600">
              Admin Panel
            </h1>
          )}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="button"
          >{
            collapsed ? <Menu size={24} /> : <ArrowLeftToLine size = {24}/>
          }
            
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 mt-4 flex flex-col gap-1 px-2">
          {menuItems.map(({ name, icon, link }) => {
            const isActive = active === name;
            return (
              <motion.div key={name} whileHover={{ scale: 1.05 }}>
                <Link
                  href={link}
                  onClick={() => setActive(name)}
                  className={`flex items-center gap-4 rounded-r-xl px-4 py-3 w-full text-left transition-colors
                    ${isActive
                      ? "bg-indigo-100 text-indigo-700 font-semibold shadow-inner"
                      : "hover:bg-gray-50 text-gray-700"
                    }
                    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {icon}
                  {!collapsed && <span className="whitespace-nowrap">{name}</span>}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
};

export default Sidebar;
