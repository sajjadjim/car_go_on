// app/components/EditCarForm.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCarSide,
  FaRegCalendarAlt,
  FaCogs,
  FaGasPump,
  FaPalette,
  FaMoneyBillWave,
  FaImages,
  FaListUl,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const BODY_TYPES = ["Sedan","Hatchback","SUV","Crossover","Coupe","Wagon","Pickup"];
const FUEL_TYPES = ["Petrol","Diesel","Hybrid","CNG","Electric"];
const TRANSMISSIONS = ["Automatic","Manual","CVT","DCT"];
const DRIVETRAINS = ["FWD","RWD","AWD"];

export default function EditCarForm({ initialCar }) {
  const router = useRouter();

  const [car, setCar] = useState(() => ({
    ...initialCar,
    images: (initialCar.images ?? []).join(", "),
    features: (initialCar.features ?? []).join(", "),
    city: initialCar.location?.city ?? "",
    country: initialCar.location?.country ?? "",
  }));

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  // derived data
  const imageList = useMemo(
    () =>
      String(car.images || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 8),
    [car.images]
  );

  const featureList = useMemo(
    () =>
      String(car.features || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 40),
    [car.features]
  );

  // local helpers
  const update = (field, value) => setCar((prev) => ({ ...prev, [field]: value }));
  const toNumber = (v, def = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : def;
  };

  const removeFeature = (idx) => {
    const next = featureList.filter((_, i) => i !== idx);
    update("features", next.join(", "));
  };

  const addFeatureQuick = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const f = String(form.get("newFeature") || "").trim();
    if (!f) return;
    const next = [...featureList, f];
    update("features", next.join(", "));
    e.currentTarget.reset();
  };

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    const payload = {
      make: car.make,
      model: car.model,
      trim: car.trim,
      year: toNumber(car.year),
      body_type: car.body_type,
      fuel_type: car.fuel_type,
      transmission: car.transmission,
      drivetrain: car.drivetrain,
      mileage_km: toNumber(car.mileage_km),
      seats: toNumber(car.seats, 5),
      color_exterior: car.color_exterior,
      color_interior: car.color_interior,
      price_bdt: toNumber(car.price_bdt),
      safety_rating_est: Number(car.safety_rating_est ?? 0),
      images: imageList,
      features: featureList,
      location: { city: car.city || "", country: car.country || "" },
    };

    if (!payload.make || !payload.model || !payload.year || !payload.price_bdt) {
      setMsg({ type: "error", text: "Make, Model, Year and Price (BDT) are required." });
      setSaving(false);
      return;
    }

    try {
      const id = initialCar._id || initialCar.id;
      const res = await fetch(`/api/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : { raw: await res.text() };

      if (!res.ok) throw new Error(data?.error || "Update failed");
      setMsg({ type: "success", text: "Car updated successfully!" });
      setTimeout(() => router.push(`/cars/${id}`), 750);
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-1">
      <form
        onSubmit={onSubmit}
        className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 md:p-6 text-white space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/10 border border-white/10">
            <FaCarSide className="text-yellow-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Edit Car</h2>
            <p className="text-sm text-white/70">Update the fields below and save your changes.</p>
          </div>
        </div>

        {/* Alert */}
        {msg && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm border ${
              msg.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-200"
                : "bg-red-500/10 border-red-500/30 text-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {msg.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
              <span>{msg.text}</span>
            </div>
          </div>
        )}

        {/* BASIC */}
        <Section title="Basic Information" icon={<FaRegCalendarAlt className="text-yellow-400" />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Make *" value={car.make || ""} onChange={(e) => update("make", e.target.value)} required />
            <Field label="Model *" value={car.model || ""} onChange={(e) => update("model", e.target.value)} required />
            <Field label="Trim" value={car.trim || ""} onChange={(e) => update("trim", e.target.value)} />

            <Field
              label="Year *"
              type="number"
              value={car.year || ""}
              onChange={(e) => update("year", e.target.value)}
              min={1990}
              max={2026}
              required
            />
            <Select
              label="Body Type"
              value={car.body_type || ""}
              onChange={(e) => update("body_type", e.target.value)}
              options={BODY_TYPES}
            />
            <Field
              label="Seats"
              type="number"
              value={car.seats ?? 5}
              onChange={(e) => update("seats", e.target.value)}
              min={2}
              max={9}
            />
          </div>
        </Section>

        {/* POWERTRAIN */}
        <Section title="Powertrain" icon={<FaCogs className="text-yellow-400" />}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              label="Fuel"
              value={car.fuel_type || ""}
              onChange={(e) => update("fuel_type", e.target.value)}
              options={FUEL_TYPES}
            />
            <Select
              label="Transmission"
              value={car.transmission || ""}
              onChange={(e) => update("transmission", e.target.value)}
              options={TRANSMISSIONS}
            />
            <Select
              label="Drivetrain"
              value={car.drivetrain || ""}
              onChange={(e) => update("drivetrain", e.target.value)}
              options={DRIVETRAINS}
            />
            <Field
              label="Mileage (km)"
              type="number"
              value={car.mileage_km ?? 0}
              onChange={(e) => update("mileage_km", e.target.value)}
              min={0}
            />
          </div>
        </Section>

        {/* PRICING & COLORS */}
        <Section title="Pricing & Colors" icon={<FaMoneyBillWave className="text-yellow-400" />}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field
              label="Price (BDT) *"
              type="number"
              value={car.price_bdt ?? 0}
              onChange={(e) => update("price_bdt", e.target.value)}
              required
              min={0}
              hint="Enter market-accurate price in Bangladeshi Taka"
            />
            <div>
              <Label text="Exterior Color" />
              <div className="flex gap-2">
                <Input
                  value={car.color_exterior || ""}
                  onChange={(e) => update("color_exterior", e.target.value)}
                  placeholder="White"
                />
                <Swatch />
              </div>
            </div>
            <div>
              <Label text="Interior Color" />
              <div className="flex gap-2">
                <Input
                  value={car.color_interior || ""}
                  onChange={(e) => update("color_interior", e.target.value)}
                  placeholder="Black"
                />
                <Swatch />
              </div>
            </div>
            <Field
              label="Safety (est.)"
              type="number"
              step="0.1"
              value={car.safety_rating_est ?? 4.5}
              onChange={(e) => update("safety_rating_est", e.target.value)}
              min={1}
              max={5}
            />
          </div>
        </Section>

        {/* MEDIA & FEATURES */}
        <Section title="Media & Features" icon={<FaImages className="text-yellow-400" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Images */}
            <div>
              <Label text="Image URLs (comma-separated)" />
              <Input
                value={car.images || ""}
                onChange={(e) => update("images", e.target.value)}
                placeholder="https://..., https://..., https://..."
              />
              <p className="text-xs text-white/60 mt-1">
                Paste up to 3–8 URLs. Broken links will show faded previews.
              </p>

              {imageList.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {imageList.map((src, i) => (
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

            {/* Features */}
            <div>
              <div className="flex items-center justify-between">
                <Label text="Features (comma-separated)" />
                <span className="text-xs text-white/60">
                  <FaListUl className="inline mr-1" />
                  {featureList.length} selected
                </span>
              </div>

              <Input
                value={car.features || ""}
                onChange={(e) => update("features", e.target.value)}
                placeholder="ABS, Airbags, Rear Camera"
              />

              {/* Quick add chip */}
              <form onSubmit={addFeatureQuick} className="mt-2 flex items-center gap-2">
                <input
                  name="newFeature"
                  className="flex-1 rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
                  placeholder="Type a feature & press Enter"
                />
              </form>

              {/* Chips */}
              {featureList.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {featureList.map((f, i) => (
                    <span
                      key={`${f}-${i}`}
                      className="inline-flex items-center gap-2 text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1"
                    >
                      {f}
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="hover:text-yellow-400"
                        title="Remove"
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <p className="text-xs text-white/60 mt-2 flex items-start gap-2">
                <FaInfoCircle className="mt-0.5 shrink-0" />
                <span>
                  Tip: Include safety and comfort features (e.g., ABS, Airbags, CarPlay/Android Auto, Cruise Control).
                </span>
              </p>
            </div>
          </div>
        </Section>

        {/* LOCATION */}
        <Section title="Location" icon={<FaPalette className="rotate-90 text-yellow-400" />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="City" value={car.city || ""} onChange={(e) => update("city", e.target.value)} />
            <Field label="Country" value={car.country || ""} onChange={(e) => update("country", e.target.value)} />
            <Field label="Mileage (km)" type="number" value={car.mileage_km ?? 0} onChange={(e) => update("mileage_km", e.target.value)} />
          </div>
        </Section>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row gap-3">
          <button
            type="submit"
            disabled={saving}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition ${
              saving
                ? "bg-white/20 text-white/60 cursor-not-allowed"
                : "bg-yellow-400 text-gray-900 hover:opacity-90"
            }`}
          >
            <FaSave />
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => history.back()}
            className="px-5 py-3 rounded-xl border border-white/15 hover:bg-white/10 transition"
          >
            Cancel
          </button>
        </div>

        <p className="text-xs text-white/60 flex items-start gap-2">
          <FaInfoCircle className="mt-0.5 shrink-0" />
          <span>
            Double-check price, year, and images. You can return to this page to edit again anytime.
          </span>
        </p>
      </form>
    </div>
  );
}

/* ---------- small UI atoms ---------- */

function Section({ title, icon, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4 text-white">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Label({ text }) {
  return <span className="block text-sm text-white/70 mb-1">{text}</span>;
}

function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60 ${props.className || ""}`}
    />
  );
}

function Field({ label, hint, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <Label text={label} />
      <Input {...props} />
      {hint && <p className="text-xs text-white/60 mt-1">{hint}</p>}
    </label>
  );
}

function Select({ label, options = [], className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <Label text={label} />
      <select
        {...props}
        className="w-full rounded-xl border border-white/10 bg-black/30 text-white px-3 py-2 outline-none focus:border-yellow-400/60"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Swatch() {
  return (
    <div className="p-2 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
      <FaPalette />
    </div>
  );
}
