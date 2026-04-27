import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-14">
        {/* Glass Container */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Logo Section */}
            <div>
              <h1 className="text-3xl font-serif font-bold text-yellow-500">
                Advocate
              </h1>

              <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                Trusted legal experts providing professional support in
                criminal, corporate, and civil law matters. We deliver reliable
                and transparent legal solutions.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-6">
                <div className="p-3 rounded-full bg-white/10 hover:bg-yellow-500 transition cursor-pointer">
                  <FaFacebookF />
                </div>

                <div className="p-3 rounded-full bg-white/10 hover:bg-yellow-500 transition cursor-pointer">
                  <FaTwitter />
                </div>

                <div className="p-3 rounded-full bg-white/10 hover:bg-yellow-500 transition cursor-pointer">
                  <FaLinkedinIn />
                </div>

                <div className="p-3 rounded-full bg-white/10 hover:bg-yellow-500 transition cursor-pointer">
                  <FaInstagram />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-white font-semibold text-lg mb-4">
                Quick Links
              </h2>

              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link to="/" className="hover:text-yellow-500 transition">
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/advocate"
                    className="hover:text-yellow-500 transition"
                  >
                    All Advocates
                  </Link>
                </li>

                <li>
                  <Link
                    to="/practice"
                    className="hover:text-yellow-500 transition"
                  >
                    Practice Areas
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="hover:text-yellow-500 transition"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="hover:text-yellow-500 transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Practice Areas */}
            <div>
              <h2 className="text-white font-semibold text-lg mb-4">
                Legal Services
              </h2>

              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="hover:text-yellow-500 cursor-pointer">
                  Criminal Law
                </li>

                <li className="hover:text-yellow-500 cursor-pointer">
                  Family Law
                </li>

                <li className="hover:text-yellow-500 cursor-pointer">
                  Property Law
                </li>

                <li className="hover:text-yellow-500 cursor-pointer">
                  Corporate Law
                </li>

                <li className="hover:text-yellow-500 cursor-pointer">
                  Civil Litigation
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h2 className="text-white font-semibold text-lg mb-4">
                Contact Us
              </h2>

              <ul className="space-y-3 text-gray-300 text-sm">
                <li>📍 Lucknow, Uttar Pradesh, India</li>

                <li>📞 +91 98765 43210</li>

                <li>✉ support@advocate.com</li>

                <li>🕘 Mon – Sat : 9AM – 7PM</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Advocate Legal Services. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
