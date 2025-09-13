"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { decode } from "@/app/libs/decodeToken";
import { CircleUser } from "lucide-react";
import api from "@/app/libs/axios";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [role, setRole] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef(null);


  // Handle auth (role detection)
  useEffect(() => {
    setMounted(true);

    const token = Cookies.get("Token");

    if (!token) {
      setRole(null);
      return;
    }

    try {
      const decodedRole = decode(token)?.role || null;
      setRole(decodedRole);
    } catch {
      setRole(null);
    }
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
      const response = await api.post("/logout");

      if (response.data.status === "success") {
        setRole(null);
        router.push("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsProfileMenuOpen(false);
      setIsMobileMenuOpen(false);
    }
  }, [router]);



  //  Nav Links based on role
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

  // if role is not set return null and not rendered
  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none">
            <span className="text-3xl font-extrabold text-blue-600 tracking-tight font-[cursive]">
              Evently
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {linksToShow.map(({ name, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={name}
                  href={href}
                  className={`relative text-lg font-medium transition-colors duration-300 ${isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                    }`}
                >
                  {name}
                </Link>
              );
            })}

            {/* Guest (no role) */}
            {!role && (
              <div className="flex items-center space-x-4">
                <Link
                  href="/log-in"
                  className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-100 hover:text-blue-600"
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-5 py-2 rounded-full font-medium text-white text-sm bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Authenticated */}
            {role && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-10 h-10 bg-blue-100 rounded-ful border-2 border-blue-500 rounded-full text-white flex items-center justify-center font-semibold text-lg"
                >
                  {/* <CircleUserRound/> */}
                  <CircleUser color="blue" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                    {/* Profile Section */}
                    <Link
                      href="/"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 group-hover:text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9.003 9.003 0 0112 15c2.485 0 4.735.995 6.364 2.621M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Profile</span>
                    </Link>

                    {/* Divider */}
                    <div className="border-t border-gray-100"></div>

                    {/* Logout Section */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-5 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                      </svg>
                      <span className="font-medium">Log Out</span>
                    </button>
                  </div>

                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          isMobileMenuOpen
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        className="md:hidden overflow-hidden bg-white/90 backdrop-blur-md border-t border-gray-200"
      >
        <div className="px-6 py-4 flex flex-col space-y-3">
          {linksToShow.map(({ name, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`block font-medium py-2 px-4 rounded-md ${isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {name}
              </Link>
            );
          })}

          {!role ? (
            <div className="pt-4 border-t border-gray-300 flex flex-col space-y-3">
              <Link
                href="/log-in"
                className="w-full py-2 rounded-full border border-gray-300 text-gray-700 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="w-full py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-300">
              <button
                onClick={handleLogout}
                className="w-full py-2 rounded-full border bg-red-500 text-white font-semibold hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
}
