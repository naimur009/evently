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
  LayoutDashboard,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState({ name: "Admin User", email: "admin@evently.com", role: "admin", avatar: "" });

  // Handle Resize & User Data
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
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
    { name: "Overview", icon: LayoutDashboard, link: "/dashboard", section: "main" },
    { name: "Events", icon: CalendarDays, link: "/dashboard/events", section: "main" },
    { name: "Create", icon: PlusCircle, link: "/dashboard/create-event", section: "main" },
    ...(user.role === "admin" ? [{ name: "Users", icon: Users, link: "/dashboard/users/", section: "main" }] : []),
    { name: "Home", icon: Home, link: "/", section: "system" },
    { name: "Logout", icon: LogOut, link: "/dashboard/logout", section: "system", danger: true },
  ], [user.role]);

  useEffect(() => {
    const currentItem = menuItems.find(item => item.link === pathname);
    if (currentItem) {
      setActive(currentItem.name);
    }
  }, [pathname, menuItems]);

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <nav className={`hidden lg:flex flex-col h-screen bg-white border-r border-gray-100 sticky top-0 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo & Collapse Button */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <h1 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Evently
            </h1>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-200 mx-auto">
            <span className="text-white font-bold text-xl">E</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all ${collapsed ? 'hidden' : ''}`}
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          {menuItems.filter(item => item.section === "main").map((item) => {
            const isActive = active === item.name;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setActive(item.name)}
                className="block"
                title={collapsed ? item.name : ""}
              >
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                    ${isActive
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } ${collapsed ? 'justify-center' : ''}`}
                >
                  <Icon size={20} className={isActive ? "text-white" : "text-gray-400 group-hover:text-indigo-600"} />
                  {!collapsed && <span className="font-semibold text-sm">{item.name}</span>}
                  {isActive && !collapsed && (
                    <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* System Links */}
        {!collapsed && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">System</p>
            <div className="space-y-1">
              {menuItems.filter(item => item.section === "system").map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="block"
                  >
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${item.danger
                          ? "text-rose-600 hover:bg-rose-50"
                          : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      <Icon size={20} />
                      <span className="font-semibold text-sm">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Collapsed System Icons */}
        {collapsed && (
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-1">
            {menuItems.filter(item => item.section === "system").map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.link}
                  title={item.name}
                  className="block"
                >
                  <div className={`flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-200 ${item.danger ? "text-rose-600 hover:bg-rose-50" : "text-gray-600 hover:bg-gray-50"}`}>
                    <Icon size={20} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Expand Button (when collapsed) */}
      {collapsed && (
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={() => setCollapsed(false)}
            className="w-full p-3 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all flex items-center justify-center"
          >
            <ChevronLeft size={18} className="rotate-180" />
          </button>
        </div>
      )}

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <Image src={user.avatar} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                  ) : (
                    <span className="text-sm font-bold text-indigo-600">{user.name.charAt(0)}</span>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 uppercase tracking-tight">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed User Avatar */}
      {collapsed && (
        <div className="p-3 border-t border-gray-100">
          <div className="relative mx-auto w-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <Image src={user.avatar} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                ) : (
                  <span className="text-sm font-bold text-indigo-600">{user.name.charAt(0)}</span>
                )}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
      )}
    </nav>
  );

  // Mobile Bottom Navigation
  const MobileBottomNav = () => {
    const mainItems = menuItems.filter(item => item.section === "main").slice(0, 4);

    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-2xl pb-safe">
        <div className="flex items-center justify-around px-2 py-3">
          {mainItems.map((item) => {
            const isActive = active === item.name;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setActive(item.name)}
                className="flex-1"
              >
                <div className="flex flex-col items-center gap-1 py-2 px-3 relative">
                  <div className={`p-2 rounded-xl transition-all duration-200 ${isActive ? "bg-indigo-600" : "bg-transparent"}`}>
                    <Icon
                      size={20}
                      className={isActive ? "text-white" : "text-gray-400"}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                  <span className={`text-[10px] font-bold transition-colors ${isActive ? "text-indigo-600" : "text-gray-500"}`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-full" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <DesktopSidebar />
      <MobileBottomNav />
    </>
  );
};

export default Sidebar;
