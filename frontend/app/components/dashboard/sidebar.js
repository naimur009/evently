"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Home,
  BarChart2,
  LogOut,
  Menu,
  ChevronLeft,
  CalendarDays,
  PlusCircle,
  Users,
  Settings,
  Bell,
  Search,
  LayoutDashboard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState({ name: "Admin User", email: "admin@evently.com", role: "admin", avatar: "" });

  // Auto-collapse for smaller screens & Fetch user info
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (typeof window !== "undefined") {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (storedUser.name || storedUser.email) {
          setUser(prev => ({ ...prev, ...storedUser }));
        }
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = useMemo(() => [
    {
      section: "Main", items: [
        { name: "Overview", icon: <LayoutDashboard size={20} />, link: "/dashboard" },
        { name: "All Events", icon: <CalendarDays size={20} />, link: "/dashboard/events" },
        { name: "Create Event", icon: <PlusCircle size={20} />, link: "/dashboard/create-event" },
      ]
    },
    {
      section: "Management", items: [
        ...(user.role === "admin" ? [{ name: "Users", icon: <Users size={20} />, link: "/dashboard/users/" }] : []),
      ]
    },
    {
      section: "System", items: [
        { name: "Return Home", icon: <Home size={20} />, link: "/" },
        { name: "Logout", icon: <LogOut size={20} />, link: "/dashboard/logout", color: "text-red-500 hover:text-red-600" },
      ]
    }
  ], [user.role]);

  useEffect(() => {
    for (const section of menuItems) {
      const currentItem = section.items.find(item => item.link === pathname);
      if (currentItem) {
        setActive(currentItem.name);
        break;
      }
    }
  }, [pathname, menuItems]);

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 88 }
  };

  return (
    <motion.nav
      initial="expanded"
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="relative h-[100dvh] bg-white border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 transition-all duration-300"
    >
      {/* Header */}
      <div className={`flex items-center h-20 border-b border-gray-50 transition-all duration-300 ${collapsed ? "justify-center px-2 gap-2" : "justify-between px-6"}`}>
        <div className={`flex items-center gap-2.5 overflow-hidden ${collapsed ? "" : "flex-1"}`}>
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.h1
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight whitespace-nowrap"
              >
                Evently
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 rounded-xl transition-all duration-200 flex-shrink-0 ${collapsed ? "bg-gray-50 text-gray-900 shadow-sm" : "hover:bg-gray-50 text-gray-400"
            }`}
        >
          {collapsed ? <Menu size={18} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 custom-scrollbar">
        {menuItems.map((section, idx) => (
          <div key={section.section} className={`${idx !== 0 ? "mt-8" : ""}`}>
            {!collapsed && (
              <p className="px-8 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-4">
                {section.section}
              </p>
            )}
            <div className="px-3 space-y-1">
              {section.items.map((item) => {
                const isActive = active === item.name;
                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    onClick={() => setActive(item.name)}
                    className="block"
                  >
                    <div
                      className={`group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                        ${isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                          : item.color || "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                      <div className={`${!isActive && "group-hover:scale-110 transition-transform duration-200"}`}>
                        {item.icon}
                      </div>

                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-sm font-medium whitespace-nowrap"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Active Indicator (Dot) */}
                      {isActive && !collapsed && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute right-4 w-1.5 h-1.5 rounded-full bg-indigo-200"
                        />
                      )}

                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-[100]">
                          {item.name}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Section / Footer */}
      <div className="mt-auto p-4 border-t border-gray-50 bg-gray-50/30">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : "px-2"} py-2`}>
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <Image src={user.avatar} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                ) : (
                  <span className="text-sm font-bold text-indigo-600">
                    {user.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-gray-500 uppercase tracking-tight font-medium">
                  {user.role}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e1e1e1;
        }
      `}</style>
    </motion.nav>
  );
};

export default Sidebar;
