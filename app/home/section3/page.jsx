import Link from "next/link";
import {
  FaSearch,
  FaHandshake,
  FaCarSide,
} from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Browse & Filter",
      desc: "Explore thousands of verified listings. Filter by make, price, fuel, or body type to pinpoint the right car in seconds.",
    },
    {
      icon: <FaHandshake />,
      title: "Connect & Inspect",
      desc: "Chat with sellers, request more pictures, and schedule test drives—no middlemen, no hidden fees.",
    },
    {
      icon: <FaCarSide />,
      title: "Seal the Deal",
      desc: "Close confidently with our tips and safety checks. Get the keys and hit the road.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            How Car GoON Works
          </h2>
          <p className="text-white/70 mt-2">
            From search to keys—your next car in three easy steps.
          </p>
        </div>

        {/* steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 text-white shadow hover:shadow-xl transition"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-400 text-gray-900 flex items-center justify-center text-xl font-bold">
                {s.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-white/70">{s.desc}</p>

              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                <span className="text-xs text-white/80">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}
        </div>

        {/* call to action */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/cars"
            className="px-5 py-3 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:opacity-90 transition"
          >
            Start Browsing
          </Link>
          <Link
            href="/addCar"
            className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
          >
            List Your Car
          </Link>
        </div>
      </div>
    </section>
  );
}
