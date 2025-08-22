import {
  FaCheckCircle,
  FaShieldAlt,
  FaHeadset,
  FaMoneyBillWave,
  FaClock,
  FaTools,
} from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaCheckCircle />,
      title: "Verified Listings",
      desc: "Human-reviewed posts help keep scams out and quality high.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safety First",
      desc: "Guides and checklists for secure inspections and deals.",
    },
    {
      icon: <FaHeadset />,
      title: "Friendly Support",
      desc: "Have a question? We’re just a message away—any time.",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Fair Pricing",
      desc: "Transparent pricing and tools to compare market value.",
    },
    {
      icon: <FaClock />,
      title: "Fast Search",
      desc: "Smart filters and blazing browsing to save your time.",
    },
    {
      icon: <FaTools />,
      title: "After-Sale Help",
      desc: "Tips for registration, maintenance, and ownership.",
    },
  ];

  return (
    <section className="bg-gradient-to-tr from-black via-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Why Choose Car GoON
          </h2>
          <p className="text-white/70 mt-2">
            Built for buyers and sellers who value speed, safety, and simplicity.
          </p>
        </div>

        {/* features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white hover:bg-white/10 transition"
            >
              <div className="w-11 h-11 rounded-xl bg-yellow-400 text-gray-900 flex items-center justify-center text-lg">
                {f.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* mini stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat number="10k+" label="Active Listings" />
          <Stat number="1M+" label="Monthly Views" />
          <Stat number="98%" label="Happy Users" />
          <Stat number="24/7" label="Support" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-center text-white">
      <div className="text-2xl font-extrabold">{number}</div>
      <div className="text-xs text-white/70 mt-1">{label}</div>
    </div>
  );
}
