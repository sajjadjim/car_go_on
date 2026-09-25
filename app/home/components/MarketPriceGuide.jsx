"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChartLine,
  FaCarSide,
  FaMotorcycle,
  FaCheckCircle,
  FaArrowRight,
  FaCalculator,
} from "react-icons/fa";

const CAR_BENCHMARKS = [
  { model: "Toyota Premio F-EX (2018-2021)", priceRange: "৳32.00 - ৳36.50 Lakh", engine: "1500cc Octane", popularIn: "Banani, Gulshan, Uttara", link: "/cars?search=Premio" },
  { model: "Toyota Allion G-Plus (2018-2020)", priceRange: "৳30.50 - ৳34.00 Lakh", engine: "1500cc Octane", popularIn: "Dhaka & Chittagong", link: "/cars?search=Allion" },
  { model: "Corolla Axio Hybrid (2018-2021)", priceRange: "৳19.50 - ৳23.50 Lakh", engine: "1500cc Hybrid (24 km/l)", popularIn: "Mirpur, Dhanmondi, Sylhet", link: "/cars?search=Axio" },
  { model: "Honda Vezel RS Sensing (2018-2021)", priceRange: "৳28.00 - ৳32.50 Lakh", engine: "1500cc Hybrid", popularIn: "Dhanmondi, Banani", link: "/cars?search=Vezel" },
  { model: "Toyota Noah Si WxB (2018-2021)", priceRange: "৳38.00 - ৳44.00 Lakh", engine: "1800cc Hybrid (7 Seats)", popularIn: "Uttara, Chittagong", link: "/cars?search=Noah" },
  { model: "Toyota Harrier Progress (2018-2020)", priceRange: "৳62.00 - ৳75.00 Lakh", engine: "2000cc Turbo AWD", popularIn: "Gulshan, Baridhara", link: "/cars?search=Harrier" },
];

const BIKE_BENCHMARKS = [
  { model: "Yamaha YZF R15M V4 (Special Edition)", priceRange: "৳5.90 - ৳6.10 Lakh", engine: "155cc Dual ABS VVA", popularIn: "Dhaka, Chittagong, Sylhet", link: "/bikes?search=R15" },
  { model: "Yamaha MT-15 V2 (Cyan / Ice Fluo)", priceRange: "৳5.15 - ৳5.40 Lakh", engine: "155cc Dual ABS", popularIn: "Mirpur, Uttara, Rajshahi", link: "/bikes?search=MT-15" },
  { model: "Royal Enfield Classic 350 (Dark Stealth)", priceRange: "৳4.85 - ৳5.10 Lakh", engine: "349cc J-Series Dual ABS", popularIn: "Tejgaon, Gulshan, Dhanmondi", link: "/bikes?search=Classic+350" },
  { model: "Royal Enfield Hunter 350 (Dapper Ash)", priceRange: "৳4.30 - ৳4.50 Lakh", engine: "349cc Modern Roadster", popularIn: "Dhaka, Sylhet", link: "/bikes?search=Hunter+350" },
  { model: "Suzuki Gixxer SF Fi ABS (MotoGP)", priceRange: "৳3.25 - ৳3.45 Lakh", engine: "155cc Single ABS", popularIn: "All Bangladesh Divisions", link: "/bikes?search=Gixxer" },
  { model: "TVS Apache RTR 160 4V Special Fi", priceRange: "৳2.15 - ৳2.35 Lakh", engine: "160cc 4-Valve SmartXonnect", popularIn: "Rajshahi, Khulna, Bogura", link: "/bikes?search=Apache" },
  { model: "Bajaj Pulsar N160 (Dual Channel ABS)", priceRange: "৳2.55 - ৳2.70 Lakh", engine: "165cc Oil Cooled Dual ABS", popularIn: "Dhaka, Chittagong", link: "/bikes?search=Pulsar" },
  { model: "Yamaha FZ-S Fi V3 Deluxe", priceRange: "৳2.55 - ৳2.75 Lakh", engine: "149cc Single ABS Fi", popularIn: "Nationwide Commuter", link: "/bikes?search=FZ-S" },
];

export default function MarketPriceGuide() {
  const [activeTab, setActiveTab] = useState("cars");

  const list = activeTab === "cars" ? CAR_BENCHMARKS : BIKE_BENCHMARKS;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <FaChartLine /> Bangladesh Market Price Index (2025/2026)
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Know the Fair Market Value <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-200">Before You Buy or Sell</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Real market prices collected from actual showroom sales and verified classified transactions across Bangladesh.
          </p>

          {/* Toggle */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setActiveTab("cars")}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeTab === "cars"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FaCarSide size={14} /> Car Price Benchmarks
            </button>
            <button
              onClick={() => setActiveTab("bikes")}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeTab === "bikes"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FaMotorcycle size={14} /> Bike Price Benchmarks
            </button>
          </div>
        </div>

        {/* Pricing Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>{item.engine}</span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono">BD Index</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {item.model}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-end justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Est. Market Rate:</span>
                  <span className={`text-base font-extrabold ${activeTab === "cars" ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {item.priceRange}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition flex items-center gap-1">
                  Browse <FaArrowRight size={10} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action Bar */}
        <div className="mt-10 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <FaCalculator size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Need vehicle financing in Bangladesh?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Estimate monthly EMI installments with City Bank, BRAC Bank, and IDLC interest rates.
              </p>
            </div>
          </div>
          <Link
            href="/calculator"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition shrink-0"
          >
            Calculate Loan EMI →
          </Link>
        </div>
      </div>
    </section>
  );
}
