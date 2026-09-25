"use client";

import React from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa";
import { useTheme } from "@/app/context/ThemeContext";

const carBrands = [
  { name: "Toyota", icon: "🚗", type: "Car", link: "/cars?search=Toyota" },
  { name: "Yamaha", icon: "🏍️", type: "Bike", link: "/bikes?search=Yamaha" },
  { name: "Honda", icon: "🚗", type: "Car & Bike", link: "/filter" },
  { name: "Royal Enfield", icon: "🏍️", type: "Bike", link: "/bikes?search=Royal+Enfield" },
  { name: "Nissan", icon: "🚗", type: "Car", link: "/cars?search=Nissan" },
  { name: "Suzuki", icon: "🏍️", type: "Car & Bike", link: "/filter" },
  { name: "Hyundai", icon: "🚗", type: "Car", link: "/cars?search=Hyundai" },
  { name: "Bajaj", icon: "🏍️", type: "Bike", link: "/bikes?search=Bajaj" },
  { name: "TVS", icon: "🏍️", type: "Bike", link: "/bikes?search=TVS" },
  { name: "BYD", icon: "⚡", type: "Electric Car", link: "/cars?search=BYD" },
  { name: "BMW", icon: "🚗", type: "Luxury Car", link: "/cars?search=BMW" },
  { name: "Hero", icon: "🏍️", type: "Bike", link: "/bikes?search=Hero" },
  { name: "Mitsubishi", icon: "🚗", type: "Car", link: "/cars?search=Mitsubishi" },
];

export default function BrandsMarquee() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <h3 className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
          <FaStar className="text-amber-500 dark:text-amber-400" />
          Leading Vehicle Manufacturers in Bangladesh
        </h3>
      </div>

      <div className="relative">
        <Marquee
          gradient={true}
          gradientColor={isLight ? "#f8fafc" : "#020617"}
          gradientWidth={60}
          speed={40}
          pauseOnHover
          className="py-2"
        >
          {carBrands.concat(carBrands).map((b, i) => (
            <Link
              key={`${b.name}-${i}`}
              href={b.link}
              className="mx-3 group inline-block"
            >
              <div className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm transition-all duration-200 flex items-center gap-3">
                <span className="text-xl">{b.icon}</span>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {b.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{b.type}</div>
                </div>
              </div>
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

