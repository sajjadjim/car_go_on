"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carData = [
  {
    id: 1,
    title: "Tesla Model X",
    price: "$80,000",
    image: "/car/tesla.jpg",
  },
  {
    id: 2,
    title: "BMW i8",
    price: "$140,000",
    image: "/car/bmw.jpg",
  },
  {
    id: 3,
    title: "Audi Q8",
    price: "$100,000",
    image: "/car/audi.avif",
  },
  {
    id: 4,
    title: "Mercedes G-Wagon",
    price: "$150,000",
    image: "/car/mercedes.avif",
  },
];

const HomeCarousel = () => {
const settings = {
  dots: true,
  infinite: true,
  autoplay: true,          // Auto slide enabled
  autoplaySpeed: 3000,     // Slide every 3 seconds
  speed: 800,              // Animation speed
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};


  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🚗 Latest Cars
      </h2>
      <Slider {...settings}>
        {carData.map((car) => (
          <div key={car.id} className="p-2">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-xl">
              <div className="relative w-full h-60">
                <Image
                  src={car.image}
                  alt={car.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{car.title}</h3>
                <p className="text-gray-600">{car.price}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HomeCarousel;
