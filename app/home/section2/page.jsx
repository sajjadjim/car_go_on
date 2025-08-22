"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa";

const carBrands = [
  { name: "Tesla", logo: "/logo/tesla.png" },
  { name: "BMW", logo: "/logo/BMW.png" },       // ⚠️ ensure filename case matches your /public folder
  { name: "Audi", logo: "/logo/audi.jpeg" },
  { name: "Mercedes", logo: "/logo/mercedes.WEBP" },
  { name: "Toyota", logo: "/logo/toyota.jpg" },
  { name: "Ford", logo: "/logo/ford.png" },
];

function BrandChip({ brand }) {
  return (
    <div className="group mx-6">
      <div className="relative w-[120px] h-[64px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
        <div className="flex h-full items-center justify-center px-4">
          <Image
            src={brand.logo}
            alt={brand.name}
            width={100}
            height={60}
            className="object-contain grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition"
            priority={false}
          />
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-white/80">{brand.name}</p>
    </div>
  );
}

export default function CarBrandsMarquee() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white inline-flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            Trusted Car Brands
          </h2>
          <p className="text-sm text-white/70 mt-1">
            Premium manufacturers our users love
          </p>
        </div>

        {/* Row 1 */}
        <div className="relative">
          <Marquee gradient={false} speed={48} pauseOnHover className="py-2">
            {carBrands.concat(carBrands).map((b, i) => (
              <BrandChip key={`row1-${i}-${b.name}`} brand={b} />
            ))}
          </Marquee>
          {/* Edge fades */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/60 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/60 to-transparent"
          />
        </div>

        {/* Row 2 (reverse) */}
        <div className="relative mt-4">
          <Marquee gradient={false} speed={40} pauseOnHover direction="right" className="py-2">
            {carBrands.concat(carBrands).map((b, i) => (
              <BrandChip key={`row2-${i}-${b.name}`} brand={b} />
            ))}
          </Marquee>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/60 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/60 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
