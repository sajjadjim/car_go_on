import Link from "next/link";
import {
  FaMapMarkedAlt,
  FaStar,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaCarSide,
  FaMotorcycle,
} from "react-icons/fa";
import { BD_SHOWROOMS } from "@/lib/vehicleUtils";

export const metadata = {
  title: "Verified Car & Bike Showrooms in Bangladesh | Car GoON BD",
  description: "Browse verified car dealerships and official bike showrooms in Dhaka, Chittagong, and across Bangladesh.",
};

export default function ShowroomsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaCheckCircle /> 100% Verified Partners
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Top Car & Bike <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">Showrooms in Bangladesh</span>
          </h1>
          <p className="mt-3 text-slate-400 text-sm md:text-base">
            Visit physical vehicle display centers across Dhaka Tejgaon, Banani, Gulshan, and Chittagong with authorized warranties and genuine paperwork.
          </p>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BD_SHOWROOMS.map((showroom) => (
            <div
              key={showroom.id}
              className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md transition-all duration-300 hover:border-amber-400/30 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={showroom.image}
                    alt={showroom.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs shadow-md">
                      <FaCheckCircle size={10} /> Verified Dealer
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-400 text-xs font-semibold backdrop-blur border border-slate-700">
                      <FaStar size={11} /> {showroom.rating} ({showroom.reviews})
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {showroom.name}
                  </h3>

                  <p className="mt-2 text-xs text-amber-300/90 font-medium">
                    {showroom.specialty}
                  </p>

                  <div className="mt-3 text-xs text-slate-400 flex items-start gap-2">
                    <FaMapMarkerAlt className="text-slate-500 mt-0.5 shrink-0" />
                    <span>{showroom.address}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 mt-2 flex items-center gap-3">
                <a
                  href={`tel:${showroom.phone}`}
                  className="flex-1 text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <FaPhoneAlt size={12} /> Call Showroom
                </a>

                <Link
                  href="/cars"
                  className="py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  View Stock
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Own a Car or Bike Showroom in Bangladesh?</h3>
            <p className="mt-1 text-sm text-slate-400">
              Join CarGoON BD dealer network and showcase your entire showroom inventory to over 100,000 monthly active buyers.
            </p>
          </div>
          <Link
            href="/addCar"
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shrink-0 shadow-lg shadow-amber-400/20 transition"
          >
            Register Your Dealership
          </Link>
        </div>
      </div>
    </div>
  );
}
