// app/components/EditCarForm.jsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const BODY_TYPES = ["Sedan","Hatchback","SUV","Crossover","Coupe","Wagon","Pickup"];
const FUEL_TYPES = ["Petrol","Diesel","Hybrid","CNG","Electric"];
const TRANSMISSIONS = ["Automatic","Manual","CVT","DCT"];
const DRIVETRAINS = ["FWD","RWD","AWD"];

export default function EditCarForm({ initialCar }) {
  const router = useRouter();

  const [car, setCar] = useState({
    ...initialCar,
    images: (initialCar.images ?? []).join(", "),
    features: (initialCar.features ?? []).join(", "),
    city: initialCar.location?.city ?? "",
    country: initialCar.location?.country ?? "",
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const update = (field, value) => setCar(prev => ({ ...prev, [field]: value }));
  const toNumber = (v, def = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : def;
  };

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    // Build PATCH payload (what you want to $set server-side)
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
      images: String(car.images || "").split(",").map(s => s.trim()).filter(Boolean),
      features: String(car.features || "").split(",").map(s => s.trim()).filter(Boolean),
      location: { city: car.city || "", country: car.country || "" },
    };

    // Basic validation
    if (!payload.make || !payload.model || !payload.year || !payload.price_bdt) {
      setMsg({ type: "error", text: "Make, Model, Year and Price (BDT) are required." });
      setSaving(false);
      return;
    }

    try {
      const id = initialCar._id || initialCar.id; // _id from URL/API
      const res = await fetch(`/api/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // parse safely
      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : { raw: await res.text() };

      if (!res.ok) throw new Error(data?.error || "Update failed");

      setMsg({ type: "success", text: "Car updated successfully!" });
      setTimeout(() => router.push(`/cars/${id}`), 700);
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border p-5 shadow-sm space-y-5">
      {msg && (
        <div className={`rounded-xl border px-4 py-3 text-sm ${
          msg.type === 'success'
            ? 'bg-green-50 border-green-200 text-green-700'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Make" value={car.make} onChange={e=>update("make", e.target.value)} required />
        <Field label="Model" value={car.model} onChange={e=>update("model", e.target.value)} required />
        <Field label="Trim" value={car.trim ?? ""} onChange={e=>update("trim", e.target.value)} />

        <Field label="Year" type="number" value={car.year} onChange={e=>update("year", e.target.value)} required />
        <Select label="Body Type" value={car.body_type} onChange={e=>update("body_type", e.target.value)} options={BODY_TYPES} />
        <Field label="Seats" type="number" value={car.seats ?? 5} onChange={e=>update("seats", e.target.value)} />

        <Select label="Fuel" value={car.fuel_type} onChange={e=>update("fuel_type", e.target.value)} options={FUEL_TYPES} />
        <Select label="Transmission" value={car.transmission} onChange={e=>update("transmission", e.target.value)} options={TRANSMISSIONS} />
        <Select label="Drivetrain" value={car.drivetrain} onChange={e=>update("drivetrain", e.target.value)} options={DRIVETRAINS} />

        <Field label="Mileage (km)" type="number" value={car.mileage_km ?? 0} onChange={e=>update("mileage_km", e.target.value)} />
        <Field label="Price (BDT)" type="number" value={car.price_bdt ?? 0} onChange={e=>update("price_bdt", e.target.value)} required />
        <Field label="Safety (est.)" type="number" step="0.1" value={car.safety_rating_est ?? 4.5} onChange={e=>update("safety_rating_est", e.target.value)} />

        <Field label="Exterior Color" value={car.color_exterior ?? ""} onChange={e=>update("color_exterior", e.target.value)} />
        <Field label="Interior Color" value={car.color_interior ?? ""} onChange={e=>update("color_interior", e.target.value)} />

        <Field label="City" value={car.city} onChange={e=>update("city", e.target.value)} />
        <Field label="Country" value={car.country} onChange={e=>update("country", e.target.value)} />

        <Field label="Images (comma-separated)" value={car.images} onChange={e=>update("images", e.target.value)} className="md:col-span-3" />
        <Field label="Features (comma-separated)" value={car.features} onChange={e=>update("features", e.target.value)} className="md:col-span-3" />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className={`px-5 cursor-pointer py-3 rounded-xl text-white ${saving ? 'bg-gray-500' : 'bg-black hover:bg-gray-900'}`}>
          {saving ? "Saving…" : "Save Changes"}
        </button>
        <button type="button" onClick={()=>history.back()} className="px-5 cursor-pointer py-3 rounded-xl border">Cancel</button>
      </div>
    </form>
  );
}

function Field({ label, className="", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm text-gray-600 mb-1">{label}</span>
      <input {...props} className={`w-full border rounded-xl px-3 py-2 ${props.className || ""}`} />
    </label>
  );
}

function Select({ label, options=[], ...props }) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-600 mb-1">{label}</span>
      <select {...props} className="w-full border rounded-xl px-3 py-2">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
