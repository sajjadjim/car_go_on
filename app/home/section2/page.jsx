"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const carBrands = [
  { name: "Tesla", logo: "/logo/tesla.png" },
  { name: "BMW", logo: "/logo/BMW.png" },
  { name: "Audi", logo: "/logo/audi.jpeg" },
  { name: "Mercedes", logo: "/logo/mercedes.WEBP" },
  { name: "Toyota", logo: "/logo/toyota.jpg" },
  { name: "Ford", logo: "/logo/ford.png" },
];

const CarBrandsMarquee = () => {
  return (
    <section className="bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
         Trusted Car Brands
      </h2>
      <Marquee gradient={false} speed={40}>
        {carBrands.map((brand, index) => (
          <div key={index} className="mx-8 transition-transform duration-300 hover:scale-110">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={100}
              height={60}
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default CarBrandsMarquee;
