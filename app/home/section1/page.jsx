"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMoneyBillWave,
} from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carData = [
  { id: 1, title: "Tesla Model X", price: "$80,000", image: "/car/tesla.jpg" },
  { id: 2, title: "BMW i8", price: "$140,000", image: "/car/bmw.jpg" },
  { id: 3, title: "Audi Q8", price: "$100,000", image: "/car/audi.avif" },
  { id: 4, title: "Mercedes G-Wagon", price: "$150,000", image: "/car/mercedes.avif" },
];

function Arrow({ onClick, dir }) {
  return (
    <button
      aria-label={dir === "next" ? "Next" : "Previous"}
      onClick={onClick}
      className={`absolute ${dir === "next" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-yellow-400 text-white hover:text-gray-900 transition shadow`}
      type="button"
    >
      {dir === "next" ? <FaChevronRight /> : <FaChevronLeft />}
    </button>
  );
}

const HomeCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3200,
    speed: 700,
    cssEase: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    pauseOnHover: true,
    swipeToSlide: true,
    lazyLoad: "ondemand",
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    nextArrow: <Arrow dir="next" />,
    prevArrow: <Arrow dir="prev" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 640, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            🚗 Latest Cars
          </h2>
          <p className="text-sm text-white/70 mt-1">
            Curated luxury & performance — slide to explore
          </p>
        </div>

        <div className="relative">
          <Slider {...settings} className="custom-slick">
            {carData.map((car) => (
              <div key={car.id} className="px-2 sm:px-3">
                <div className="group card relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur ring-1 ring-white/10 hover:bg-white/10 transition-transform duration-300">
                  {/* Image */}
                  <div className="relative w-full h-64 sm:h-72">
                    <Image
                      src={car.image}
                      alt={car.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      priority={car.id === 1}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />

                    {/* Price badge */}
                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-gray-900 text-xs font-semibold px-2.5 py-1.5 rounded-full shadow">
                        <FaMoneyBillWave />
                        {car.price}
                      </span>
                    </div>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{car.title}</h3>
                    <button
                      type="button"
                      className="mt-2 opacity-0 group-hover:opacity-100 inline-block text-sm bg-white/15 hover:bg-white/25 border border-white/15 px-3 py-1.5 rounded-lg transition"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Optional: subtle edge gradient fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/40 to-transparent rounded-l-2xl" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/40 to-transparent rounded-r-2xl" />
        </div>
      </div>

      {/* Slick overrides (scoped) */}
      <style jsx global>{`
        .custom-slick .slick-list {
          margin: 0 -0.5rem;
        }
        @media (min-width: 640px) {
          .custom-slick .slick-list {
            margin: 0 -0.75rem;
          }
        }
        .custom-slick .slick-slide {
          padding: 0 0.5rem;
        }
        @media (min-width: 640px) {
          .custom-slick .slick-slide {
            padding: 0 0.75rem;
          }
        }
        /* Dots */
        .custom-slick .slick-dots {
          bottom: -30px;
        }
        .custom-slick .slick-dots li button:before {
          font-size: 10px;
          color: #ffffffcc;
          opacity: 0.5;
        }
        .custom-slick .slick-dots li.slick-active button:before {
          color: #facc15;
          opacity: 1;
        }
        /* Slight lift for centered slide on large screens */
        .custom-slick .slick-center .card {
          transform: translateY(-4px) scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default HomeCarousel;
