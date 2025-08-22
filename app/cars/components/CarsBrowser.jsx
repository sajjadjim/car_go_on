// app/components/CarsBrowser.jsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FaCarSide,
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaMoneyBillWave,
} from "react-icons/fa";

const PAGE_SIZE = 10;

function formatBDT(n) {
  try {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `${Number(n).toLocaleString()} BDT`;
  }
}

function StatBadge({ icon, children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-full bg-white/10 border border-white/10 ${className}`}>
      {icon}
      {children}
    </span>
  );
}

function CarCard({ car }) {
  const id = car.id || car._id;
  const title = `${car.make} ${car.model} ${car.trim ?? ""}`.trim();
  const img = (car.images && car.images[0]) || "https://picsum.photos/800/500";

  return (
    <div className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition shadow-sm hover:shadow-lg">
      <Link href={`/cars/${id}`} className="block relative">
        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={title}
          className="w-full aspect-[16/10] object-cover"
          onError={(ev) => (ev.currentTarget.style.opacity = "0.25")}
        />

        {/* Price badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-yellow-400 text-gray-900 px-2.5 py-1.5 rounded-full shadow">
            <FaMoneyBillWave /> {formatBDT(car.price_bdt)}
          </span>
        </div>

        {/* Year badge */}
        <div className="absolute top-3 right-3">
          <span className="text-xs bg-black/60 text-white px-2 py-1 rounded-full border border-white/10 backdrop-blur">
            <FaCalendarAlt className="inline mr-1" />
            {car.year}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug">
            {title}
          </h3>
        </div>

        <p className="mt-1 text-white/70 text-sm">
          {car.body_type || "—"}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <StatBadge icon={<FaGasPump className="opacity-80" />}>
            {car.fuel_type || "—"}
          </StatBadge>
          <StatBadge icon={<FaCogs className="opacity-80" />}>
            {car.transmission || "—"}
          </StatBadge>
          {car.location?.city && (
            <StatBadge icon={<FaMapMarkerAlt className="opacity-80" />}>
              {car.location.city}
            </StatBadge>
          )}
        </div>

        {/* Features preview */}
        <div className="mt-3 flex flex-wrap gap-2">
          {(car.features || []).slice(0, 3).map((f) => (
            <span key={f} className="text-[11px] text-white/85 bg-white/10 border border-white/10 px-2 py-1 rounded-full">
              {f}
            </span>
          ))}
          {(car.features?.length ?? 0) > 3 && (
            <span className="text-[11px] text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-full">
              +{car.features.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-4">
          <Link
            href={`/cars/${car._id}`}
            className="inline-block text-sm bg-yellow-400 text-gray-900 px-3 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, onChange }) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        aria-label="Previous"
        disabled={!canPrev}
        onClick={() => onChange(page - 1)}
        className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-white/10 text-white ${canPrev ? "bg-white/10 hover:bg-white/20" : "bg-white/5 text-white/40 cursor-not-allowed"}`}
      >
        <FaChevronLeft /> Prev
      </button>

      <div className="flex flex-wrap gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-lg border border-white/10 text-white ${p === page ? "bg-yellow-400 text-gray-900 font-semibold" : "bg-white/10 hover:bg-white/20"}`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        aria-label="Next"
        disabled={!canNext}
        onClick={() => onChange(page + 1)}
        className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-white/10 text-white ${canNext ? "bg-white/10 hover:bg-white/20" : "bg-white/5 text-white/40 cursor-not-allowed"}`}
      >
        Next <FaChevronRight />
      </button>
    </div>
  );
}

export default function CarsBrowser({ initialCars = [] }) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("price_bdt"); // "price_bdt" | "make" | "model"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" | "desc"

  const sorted = useMemo(() => {
    const list = [...initialCars];
    list.sort((a, b) => {
      let A, B;
      if (sortBy === "price_bdt") {
        A = Number(a.price_bdt || 0);
        B = Number(b.price_bdt || 0);
      } else {
        A = String(a[sortBy] || "").toLowerCase();
        B = String(b[sortBy] || "").toLowerCase();
      }
      if (A < B) return sortOrder === "asc" ? -1 : 1;
      if (A > B) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [initialCars, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = sorted.slice(start, start + PAGE_SIZE);

  // Reset page if sorting changes to avoid empty page
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header / Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 border border-white/10">
              <FaCarSide className="text-yellow-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Browse Cars</h1>
              <p className="text-sm text-white/70">
                Showing <span className="font-semibold">{pageItems.length}</span> of{" "}
                <span className="font-semibold">{sorted.length}</span> cars
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm text-white/80">Sort by</label>
            <select
              value={sortBy}
              onChange={handleSortBy}
              className="border border-white/10 bg-white/10 text-white rounded-lg px-3 py-2 outline-none hover:bg-white/20"
            >
              <option value="price_bdt">Price</option>
              <option value="make">Make (Name)</option>
              <option value="model">Model</option>
            </select>

            <select
              value={sortOrder}
              onChange={handleSortOrder}
              className="border border-white/10 bg-white/10 text-white rounded-lg px-3 py-2 outline-none hover:bg-white/20"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {pageItems.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((car) => (
              <CarCard key={car._id || car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="mt-10 text-center text-white/80">
            <p className="text-lg">No cars found.</p>
            <p className="text-sm text-white/60">Try changing the sort options.</p>
          </div>
        )}

        {/* Pagination */}
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
