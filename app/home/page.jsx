import { getCars } from "@/app/actions/car_action/getCars";
import { getBikes } from "@/app/actions/bike_action/getBikes";
import HeroSearch from "./components/HeroSearch";
import BrandsMarquee from "./components/BrandsMarquee";
import FeaturedVehicles from "./components/FeaturedVehicles";
import MarketPriceGuide from "./components/MarketPriceGuide";
import WhyChooseUsBD from "./components/WhyChooseUsBD";
import Link from "next/link";
import { FaCheckCircle, FaMapMarkedAlt, FaStar, FaPhoneAlt } from "react-icons/fa";
import { BD_SHOWROOMS } from "@/lib/vehicleUtils";

export const metadata = {
  title: "Car GoON Bangladesh | Buy & Sell Cars and Bikes at Current BD Market Price",
  description: "Bangladesh's premier vehicle buy & sell marketplace. Browse verified cars and bikes in Dhaka, Chittagong, Sylhet with realistic market prices in BDT.",
};

export default async function Home() {
  const [cars, bikes] = await Promise.all([getCars(), getBikes()]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100">
      {/* 1. Hero Search */}
      <HeroSearch />

      {/* 2. Brand Marquee */}
      <BrandsMarquee />

      {/* 3. Featured Cars & Bikes */}
      <FeaturedVehicles cars={cars} bikes={bikes} />

      {/* 4. Bangladesh Market Price Index */}
      <MarketPriceGuide />

      {/* 5. Verified Showrooms in Bangladesh Preview */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <FaMapMarkedAlt /> Physical Locations
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Featured Showrooms in Bangladesh
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Authorized dealerships in Tejgaon, Banani, and Chittagong with physical inspection hubs.
              </p>
            </div>
            <Link
              href="/showrooms"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 transition"
            >
              View All BD Showrooms →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BD_SHOWROOMS.slice(0, 3).map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                      Verified
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{s.name}</h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">{s.specialty}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{s.address}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <a
                    href={`tel:${s.phone}`}
                    className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition"
                  >
                    <FaPhoneAlt size={10} /> {s.phone}
                  </a>
                  <span className="text-xs text-amber-500 dark:text-amber-400 flex items-center gap-1">
                    <FaStar size={11} /> {s.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us in Bangladesh */}
      <WhyChooseUsBD />
    </div>
  );
}
