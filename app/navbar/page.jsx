"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaCar,
  FaPlusCircle,
  FaMapMarkedAlt,
  FaFilter,
  FaHome,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const navItems = [
  { name: 'Home', path: '/', icon: <FaHome /> },
  { name: 'Cars', path: '/cars', icon: <FaCar /> },
  { name: 'Add Car', path: '/add-car', icon: <FaPlusCircle /> },
  { name: 'Showrooms', path: '/showrooms', icon: <FaMapMarkedAlt /> },
  { name: 'Filter', path: '/filter', icon: <FaFilter /> },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
          <FaCar className="text-yellow-400" />
          <span>Car GoON</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center space-x-1 hover:text-yellow-400 ${
                isActive(item.path) ? 'text-yellow-400 font-semibold' : ''
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`block flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-800 ${
                isActive(item.path) ? 'bg-gray-800 text-yellow-400 font-semibold' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
