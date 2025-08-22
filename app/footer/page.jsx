"use client";

import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Car GoON</h2>
          <p className="text-gray-400">
            Explore cars, compare prices, find your nearest showroom. Built to make your car search faster and easier.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <ul className="text-gray-400 space-y-2">
            <li className="flex items-center gap-2"><FaEnvelope /> support@cargoon.com</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-2xl text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Car GoON. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
