// app/cars/[id]/page.jsx
import { notFound } from "next/navigation";
import { getCarById } from "@/app/actions/car_action/getCarById";
import AdminUpdateButton from "../components/AdminUpdateButton"; // adjust path if needed

import {
  FaMapMarkerAlt, FaGasPump, FaCogs, FaRoad, FaUsers, FaCarSide,
  FaCalendarAlt, FaShieldAlt, FaMoneyBillWave, FaStar
} from "react-icons/fa";
import SafeImg from "../components/SafeImg";

export const revalidate = 0;

function format(n) {
  try {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `${Number(n).toLocaleString()} BDT`;
  }
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-3">
      <div className="text-white/70 text-xs flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-1 text-white font-semibold">{value ?? "—"}</div>
    </div>
  );
}

export default async function CarDetailsPage({ params }) {
  const car = await getCarById(params.id);
  if (!car) return notFound();

  const title = `${car.make} ${car.model} ${car.trim ?? ""}`.trim();
  const images = (car.images ?? []).slice(0, 6);
  const cover = images[0] || "https://picsum.photos/1200/700";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <FaCarSide className="text-yellow-400" />
              {title} <span className="text-white/60">—</span>{" "}
              <span className="text-white/90">{car.year}</span>
            </h1>
            <p className="mt-1 text-white/70 flex items-center gap-2">
              <FaMapMarkerAlt className="opacity-80" />
              {car.location?.city || "—"}, {car.location?.country || "—"}
            </p>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 text-gray-900 px-3 py-1.5 font-semibold shadow">
              <FaMoneyBillWave />
              {format(car.price_bdt)}
            </span>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
            <SafeImg
              src={cover}
              alt={`${title} main`}
              className="w-full h-[320px] md:h-[420px] object-cover"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            {images.slice(1).map((src, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur"
              >
                <SafeImg
                  src={src}
                  alt={`${title} ${i + 2}`}
                  className="w-full h-36 object-cover"
                />
              </div>
            ))}
            {images.length <= 1 && (
              <>
                <div className="rounded-xl h-36 bg-white/5 border border-white/10" />
                <div className="rounded-xl h-36 bg-white/5 border border-white/10" />
              </>
            )}
          </div>
        </div>

        {/* Main */}
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          {/* Left: Specs & Features */}
          <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-yellow-400" />
              Key Specs
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <Stat icon={<FaCarSide className="opacity-80" />} label="Body" value={car.body_type} />
              <Stat icon={<FaGasPump className="opacity-80" />} label="Fuel" value={car.fuel_type} />
              <Stat icon={<FaCogs className="opacity-80" />} label="Transmission" value={car.transmission} />
              <Stat icon={<FaRoad className="opacity-80" />} label="Drivetrain" value={car.drivetrain} />
              <Stat icon={<FaUsers className="opacity-80" />} label="Seats" value={car.seats} />
              <Stat
                icon={<FaCalendarAlt className="opacity-80" />}
                label="Mileage"
                value={
                  typeof car.mileage_km === "number"
                    ? `${car.mileage_km.toLocaleString()} km`
                    : "—"
                }
              />
            </div>

            {/* Engine */}
            <h3 className="text-lg font-semibold mt-6 flex items-center gap-2">
              <FaCogs className="text-yellow-400" />
              Engine
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3 text-sm">
              {car.engine?.type === "EV" ? (
                <>
                  <Stat label="Motor" value={`${car.engine?.power_kw ?? "—"} kW`} />
                  <Stat label="Horsepower" value={`${car.engine?.horsepower ?? "—"} hp`} />
                  <Stat label="Torque" value={`${car.engine?.torque_nm ?? "—"} Nm`} />
                </>
              ) : (
                <>
                  <Stat label="Displacement" value={`${car.engine?.displacement_l ?? "—"} L`} />
                  <Stat label="Turbo" value={car.engine?.turbo ? "Yes" : "No"} />
                  <Stat label="Horsepower" value={`${car.engine?.horsepower ?? "—"} hp`} />
                  <Stat label="Torque" value={`${car.engine?.torque_nm ?? "—"} Nm`} />
                </>
              )}
            </div>

            {/* Features */}
            <h3 className="text-lg font-semibold mt-6 flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              Features
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {(car.features || []).length ? (
                (car.features || []).map((f) => (
                  <span
                    key={f}
                    className="text-xs text-white/90 bg-white/10 border border-white/10 px-2.5 py-1 rounded-full"
                  >
                    {f}
                  </span>
                ))
              ) : (
                <span className="text-sm text-white/60">No features listed.</span>
              )}
            </div>
          </div>

          {/* Right: Sidebar */}
          <aside className="w-full md:w-80 shrink-0">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white">
              <div className="text-2xl font-bold flex items-center gap-2">
                <FaMoneyBillWave className="text-yellow-400" />
                {format(car.price_bdt)}
              </div>
              <div className="mt-2 text-sm text-white/80">Seller: {car.seller_type}</div>
              <div className="mt-1 text-sm text-white/80">
                Safety (est.): {car.safety_rating_est}★
              </div>
              <div className="mt-1 text-sm text-white/80">Listed: {car.listed_at}</div>

              <button className="mt-4 w-full bg-yellow-400 text-gray-900 py-3 rounded-xl font-semibold hover:opacity-90 transition">
                Contact Seller
              </button>

              <div className="mt-3">
                <AdminUpdateButton carId={car._id} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
