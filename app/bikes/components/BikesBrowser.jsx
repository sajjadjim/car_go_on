"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FaMotorcycle,
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaMoneyBillWave,
  FaShieldAlt,
  FaFilter,
  FaSearch,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { formatBDPrice, formatBDT, BD_CITIES, BIKE_MAKES } from "@/lib/vehicleUtils";

const PAGE_SIZE = 9;

function StatBadge({ icon, children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-200 ${className}`}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
}

function BikeCard({ bike }) {
  const id = bike._id || bike.id;
  const title = `${bike.make} ${bike.model} ${bike.trim ?? ""}`.trim();
  const img =
    (bike.images && bike.images[0]) ||
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 flex flex-col justify-between">
      <div>
        <Link href={`/bikes/${id}`} className="block relative overflow-hidden">
          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={title}
            className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(ev) => {
              ev.currentTarget.src =
                "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop";
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

          {/* BD Price Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500 text-slate-950 px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/20">
              <FaMoneyBillWave /> {formatBDPrice(bike.price_bdt)}
            </span>
          </div>

          {/* Condition / Year badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {bike.condition && (
              <span className="text-[11px] font-semibold uppercase tracking-wider bg-slate-900/80 text-emerald-400 px-2.5 py-1 rounded-full border border-slate-700/80 backdrop-blur">
                {bike.condition}
              </span>
            )}
            <span className="text-xs bg-slate-900/80 text-white px-2.5 py-1 rounded-full border border-slate-700/80 backdrop-blur flex items-center gap-1">
              <FaCalendarAlt className="text-amber-400 text-[10px]" />
              {bike.year}
            </span>
          </div>

          {/* Bike Type Tag */}
          {bike.bike_type && (
            <div className="absolute bottom-3 left-3">
              <span className="text-[11px] font-medium bg-black/60 text-slate-200 px-2 py-0.5 rounded border border-white/10 backdrop-blur">
                {bike.bike_type}
              </span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-5 text-white">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold leading-snug group-hover:text-emerald-400 transition-colors">
              <Link href={`/bikes/${id}`}>{title}</Link>
            </h3>
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
            {bike.location?.city && (
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-emerald-400" />
                {bike.location.area ? `${bike.location.area}, ` : ""}
                {bike.location.city}
              </span>
            )}
            {bike.brta_reg && (
              <>
                <span>•</span>
                <span className="text-slate-300 font-mono text-[11px] bg-slate-800 px-1.5 py-0.5 rounded">
                  {bike.brta_reg}
                </span>
              </>
            )}
          </div>

          {/* Specs pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {bike.engine_cc && (
              <StatBadge icon={<FaCogs className="text-emerald-400" />}>
                {bike.engine_cc} cc
              </StatBadge>
            )}
            {bike.brake_type && (
              <StatBadge icon={<FaShieldAlt className="text-amber-400" />}>
                {bike.brake_type}
              </StatBadge>
            )}
            {bike.mileage_kmpl && (
              <StatBadge icon={<FaGasPump className="text-sky-400" />}>
                {bike.mileage_kmpl} km/l
              </StatBadge>
            )}
          </div>

          {/* Features preview */}
          {bike.features && bike.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {bike.features.slice(0, 2).map((f) => (
                <span
                  key={f}
                  className="text-[11px] text-slate-300 bg-slate-800/60 border border-slate-700/50 px-2 py-0.5 rounded-md"
                >
                  ✓ {f}
                </span>
              ))}
              {bike.features.length > 2 && (
                <span className="text-[10px] text-slate-400 bg-slate-800/40 px-1.5 py-0.5 rounded">
                  +{bike.features.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 mt-3 flex items-center gap-2">
        <Link
          href={`/bikes/${id}`}
          className="flex-1 text-center text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-md transition-all duration-200"
        >
          View Details
        </Link>

        {bike.seller_phone && (
          <a
            href={`tel:${bike.seller_phone}`}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition"
            title={`Call Seller: ${bike.seller_phone}`}
          >
            <FaPhoneAlt size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function BikesBrowser({ initialBikes = [] }) {
  const [search, setSearch] = useState("");
  const [selectedMake, setSelectedMake] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCcRange, setSelectedCcRange] = useState("All");
  const [sortBy, setSortBy] = useState("price_asc");
  const [page, setPage] = useState(1);

  // Filter & Sort
  const filteredBikes = useMemo(() => {
    return initialBikes.filter((bike) => {
      // Text search
      const q = search.toLowerCase().trim();
      const title = `${bike.make} ${bike.model} ${bike.trim || ""}`.toLowerCase();
      if (q && !title.includes(q)) return false;

      // Brand
      if (selectedMake !== "All" && bike.make?.toLowerCase() !== selectedMake.toLowerCase()) {
        return false;
      }

      // City
      if (selectedCity !== "All Cities" && bike.location?.city !== selectedCity) {
        return false;
      }

      // CC Range
      if (selectedCcRange !== "All") {
        const cc = Number(bike.engine_cc) || 0;
        if (selectedCcRange === "under-125" && cc >= 125) return false;
        if (selectedCcRange === "125-165" && (cc < 125 || cc > 165)) return false;
        if (selectedCcRange === "above-250" && cc < 250) return false;
      }

      return true;
    });
  }, [initialBikes, search, selectedMake, selectedCity, selectedCcRange]);

  const sortedBikes = useMemo(() => {
    const list = [...filteredBikes];
    list.sort((a, b) => {
      if (sortBy === "price_asc") return (Number(a.price_bdt) || 0) - (Number(b.price_bdt) || 0);
      if (sortBy === "price_desc") return (Number(b.price_bdt) || 0) - (Number(a.price_bdt) || 0);
      if (sortBy === "year_desc") return (Number(b.year) || 0) - (Number(a.year) || 0);
      if (sortBy === "cc_desc") return (Number(b.engine_cc) || 0) - (Number(a.engine_cc) || 0);
      return 0;
    });
    return list;
  }, [filteredBikes, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedBikes.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = sortedBikes.slice(start, start + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 py-12 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <FaMotorcycle /> Bangladesh Bike Marketplace
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                Buy & Sell <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Bikes in Bangladesh</span>
              </h1>
              <p className="mt-2 text-slate-400 max-w-2xl text-sm md:text-base">
                Discover verified Yamaha, Royal Enfield, Honda, Suzuki, Bajaj, and TVS bikes with updated Bangladeshi market prices, BRTA registration info, and direct seller contact.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/addCar"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 transition"
              >
                <FaMotorcycle /> Sell Your Bike / Car
              </Link>
              <Link
                href="/cars"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 transition font-semibold"
              >
                Browse Cars →
              </Link>
            </div>
          </div>

          {/* Quick Stats Pills */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400">Royal Enfield 350cc</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">From ৳4.40 Lakh</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400">Yamaha R15 V4 / MT-15</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">৳5.20 - ৳6.05 Lakh</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400">Sports 160cc Segment</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">৳2.20 - ৳2.75 Lakh</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400">Daily Commuter Bikes</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">From ৳1.10 Lakh</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search bike (e.g. R15, Classic 350, Gixxer)..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Brand Dropdown */}
            <div>
              <select
                value={selectedMake}
                onChange={(e) => {
                  setSelectedMake(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="All">All Brands</option>
                {BIKE_MAKES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition"
              >
                {BD_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* CC Dropdown */}
            <div>
              <select
                value={selectedCcRange}
                onChange={(e) => {
                  setSelectedCcRange(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="All">All Engine CC</option>
                <option value="under-125">Under 125cc (Economy)</option>
                <option value="125-165">125cc - 165cc (Sports/Street)</option>
                <option value="above-250">250cc - 350cc+ (Cruisers)</option>
              </select>
            </div>
          </div>

          {/* Quick Filter row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 flex items-center gap-1.5">
                <FaFilter className="text-emerald-400" /> Showing:
              </span>
              <span className="font-bold text-emerald-400">{sortedBikes.length}</span>
              <span className="text-slate-400">bikes in Bangladesh</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Year: Newest First</option>
                <option value="cc_desc">Engine CC: Highest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bike Grid */}
        {pageItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((bike) => (
              <BikeCard key={bike._id || bike.id} bike={bike} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
            <FaMotorcycle size={48} className="mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-white">No bikes found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search criteria or clear filters to view all listings.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedMake("All");
                setSelectedCity("All Cities");
                setSelectedCcRange("All");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-800 text-sm font-medium ${
                page <= 1
                  ? "opacity-40 cursor-not-allowed bg-slate-900/40"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              <FaChevronLeft size={12} /> Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition ${
                  page === i + 1
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-800 text-sm font-medium ${
                page >= totalPages
                  ? "opacity-40 cursor-not-allowed bg-slate-900/40"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              Next <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
