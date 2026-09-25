"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaCarSide,
  FaMotorcycle,
  FaSearch,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaShieldAlt,
  FaCheckCircle,
  FaPhoneAlt,
  FaPlusCircle,
} from "react-icons/fa";
import { BD_CITIES, CAR_MAKES, BIKE_MAKES } from "@/lib/vehicleUtils";

export default function HeroSearch() {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState("car"); // "car" | "bike"
  const [selectedMake, setSelectedMake] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const basePath = vehicleType === "car" ? "/cars" : "/bikes";
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("search", keyword.trim());
    if (selectedMake !== "All") params.set("make", selectedMake);
    if (selectedCity !== "All Cities") params.set("city", selectedCity);

    router.push(`${basePath}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800/80 pt-16 pb-20 px-4">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Badges */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm mb-4 backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="text-amber-600 dark:text-amber-400 font-bold">Bangladesh’s Premier</span> Vehicle Marketplace
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Cars & Bikes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Buy & Sell Verified <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 dark:from-amber-400 dark:via-amber-300 dark:to-emerald-400">
              Cars & Bikes in Bangladesh
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Explore authentic Bangladeshi market prices in ৳ Lakh/Crore, Japanese reconditioned sedans, high-performance motorcycles, and connect directly with sellers.
          </p>
        </div>

        {/* Floating Search Hub */}
        <div className="mt-10 max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg backdrop-blur">
              <button
                type="button"
                onClick={() => {
                  setVehicleType("car");
                  setSelectedMake("All");
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  vehicleType === "car"
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-400/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FaCarSide size={16} /> Search Cars
              </button>
              <button
                type="button"
                onClick={() => {
                  setVehicleType("bike");
                  setSelectedMake("All");
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  vehicleType === "bike"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FaMotorcycle size={16} /> Search Bikes
              </button>
            </div>

            <Link
              href="/addCar"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 transition"
            >
              <FaPlusCircle /> Sell Free in 2 Minutes →
            </Link>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSearch}
            className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3"
          >
            {/* Keyword Input */}
            <div className="lg:col-span-4 relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm" />
              <input
                type="text"
                placeholder={
                  vehicleType === "car"
                    ? "e.g. Premio, Vezel, Allion..."
                    : "e.g. R15 V4, Classic 350, Gixxer..."
                }
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm transition"
              />
            </div>

            {/* Brand Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 text-sm transition"
              >
                <option value="All">All {vehicleType === "car" ? "Car" : "Bike"} Brands</option>
                {(vehicleType === "car" ? CAR_MAKES : BIKE_MAKES).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 text-sm transition"
              >
                {BD_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className={`w-full h-full py-3 px-4 rounded-2xl font-bold text-slate-950 flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
                  vehicleType === "car"
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-amber-400/20"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/20"
                }`}
              >
                <FaSearch size={14} /> Search
              </button>
            </div>
          </form>

          {/* Quick Search Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400">Popular in BD:</span>
            <Link
              href="/cars?search=Premio"
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400/50 hover:text-amber-600 dark:hover:text-amber-300 shadow-sm transition"
            >
              Toyota Premio (৳32-36L)
            </Link>
            <Link
              href="/bikes?search=R15"
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-300 shadow-sm transition"
            >
              Yamaha R15M V4 (৳6.05L)
            </Link>
            <Link
              href="/bikes?search=Classic+350"
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-300 shadow-sm transition"
            >
              Royal Enfield 350 (৳4.95L)
            </Link>
            <Link
              href="/cars?search=Axio"
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400/50 hover:text-amber-600 dark:hover:text-amber-300 shadow-sm transition"
            >
              Corolla Axio Hybrid (৳21L)
            </Link>
            <Link
              href="/cars?search=Vezel"
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400/50 hover:text-amber-600 dark:hover:text-amber-300 shadow-sm transition"
            >
              Honda Vezel RS (৳29L)
            </Link>
          </div>
        </div>

        {/* Key Marketplace Guarantees */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <FaMoneyBillWave size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Realistic BD Market Prices</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Updated prices in ৳ Lakh & Crore</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <FaMotorcycle size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Bikes & Scooters Section</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Yamaha, Royal Enfield, Suzuki & more</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <FaShieldAlt size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">BRTA Paperwork Status</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Registration, Smart Card & Tax Token</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <FaPhoneAlt size={16} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Direct Seller Contact</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Call or WhatsApp without middlemen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

