"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaCar,
  FaPlusCircle,
  FaMapMarkedAlt,
  FaFilter,
  FaHome,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext"; // <-- use your Auth context

const navItems = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Cars", path: "/cars", icon: <FaCar /> },
  { name: "Add Car", path: "/addCar", icon: <FaPlusCircle /> },
  { name: "Showrooms", path: "/showrooms", icon: <FaMapMarkedAlt /> },
  { name: "Filter", path: "/filter", icon: <FaFilter /> },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth(); // <-- read current user

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
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center space-x-1 hover:text-yellow-400 ${
                isActive(item.path) ? "text-yellow-400 font-semibold" : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          {/* RIGHT SIDE: Auth area */}
          {!user ? (
            <div className="flex items-center gap-3 ml-4">
              <Link
                href="/authentications/login"
                className="px-3 py-1.5 rounded border border-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition"
              >
                Login
              </Link>
              <Link
                href="/authentications/signup"
                className="px-3 py-1.5 rounded bg-yellow-400 text-gray-900 hover:opacity-90 transition"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <Link
              href="/profile"
              className="ml-4 flex items-center"
              title={user.displayName || user.email || "Profile"}
            >
              <FaUserCircle size={28} className="text-yellow-400" />
            </Link>
          )}
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
                isActive(item.path) ? "bg-gray-800 text-yellow-400 font-semibold" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Mobile auth buttons under nav */}
          {!user ? (
            <div className="pt-2 flex gap-3">
              <Link
                href="/authentications/login"
                className="flex-1 text-center px-3 py-2 rounded border border-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/authentications/signup"
                className="flex-1 text-center px-3 py-2 rounded bg-yellow-400 text-gray-900 hover:opacity-90 transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          ) : (
            <Link
              href="/profile"
              className="flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              <FaUserCircle size={24} className="text-yellow-400" />
              <span>Profile</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
