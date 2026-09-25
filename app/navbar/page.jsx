"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaCar,
  FaMotorcycle,
  FaPlusCircle,
  FaMapMarkedAlt,
  FaFilter,
  FaHome,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaCalculator,
} from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  const isActive = (path) => {
    if (path === "/" && (pathname === "/" || pathname === "/home")) return true;
    return pathname.startsWith(path) && path !== "/";
  };

  const navItems = useMemo(() => {
    return [
      { name: "Home", path: "/", icon: <FaHome /> },
      { name: "Cars", path: "/cars", icon: <FaCar /> },
      { name: "Bikes", path: "/bikes", icon: <FaMotorcycle />, badge: "BD HOT" },
      { name: "Filter", path: "/filter", icon: <FaFilter /> },
      { name: "Showrooms", path: "/showrooms", icon: <FaMapMarkedAlt /> },
      { name: "EMI Calc", path: "/calculator", icon: <FaCalculator /> },
    ];
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-emerald-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center gap-0.5">
              <FaCar className="text-amber-400 text-sm" />
              <FaMotorcycle className="text-emerald-400 text-xs" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white">
                CarGo<span className="text-amber-400">ON</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-slate-950">
                BD
              </span>
            </div>
            <span className="text-[10px] text-slate-400 -mt-1 font-medium tracking-wide">
              Car & Bike Marketplace
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-slate-900 text-amber-400 border border-slate-800"
                  : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <span className={isActive(item.path) ? "text-amber-400" : "text-slate-400"}>
                {item.icon}
              </span>
              <span>{item.name}</span>
              {item.badge && (
                <span className="text-[9px] font-black bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Right CTA & Auth */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/addCar"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-400/20 transition-all duration-200"
          >
            <FaPlusCircle size={14} /> Sell Car / Bike
          </Link>

          {!user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <Link
                href="/authentications/login"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition"
              >
                Log In
              </Link>
              <Link
                href="/authentications/signup"
                className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <Link
              href="/profile"
              className="p-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
              title={user.displayName || user.email || "Profile"}
            >
              <FaUserCircle size={28} className="text-amber-400" />
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/addCar"
            className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1"
          >
            <FaPlusCircle size={12} /> Sell
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-6 pt-2 border-t border-slate-800/80 bg-slate-950 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold transition ${
                isActive(item.path)
                  ? "bg-slate-900 text-amber-400 border border-slate-800"
                  : "text-slate-300 hover:bg-slate-900"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base text-slate-400">{item.icon}</span>
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}

          {/* Auth section */}
          <div className="pt-3 border-t border-slate-800">
            {!user ? (
              <div className="flex gap-2">
                <Link
                  href="/authentications/login"
                  className="flex-1 text-center py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm font-semibold text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/authentications/signup"
                  className="flex-1 text-center py-2.5 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <Link
                href="/profile"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 text-white font-medium text-sm"
                onClick={() => setMenuOpen(false)}
              >
                <FaUserCircle size={22} className="text-amber-400" />
                <span>My Profile ({user.email})</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
