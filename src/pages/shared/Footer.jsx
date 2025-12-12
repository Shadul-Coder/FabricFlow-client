import { Link } from "react-router";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import logo from "/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto w-[95%] sm:w-[97%] py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Company Info */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="FabricFlow Logo" className="h-12" />
              <h2 className="text-2xl font-bold text-(--color-heading)">
                FabricFlow
              </h2>
            </Link>
            <p className="text-sm opacity-80 text-justify leading-relaxed">
              Streamlining garment production workflow for small and
              medium-sized factories. Track orders, manage production stages,
              and ensure timely delivery.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-3">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-base-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-base-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <SiX className="text-lg" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-base-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-base-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-(--color-heading) mb-5 pb-2 border-b border-base-300">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-products"
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60"></span>
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-(--color-heading) mb-5 pb-2 border-b border-base-300">
              Useful Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60"></span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-orders"
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60"></span>
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/track-order"
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60"></span>
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/add-product"
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60"></span>
                  Add Product
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-(--color-heading) mb-5 pb-2 border-b border-base-300">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <span className="text-sm opacity-80">
                  123 Fashion Street
                  <br />
                  Garment District, Dhaka 1212
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary flex-shrink-0" />
                <span className="text-sm opacity-80">+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary flex-shrink-0" />
                <span className="text-sm opacity-80">info@fabricflow.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm opacity-80 text-center md:text-left">
              <p>&copy; {currentYear} FabricFlow. All rights reserved.</p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
