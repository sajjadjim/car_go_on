import Link from "next/link";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaHandshake,
  FaFileContract,
  FaSearch,
  FaCarSide,
  FaMotorcycle,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function WhyChooseUsBD() {
  const steps = [
    {
      step: "01",
      icon: <FaSearch />,
      title: "Search Verified Inventory",
      desc: "Filter across thousands of verified cars and bikes by city (Dhaka, Chittagong, Sylhet), engine CC, fuel type, and price in Lakh.",
    },
    {
      step: "02",
      icon: <FaHandshake />,
      title: "Direct Seller Chat & Call",
      desc: "Connect directly with owners and authorized showrooms over phone or WhatsApp. Zero middleman commission, zero hidden broker fees.",
    },
    {
      step: "03",
      icon: <FaFileContract />,
      title: "BRTA Document Check",
      desc: "Review BRTA registration serial, tax token validity, auction grade sheet, and ensure smooth name transfer.",
    },
    {
      step: "04",
      icon: <FaCheckCircle />,
      title: "Test Drive & Finalize",
      desc: "Inspect the vehicle physically at trusted spots or authorized service centers and drive home your dream ride.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Simple, Transparent & Secure
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How CarGoON Works in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-200">Bangladesh</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm md:text-base">
            From discovering your ideal vehicle to holding the keys — an easy, transparent 4-step process.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-xl font-bold shadow-lg shadow-amber-400/20 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-amber-500/60 dark:group-hover:text-amber-400/40 transition-colors">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {s.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-xl border border-amber-300 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:text-white dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">Have a car or motorcycle to sell?</h3>
            <p className="mt-1 text-sm text-slate-900/80 dark:text-slate-400">
              Post your ad for free in under 2 minutes and reach active buyers in Dhaka, Chittagong, and all 64 districts.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/addCar"
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white dark:bg-gradient-to-r dark:from-amber-400 dark:to-yellow-500 dark:hover:from-amber-300 dark:hover:to-yellow-400 dark:text-slate-950 font-bold text-sm shadow-xl transition"
            >
              Post Free Vehicle Ad →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
