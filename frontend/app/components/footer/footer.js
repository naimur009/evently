import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight group-hover:scale-105 transition-transform duration-300">
                Evently
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bringing your next adventure to life. Explore premium events, connect with communities, and create unforgettable memories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-400 hover:text-blue-400 transition-all transform hover:scale-110 backdrop-blur-sm">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-400 hover:text-blue-400 transition-all transform hover:scale-110 backdrop-blur-sm">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-400 hover:text-pink-400 transition-all transform hover:scale-110 backdrop-blur-sm">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Discovery</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/all-events" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/all-events?category=music" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                  Concerts & Gigs
                </Link>
              </li>
              <li>
                <Link href="/all-events?category=sports" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                  Sports Matches
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <MapPin className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">
                  123 Event St, Suite 100<br />New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-gray-400 text-sm">hello@evently.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Evently. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
