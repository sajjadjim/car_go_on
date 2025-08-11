// app/components/CarsBrowser.jsx
'use client';

import { useMemo, useState } from "react";
import Link from "next/link";

const PAGE_SIZE = 10;

function formatBDT(n) {
  try {
    return new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 }).format(n);
  } catch {
    return `${Number(n).toLocaleString()} BDT`;
  }
}

function CarCard({ car }) {
  const id = car.id || car._id; // support either field
  const title = `${car.make} ${car.model} ${car.trim ?? ""}`.trim();
  const img = (car.images && car.images[0]) || "https://picsum.photos/800/500";

  // console.log("Full show me car information", car)

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
      <Link href={`/cars/${id}`}>
        <img src={img} alt={title} className="w-full h-48 object-cover" />
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm rounded-full bg-gray-100 px-2 py-0.5">{car.year}</span>
        </div>

        <p className="mt-1 text-gray-600 text-sm">
          {car.body_type} • {car.fuel_type} • {car.transmission}
        </p>

        <div className="mt-2 text-gray-800 font-semibold">{formatBDT(car.price_bdt)}</div>

        <div className="mt-3 flex flex-wrap gap-2">
          {(car.features || []).slice(0, 3).map((f) => (
            <span key={f} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{f}</span>
          ))}
          {(car.features?.length ?? 0) > 3 && (
            <span className="text-xs text-gray-500">+{car.features.length - 3} more</span>
          )}
        </div>

        <div className="mt-4">
          <Link href={`/cars/${car._id}`} className="inline-block text-sm bg-black text-white px-3 py-2 rounded-lg">
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
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        disabled={!canPrev}
        onClick={() => onChange(page - 1)}
        className={`px-3 py-2 rounded-lg border ${canPrev ? "bg-white hover:bg-gray-50" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
      >
        Prev
      </button>

      <div className="flex flex-wrap gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-lg border ${p === page ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        disabled={!canNext}
        onClick={() => onChange(page + 1)}
        className={`px-3 py-2 rounded-lg border ${canNext ? "bg-white hover:bg-gray-50" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
      >
        Next
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header / Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Browse Cars</h1>
          <p className="text-gray-600">Showing {pageItems.length} of {sorted.length} cars</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm">Sort by</label>
          <select value={sortBy} onChange={handleSortBy} className="border rounded-lg px-3 py-2">
            <option value="price_bdt">Price</option>
            <option value="make">Make (Name)</option>
            <option value="model">Model</option>
          </select>

          <select value={sortOrder} onChange={handleSortOrder} className="border rounded-lg px-3 py-2">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {pageItems.map((car) => (
          <CarCard key={ car._id || car.id} car={car} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
