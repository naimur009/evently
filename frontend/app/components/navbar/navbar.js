"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { decode } from "@/app/libs/decodeToken";
import { CircleUser, Menu, X, LogOut, User } from "lucide-react";
import api from "@/app/libs/axios";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [role, setRole] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle auth (role detection)
  useEffect(() => {
    setMounted(true);

    const checkAuthState = async () => {
      try {
        let token = Cookies.get("Token");

        if (!token && typeof window !== 'undefined') {
          token = localStorage.getItem('token');
        }

        if (!token) {
          setRole(null);
          return;
        }

        const { tokenManager } = await import('@/app/libs/tokenManager');
        if (!tokenManager.hasValidToken()) {
          setRole(null);
          return;
        }

        const decodedRole = decode(token)?.role || null;
        setRole(decodedRole);
      } catch (error) {
        console.error('Auth state check error:', error);
        setRole(null);
      }
    };

    checkAuthState();
  }, [pathname]);

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!isProfileMenuOpen) return;

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileMenuOpen]);

  // Logout Handler
  const handleLogout = useCallback(async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      const { tokenManager } = await import('@/app/libs/tokenManager');
      tokenManager.removeToken();

      if (typeof window !== 'undefined') {
        document.cookie = 'Token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }

      setRole(null);
      setIsProfileMenuOpen(false);
      setIsMobileMenuOpen(false);
      window.location.href = '/';
    }
  }, []);

  const navLinks = {
    user: [
      { name: "Home", href: "/" },
      { name: "Events", href: "/all-events" },
      { name: "My Tickets", href: "/my-tickets" },
    ],
    admin: [
      { name: "Home", href: "/" },
      { name: "Events", href: "/all-events" },
      { name: "My Tickets", href: "/my-tickets" },
      { name: "Dashboard", href: "/dashboard" },
    ],
    public: [
      { name: "Home", href: "/" },
      { name: "Events", href: "/all-events" },
    ],
  };

  const linksToShow = role ? navLinks[role] || navLinks.public : navLinks.public;

  if (!mounted) return null;

  const isEventDetails = pathname.startsWith("/all-events/") && pathname.length > "/all-events".length;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled
        ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50 py-3"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 select-none group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight group-hover:scale-105 transition-transform duration-300">
              Evently
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {linksToShow.map(({ name, href }) => {
              const isActive = pathname === href;

              // Determine text color based on background (scrolled or dark hero)
              const textColorClass = scrolled
                ? (isActive ? "text-blue-600" : "text-gray-700 group-hover:text-blue-600")
                : (isEventDetails ? (isActive ? "text-white font-bold" : "text-white/95 group-hover:text-white") : (isActive ? "text-blue-600" : "text-gray-700 group-hover:text-blue-600"));

              return (
                <Link
                  key={name}
                  href={href}
                  className={`relative group px-4 py-2 rounded-lg transition-all duration-300 ${isActive && scrolled ? "bg-blue-50" : ""
                    }`}
                >
                  <span className={`relative z-10 text-sm font-semibold transition-all duration-300 ${textColorClass}`}>
                    {name}
                  </span>
                  {isActive && !scrolled && (
                    <motion.div
                      layoutId="navbar-pill"
                      className={`absolute inset-0 rounded-lg ${isEventDetails ? "bg-white/20" : "bg-blue-50"
                        }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {!isActive && (
                    <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${(!scrolled && isEventDetails) ? "bg-white/10" : "bg-gray-100"
                      }`} />
                  )}
                </Link>
              );
            })}

            {/* Guest (no role) */}
            {!role && (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200/50">
                <Link
                  href="/log-in"
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${scrolled || !isEventDetails
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                    }`}
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-6 py-2.5 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Authenticated */}
            {role && (
              <div className="relative ml-4 pl-4 border-l border-gray-200/50" ref={profileRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${scrolled || !isEventDetails
                    ? "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 hover:from-blue-100 hover:to-indigo-100"
                    : "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:scale-105 transform`}
                >
                  <CircleUser className="w-6 h-6" />
                </button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden origin-top-right"
                    >
                      <div className="p-3">
                        <Link
                          href="/"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200 group"
                        >
                          <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-sm">Profile</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 mt-1 group"
                        >
                          <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors duration-200">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-sm">Log Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${scrolled || !isEventDetails
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
                }`}
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl"
          >
            <div className="px-4 py-6 flex flex-col space-y-1">
              {linksToShow.map(({ name, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={name}
                    href={href}
                    className={`block font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 ${isActive
                      ? "text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {name}
                  </Link>
                );
              })}

              {!role ? (
                <div className="pt-4 mt-3 border-t border-gray-100 flex flex-col space-y-3">
                  <Link
                    href="/log-in"
                    className="w-full py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-center hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="pt-4 mt-3 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full py-3.5 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
