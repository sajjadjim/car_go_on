"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaCarSide,
  FaMotorcycle,
  FaGasPump,
  FaCogs,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import { formatBDPrice } from "@/lib/vehicleUtils";

export default function FeaturedVehicles({ cars = [], bikes = [] }) {
  const [activeTab, setActiveTab] = useState("cars"); // "cars" | "bikes"

  const displayCars = cars.slice(0, 6);
  const displayBikes = bikes.slice(0, 6);

  return (
    <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 shadow-sm">
              Verified Stock in Bangladesh
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-200">Cars & Bikes</span>
            </h2>
            <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm">
              Hand-picked listings with verified condition, fair pricing, and clear Bangladeshi paperwork.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center">
              <button
                type="button"
                onClick={() => setActiveTab("cars")}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
                  activeTab === "cars"
                    ? "bg-amber-400 text-slate-950 shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FaCarSide size={14} /> Cars ({cars.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("bikes")}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
                  activeTab === "bikes"
                    ? "bg-emerald-500 text-slate-950 shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FaMotorcycle size={14} /> Bikes ({bikes.length})
              </button>
            </div>

            <Link
              href={activeTab === "cars" ? "/cars" : "/bikes"}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition"
            >
              View All {activeTab === "cars" ? "Cars" : "Bikes"} <FaArrowRight size={10} />
            </Link>
          </div>
        </div>

        {/* Cars Tab */}
        {activeTab === "cars" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCars.map((car) => {
              const id = car._id || car.id;
              const img =
                (car.images && car.images[0]) ||
                "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop";

              return (
                <div
                  key={id}
                  className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-amber-400/40 flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/cars/${id}`} className="block relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-black bg-amber-400 text-slate-950 px-3 py-1.5 rounded-full shadow-lg">
                          <FaMoneyBillWave /> {formatBDPrice(car.price_bdt)}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-1">
                        {car.condition && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-amber-300 px-2.5 py-1 rounded-full border border-slate-700/80 backdrop-blur">
                            {car.condition}
                          </span>
                        )}
                        <span className="text-xs font-semibold bg-slate-950/80 text-white px-2.5 py-1 rounded-full border border-slate-700/80 backdrop-blur">
                          {car.year}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3">
                        <span className="text-[11px] bg-black/60 text-slate-200 px-2 py-0.5 rounded border border-white/10 backdrop-blur">
                          {car.body_type || "Sedan"}
                        </span>
                      </div>
                    </Link>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        <Link href={`/cars/${id}`}>
                          {car.make} {car.model} {car.trim || ""}
                        </Link>
                      </h3>

                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        {car.location?.city && (
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-amber-500 dark:text-amber-400" />
                            {car.location.area ? `${car.location.area}, ` : ""}
                            {car.location.city}
                          </span>
                        )}
                        {car.brta_reg && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px] border border-slate-200 dark:border-transparent">
                              {car.brta_reg}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                          <FaGasPump className="text-amber-500 dark:text-amber-400 text-[10px]" />
                          {car.fuel_type || "Petrol"}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                          <FaCogs className="text-sky-500 dark:text-sky-400 text-[10px]" />
                          {car.transmission || "Automatic"}
                        </span>
                        {car.mileage_km ? (
                          <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 text-[11px] border border-slate-200 dark:border-transparent">
                            {car.mileage_km.toLocaleString()} km
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/cars/${id}`}
                      className="block w-full text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-md transition"
                    >
                      View Details & Specs →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bikes Tab */}
        {activeTab === "bikes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBikes.map((bike) => {
              const id = bike._id || bike.id;
              const img =
                (bike.images && bike.images[0]) ||
                "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop";

              return (
                <div
                  key={id}
                  className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-emerald-500/40 flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/bikes/${id}`} className="block relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${bike.make} ${bike.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-black bg-emerald-500 text-slate-950 px-3 py-1.5 rounded-full shadow-lg">
                          <FaMoneyBillWave /> {formatBDPrice(bike.price_bdt)}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-1">
                        {bike.condition && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-emerald-300 px-2.5 py-1 rounded-full border border-slate-700/80 backdrop-blur">
                            {bike.condition}
                          </span>
                        )}
                        <span className="text-xs font-semibold bg-slate-950/80 text-white px-2.5 py-1 rounded-full border border-slate-700/80 backdrop-blur">
                          {bike.year}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3">
                        <span className="text-[11px] bg-black/60 text-slate-200 px-2 py-0.5 rounded border border-white/10 backdrop-blur">
                          {bike.bike_type || "Sports Bike"}
                        </span>
                      </div>
                    </Link>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        <Link href={`/bikes/${id}`}>
                          {bike.make} {bike.model} {bike.trim || ""}
                        </Link>
                      </h3>

                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        {bike.location?.city && (
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-emerald-500 dark:text-emerald-400" />
                            {bike.location.area ? `${bike.location.area}, ` : ""}
                            {bike.location.city}
                          </span>
                        )}
                        {bike.brta_reg && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px] border border-slate-200 dark:border-transparent">
                              {bike.brta_reg}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                          <FaCogs className="text-emerald-500 dark:text-emerald-400 text-[10px]" />
                          {bike.engine_cc} cc
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                          <FaShieldAlt className="text-amber-500 dark:text-amber-400 text-[10px]" />
                          {bike.brake_type || "ABS"}
                        </span>
                        {bike.mileage_kmpl ? (
                          <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 text-[11px] border border-slate-200 dark:border-transparent">
                            {bike.mileage_kmpl} km/l
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/bikes/${id}`}
                      className="block w-full text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md transition"
                    >
                      View Details & Specs →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Bottom Link */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href={activeTab === "cars" ? "/cars" : "/bikes"}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm font-bold text-white"
          >
            Explore all {activeTab === "cars" ? "cars" : "bikes"} →
          </Link>
        </div>
      </div>
    </section>
  );
}
