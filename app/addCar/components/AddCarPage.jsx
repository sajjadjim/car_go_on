"use client";

import React, { useMemo, useState } from "react";
import { addNewCar } from "@/app/actions/car_action/addNewCar";
import {
  FaCarSide,
  FaCogs,
  FaGasPump,
  FaPalette,
  FaRegCalendarAlt,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaImages,
  FaListUl,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

const MAKES = ["Toyota","Honda","Nissan","Hyundai","Kia","Mazda","Mitsubishi","Ford","Volkswagen","Suzuki"];
const BODY_TYPES = ["Sedan","Hatchback","SUV","Crossover","Coupe","Wagon","Pickup"];
const FUEL_TYPES = ["Petrol","Diesel","Hybrid","CNG","Electric"];
const TRANSMISSIONS = ["Automatic","Manual","CVT","DCT"];
const DRIVETRAINS = ["FWD","RWD","AWD"];
const SELLER_TYPES = ["Dealer","Individual","Certified Dealer"];
const FEATURES = [
  "ABS","Airbags","Rear Camera","Parking Sensors","Cruise Control","Lane Assist","Blind Spot Monitor",
  "Apple CarPlay","Android Auto","Bluetooth","Keyless Entry","Push Start","Sunroof","Leather Seats",
  "Heated Seats","Auto Headlights","Tyre Pressure Monitor","ESP","ISOFIX","Navigation"
];

export default function AddCarPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [imageInput, setImageInput] = useState("");
  const [featuresPicked, setFeaturesPicked] = useState(new Set());

  const imagePreviews = useMemo(() => {
    return imageInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5);
  }, [imageInput]);

  const featuresCount = featuresPicked.size;

  function toggleFeature(v) {
    setFeaturesPicked((prev) => {
      const next = new Set(prev);
      next.has(v) ? next.delete(v) : next.add(v);
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const features = (form.getAll("features") ?? []);
    const images = String(form.get("images") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      make: form.get("make"),
      model: form.get("model"),
      trim: form.get("trim") || "Base",
      year: Number(form.get("year")),
      body_type: form.get("body_type"),
      fuel_type: form.get("fuel_type"),
      transmission: form.get("transmission"),
      drivetrain: form.get("drivetrain"),
      price_bdt: Number(form.get("price_bdt")),
      mileage_km: Number(form.get("mileage_km") || 0),
      seats: Number(form.get("seats") || 5),
      color_exterior: form.get("color_exterior") || "Unknown",
      color_interior: form.get("color_interior") || "Unknown",
      features,
      images,
      location: {
        city: form.get("city") || "Dhaka",
        country: form.get("country") || "Bangladesh",
      },
      seller_type: form.get("seller_type") || "Dealer",
      safety_rating_est: Number(form.get("safety_rating_est") || 4),
      listed_at: new Date().toISOString().slice(0, 10),
    };

    if (!payload.make || !payload.model || !payload.year || !payload.price_bdt) {
      setMsg({ type: "error", text: "Please fill Make, Model, Year, and Price." });
      setLoading(false);
      return;
    }

    try {
      await addNewCar(payload);
      setMsg({ type: "success", text: "Car added successfully!" });
      e.currentTarget.reset();
      setImageInput("");
      setFeaturesPicked(new Set());
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 text-white/90">
          <div className="p-2 rounded-xl bg-white/10 border border-white/10">
            <FaCarSide className="text-yellow-400" size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">List a New Car</h1>
            <p className="text-sm text-white/70">
              Fill in the details below to publish your listing.
            </p>
          </div>
        </div>

        {/* Alert */}
        {msg && (
          <div
            className={`mt-5 rounded-2xl px-4 py-3 text-sm border backdrop-blur ${
              msg.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-200"
                : "bg-red-500/10 border-red-500/30 text-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {msg.type === "success" ? (
                <FaCheckCircle className="shrink-0" />
              ) : (
                <FaTimesCircle className="shrink-0" />
              )}
              <span>{msg.text}</span>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left column */}
          <section className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white">
              <div className="flex items-center gap-2 mb-4">
                <FaRegCalendarAlt className="text-yellow-400" />
                <h2 className="text-lg font-semibold">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-1">Make *</label>
                  <input
                    list="make-list"
                    name="make"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                    placeholder="e.g., Honda"
                  />
                  <datalist id="make-list">
                    {MAKES.map((m) => (
                      <option key={m} value={m} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1">Model *</label>
                  <input
                    name="model"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                    placeholder="e.g., Civic"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1">Trim</label>
                  <input
                    name="trim"
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                    placeholder="Base / Sport / Premium"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1">Year *</label>
                  <input
                    name="year"
                    type="number"
                    min="1990"
                    max="2026"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1">Body Type</label>
                  <select
                    name="body_type"
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                  >
                    {BODY_TYPES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1">Seats</label>
                  <input
                    name="seats"
                    type="number"
                    min="2"
                    max="9"
                    defaultValue={5}
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                  />
                </div>
              </div>
            </div>

            {/* Powertrain */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white">
              <div className="flex items-center gap-2 mb-4">
                <FaCogs className="text-yellow-400" />
                <h2 className="text-lg font-semibold">Powertrain</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-1">Fuel Type</label>
                  <select
                    name="fuel_type"
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                  >
                    {FUEL_TYPES.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1">Transmission</label>
                  <select
                    name="transmission"
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                  >
                    {TRANSMISSIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1">Drivetrain</label>
                  <select
                    name="drivetrain"
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                  >
                    {DRIVETRAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1">Mileage (km)</label>
                  <input
                    name="mileage_km"
                    type="number"
                    min="0"
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                    placeholder="e.g., 35600"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Colors */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white">
              <div className="flex items-center gap-2 mb-4">
                <FaMoneyBillWave className="text-yellow-400" />
                <h2 className="text-lg font-semibold">Pricing & Colors</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-white/70 mb-1">Price (BDT) *</label>
                  <input
                    name="price_bdt"
                    type="number"
                    min="0"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                    placeholder="e.g., 2196150"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1">Exterior Color</label>
                  <div className="flex gap-2">
                    <input
                      name="color_exterior"
                      className="flex-1 rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                      placeholder="White"
                    />
                    <div className="p-2 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <FaPalette />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-1">Interior Color</label>
                  <div className="flex gap-2">
                    <input
                      name="color_interior"
                      className="flex-1 rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                      placeholder="Black"
                    />
                    <div className="p-2 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <FaPalette />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Media & Features */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white">
              <div className="flex items-center gap-2 mb-4">
                <FaImages className="text-yellow-400" />
                <h2 className="text-lg font-semibold">Media & Features</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-1">
                    Image URLs (comma-separated)
                  </label>
                  <input
                    name="images"
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                    placeholder="https://..., https://..., https://..."
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                  />
                  <p className="text-xs text-white/60 mt-1">
                    Paste up to 3–5 URLs, separated by commas.
                  </p>

                  {/* Live preview */}
                  {imagePreviews.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {imagePreviews.map((src, i) => (
                        <div
                          key={i}
                          className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10 bg-black/30"
                          title={src}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt={`preview-${i}`}
                            className="w-full h-full object-cover"
                            onError={(ev) => (ev.currentTarget.style.opacity = "0.2")}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm text-white/70">Features</label>
                    <span className="text-xs text-white/60">
                      <FaListUl className="inline mr-1" />
                      {featuresCount} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-auto rounded-xl border border-white/10 bg-black/20 p-3">
                    {FEATURES.map((f) => (
                      <label
                        key={f}
                        className={`flex items-center gap-2 text-sm rounded-lg px-2 py-1 cursor-pointer hover:bg-white/5 ${
                          featuresPicked.has(f) ? "bg-white/10" : ""
                        }`}
                        onClick={() => toggleFeature(f)}
                      >
                        <input
                          type="checkbox"
                          name="features"
                          value={f}
                          className="accent-yellow-400"
                          checked={featuresPicked.has(f)}
                          onChange={() => {}}
                        />
                        {f}
                      </label>
                    ))}
                  </div>

                  <div className="mt-2 text-xs text-white/60 flex items-start gap-2">
                    <FaInfoCircle className="mt-0.5" />
                    <span>
                      Popular: CarPlay/Android Auto, Airbags, ABS, Rear Camera, Cruise Control.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right column */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white">
              <div className="flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className="text-yellow-400" />
                <h2 className="text-lg font-semibold">Location & Seller</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-1">City</label>
                  <input
                    name="city"
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                    placeholder="Dhaka"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Country</label>
                  <input
                    name="country"
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                    placeholder="Bangladesh"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-white/70 mb-1">Seller Type</label>
                  <select
                    name="seller_type"
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                  >
                    {SELLER_TYPES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-white/70 mb-1">
                    Safety Rating (est.)
                  </label>
                  <input
                    name="safety_rating_est"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    defaultValue={4.5}
                    className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                  />
                </div>
              </div>
            </div>

            <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <FaGasPump className="text-yellow-400" />
                <h3 className="font-semibold">Ready to publish?</h3>
              </div>
              <p className="text-sm text-white/70 mb-3">
                Make sure the price, year, and images look correct. You can edit later from your
                dashboard.
              </p>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  loading
                    ? "bg-white/20 text-white/60 cursor-not-allowed"
                    : "bg-yellow-400 text-gray-900 hover:opacity-90"
                }`}
              >
                {loading ? "Adding…" : "Add Car"}
              </button>

              <div className="mt-3 text-xs text-white/60 flex items-start gap-2">
                <FaInfoCircle className="mt-0.5" />
                <span>
                  By submitting, you confirm the details are accurate and you have the rights to
                  the images uploaded.
                </span>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
