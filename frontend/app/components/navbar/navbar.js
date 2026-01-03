"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket, User, LogOut, ChevronDown } from "lucide-react";
import Cookies from "js-cookie";
import api from "@/app/libs/axios";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [mounted, setMounted] = useState(false);

  const profileRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Authentication & Role Check
  useEffect(() => {
    const checkAuth = async () => {
      setMounted(true);
      const { tokenManager } = await import('@/app/libs/tokenManager');

      const token = tokenManager.getToken();
      let user = localStorage.getItem("user");
      let parsedUser = null;

      if (user) {
        try {
          parsedUser = JSON.parse(user);
        } catch (e) {
          console.error("Error parsing user from localStorage:", e);
        }
      }

      // Fallback: If no user object but token exists, decode token
      if (!parsedUser && token) {
        parsedUser = tokenManager.getUserInfo();
        if (parsedUser) {
          localStorage.setItem("user", JSON.stringify(parsedUser));
        }
      }

      if (parsedUser) {
        setRole(parsedUser.role || "user");
        setUsername(parsedUser.username || parsedUser.name || "");
      }
    };

    checkAuth();
  }, []);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click Outside Profile Menu
  useEffect(() => {
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
      setUsername("");
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
      { name: "Dashboard", href: "/dashboard" },
      { name: "Events", href: "/all-events" },
      { name: "My Tickets", href: "/my-tickets" },
    ],
    public: [
      { name: "Home", href: "/" },
      { name: "Events", href: "/all-events" },
    ],
  };

  const linksToShow = role ? navLinks[role] || navLinks.public : navLinks.public;

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled
        ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-lg"></div>
              <div className="relative w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-xl">E</span>
              </div>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
              Evently
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {linksToShow.map(({ name, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={name}
                  href={href}
                  className="relative group py-2"
                >
                  <span className={`relative z-10 text-sm font-semibold transition-colors duration-300 ${isActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-600"
                    }`}>
                    {name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions (Login/Profile) */}
          <div className="hidden md:flex items-center gap-4">
            {!role ? (
              <>
                <Link href="/log-in">
                  <button className="px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 font-semibold">
                    Log In
                  </button>
                </Link>
                <Link href="/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition-all"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isProfileMenuOpen ? "rotate-180" : ""}`} />
                </motion.button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 rounded-xl bg-white border border-gray-100 shadow-xl overflow-hidden z-50"
                    >
                      <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50">
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Signed in as</p>
                        <p className="text-sm font-black text-gray-900 truncate max-w-[180px]">{username || role}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{role}</p>
                      </div>
                      <div className="p-2 space-y-1">
                        {linksToShow.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-all"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            {link.name === "Dashboard" && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                            {link.name}
                          </Link>
                        ))}
                      </div>
                      <div className="p-2 border-t border-gray-50">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
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
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {linksToShow.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 text-lg font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {!role && (
                <div className="pt-4 flex flex-col gap-3">
                  <Link href="/log-in" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-3 text-gray-600 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                      Log In
                    </button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-3 text-white bg-blue-600 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
              {role && (
                <button
                  onClick={handleLogout}
                  className="w-full py-3 mt-4 flex items-center justify-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl font-semibold"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
