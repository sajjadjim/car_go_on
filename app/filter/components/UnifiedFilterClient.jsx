"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaFilter,
  FaCarSide,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";
import { formatBDPrice, BD_CITIES } from "@/lib/vehicleUtils";

export default function UnifiedFilterClient({ cars = [], bikes = [] }) {
  const [category, setCategory] = useState("all"); // "all" | "car" | "bike"
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All Cities");
  const [priceBracket, setPriceBracket] = useState("all");
  const [condition, setCondition] = useState("all");

  const combinedList = useMemo(() => {
    const list = [];
    if (category === "all" || category === "car") {
      cars.forEach((c) => list.push({ ...c, _vehicleType: "car" }));
    }
    if (category === "all" || category === "bike") {
      bikes.forEach((b) => list.push({ ...b, _vehicleType: "bike" }));
    }
    return list;
  }, [cars, bikes, category]);

  const filteredList = useMemo(() => {
    return combinedList.filter((item) => {
      // Search
      const q = search.toLowerCase().trim();
      const title = `${item.make} ${item.model} ${item.trim || ""}`.toLowerCase();
      if (q && !title.includes(q)) return false;

      // City
      if (city !== "All Cities" && item.location?.city !== city) return false;

      // Condition
      if (condition !== "all" && item.condition?.toLowerCase() !== condition.toLowerCase()) {
        return false;
      }

      // Price Brackets
      const p = Number(item.price_bdt) || 0;
      if (priceBracket === "under-5") {
        if (p >= 500000) return false;
      } else if (priceBracket === "5-15") {
        if (p < 500000 || p > 1500000) return false;
      } else if (priceBracket === "15-30") {
        if (p < 1500000 || p > 3000000) return false;
      } else if (priceBracket === "30-60") {
        if (p < 3000000 || p > 6000000) return false;
      } else if (priceBracket === "above-60") {
        if (p < 6000000) return false;
      }

      return true;
    });
  }, [combinedList, search, city, priceBracket, condition]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <FaFilter /> Smart Vehicle Finder
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Filter & Compare Vehicles in Bangladesh
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Search both cars and motorcycles simultaneously with Bangladesh market price brackets.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md mb-8 space-y-5">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-800">
            <button
              onClick={() => setCategory("all")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition ${
                category === "all"
                  ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              All Vehicles ({cars.length + bikes.length})
            </button>
            <button
              onClick={() => setCategory("car")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition ${
                category === "car"
                  ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <FaCarSide /> Cars Only ({cars.length})
            </button>
            <button
              onClick={() => setCategory("bike")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition ${
                category === "bike"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <FaMotorcycle /> Bikes Only ({bikes.length})
            </button>
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search make or model..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
              >
                {BD_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={priceBracket}
                onChange={(e) => setPriceBracket(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Price Ranges</option>
                <option value="under-5">Under ৳5 Lakh (Bikes / Entry)</option>
                <option value="5-15">৳5 - ৳15 Lakh (Premium Bikes / Hatchbacks)</option>
                <option value="15-30">৳15 - ৳30 Lakh (Sedans & Hybrid Axio/Vezel)</option>
                <option value="30-60">৳30 - ৳60 Lakh (Premio, Allion, Noah, Crossovers)</option>
                <option value="above-60">Above ৳60 Lakh (Harrier, Prado, Luxury, EVs)</option>
              </select>
            </div>

            <div>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Conditions</option>
                <option value="Reconditioned">Reconditioned</option>
                <option value="Brand New">Brand New</option>
                <option value="Used">Used / Second Hand</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-400 text-sm">
            Showing <strong className="text-white">{filteredList.length}</strong> vehicles matching your criteria
          </p>
        </div>

        {/* Results Grid */}
        {filteredList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((item) => {
              const isCar = item._vehicleType === "car";
              const id = item._id || item.id;
              const link = isCar ? `/cars/${id}` : `/bikes/${id}`;
              const img =
                (item.images && item.images[0]) ||
                (isCar
                  ? "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop"
                  : "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop");

              return (
                <div
                  key={id}
                  className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition-all duration-300 hover:border-slate-700 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${item.make} ${item.model}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-slate-950 shadow-md ${
                            isCar ? "bg-amber-400" : "bg-emerald-400"
                          }`}
                        >
                          <FaMoneyBillWave /> {formatBDPrice(item.price_bdt)}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 text-white text-xs font-semibold backdrop-blur border border-slate-700">
                          {isCar ? <FaCarSide className="text-amber-400" /> : <FaMotorcycle className="text-emerald-400" />}
                          {isCar ? "Car" : "Bike"}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white">
                        {item.make} {item.model} {item.trim || ""}
                      </h3>

                      <div className="mt-1 text-xs text-slate-400 flex items-center gap-2">
                        <span>{item.year}</span>
                        <span>•</span>
                        <span>{isCar ? item.body_type || "Sedan" : `${item.engine_cc || 150}cc`}</span>
                        {item.location?.city && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FaMapMarkerAlt className="text-slate-500" /> {item.location.city}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={link}
                      className={`block w-full text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 transition ${
                        isCar
                          ? "bg-amber-400 hover:bg-amber-300"
                          : "bg-emerald-400 hover:bg-emerald-300"
                      }`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-400">
            <h3 className="text-xl font-bold text-white">No vehicles match your filter</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try choosing a broader price bracket or selecting "All Cities".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
