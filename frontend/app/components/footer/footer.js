import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-10 group-hover:opacity-30 transition-opacity duration-300 rounded-lg"></div>
                <div className="relative w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight group-hover:from-indigo-600 group-hover:to-indigo-400 transition-all duration-300">
                Evently
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bringing your next adventure to life. Explore premium events, connect with communities, and create unforgettable memories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-all transform hover:scale-110 shadow-sm">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-500 hover:text-blue-400 transition-all transform hover:scale-110 shadow-sm">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-pink-200 hover:bg-pink-50 text-gray-500 hover:text-pink-600 transition-all transform hover:scale-110 shadow-sm">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-6">Discovery</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/all-events" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/all-events?category=music" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                  Concerts & Gigs
                </Link>
              </li>
              <li>
                <Link href="/all-events?category=sports" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                  Sports Matches
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 group">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-gray-600 text-sm leading-relaxed">
                  123 Event St, Suite 100<br />New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors shadow-sm">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors shadow-sm">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-gray-600 text-sm">hello@evently.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Evently. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm text-gray-500">
              <Link href="#" className="hover:text-blue-600 transition-colors font-medium">Privacy</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors font-medium">Terms</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors font-medium">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
