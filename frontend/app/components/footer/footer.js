import { Facebook, Twitter, Instagram, Rocket } from "lucide-react";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 via-white to-gray-100 py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
            <Rocket className="w-7 h-7 text-blue-600 animate-bounce-slow" /> Evently
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Bringing your next adventure to life, one event at a time. Explore events, connect with communities, and make memories.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
          <nav className="flex flex-col space-y-2">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:ml-2">
              Home
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:ml-2">
              Events
            </Link>
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:ml-2">
              About Us
            </Link>
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:ml-2">
              Contact
            </Link>
          </nav>
        </div>

        {/* Social Media Links */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-600 hover:text-blue-500 transition-all duration-300 transform hover:scale-110"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-600 hover:text-pink-500 transition-all duration-300 transform hover:scale-110"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="border-t border-gray-200 mt-12 pt-8 text-center">
        <p className="text-gray-500 text-sm md:text-base">
          &copy; {new Date().getFullYear()} Evently. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
