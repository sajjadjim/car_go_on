'use client';
import { addNewCar } from '@/app/actions/car_action/addNewCar';
import React, { useState } from 'react';


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

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const features = (form.getAll('features') ?? []);
    const images = String(form.get('images') || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      make: form.get('make'),
      model: form.get('model'),
      trim: form.get('trim') || 'Base',
      year: Number(form.get('year')),
      body_type: form.get('body_type'),
      fuel_type: form.get('fuel_type'),
      transmission: form.get('transmission'),
      drivetrain: form.get('drivetrain'),
      price_bdt: Number(form.get('price_bdt')),
      mileage_km: Number(form.get('mileage_km') || 0),
      seats: Number(form.get('seats') || 5),
      color_exterior: form.get('color_exterior') || 'Unknown',
      color_interior: form.get('color_interior') || 'Unknown',
      features,
      images,
      location: {
        city: form.get('city') || 'Dhaka',
        country: form.get('country') || 'Bangladesh'
      },
      seller_type: form.get('seller_type') || 'Dealer',
      safety_rating_est: Number(form.get('safety_rating_est') || 4),
      listed_at: new Date().toISOString().slice(0,10),
    };

    // very light client validation
    if (!payload.make || !payload.model || !payload.year || !payload.price_bdt) {
      setMsg({ type: 'error', text: 'Please fill Make, Model, Year, and Price.' });
      setLoading(false);
      return;
    }

    try {
    //   const res = await fetch('/api/cars', {
    //     method: 'POST',
    //     headers: { 'Content-Type':'application/json' },
    //     body: JSON.stringify(payload),
    //   });
    //   const data = await res.json();
    //   if (!res.ok) throw new Error(data?.error || 'Failed to add car');

    //   setMsg({ type: 'success', text: 'Car added successfully!' });
   const data = await addNewCar(payload);


      e.currentTarget.reset();
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold">New Car Details</h1>
        <p className="text-slate-600 mt-1">Fill in the details below to list a new car.</p>

        {msg && (
          <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            msg.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <section className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Make *</label>
                  <input list="make-list" name="make" required className="w-full border rounded-xl px-3 py-2" placeholder="e.g., Honda" />
                  <datalist id="make-list">{MAKES.map(m=> <option key={m} value={m} />)}</datalist>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Model *</label>
                  <input name="model" required className="w-full border rounded-xl px-3 py-2" placeholder="e.g., Civic" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Trim</label>
                  <input name="trim" className="w-full border rounded-xl px-3 py-2" placeholder="Base / Sport / Premium" />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1">Year *</label>
                  <input name="year" type="number" min="1990" max="2026" required className="w-full border rounded-xl px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Body Type</label>
                  <select name="body_type" className="w-full border rounded-xl px-3 py-2">
                    {BODY_TYPES.map(b=> <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Seats</label>
                  <input name="seats" type="number" min="2" max="9" className="w-full border rounded-xl px-3 py-2" defaultValue={5} />
                </div>
              </div>
            </div>

            {/* Powertrain */}
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-4">Powertrain</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Fuel Type</label>
                  <select name="fuel_type" className="w-full border rounded-xl px-3 py-2">
                    {FUEL_TYPES.map(f=> <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Transmission</label>
                  <select name="transmission" className="w-full border rounded-xl px-3 py-2">
                    {TRANSMISSIONS.map(t=> <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Drivetrain</label>
                  <select name="drivetrain" className="w-full border rounded-xl px-3 py-2">
                    {DRIVETRAINS.map(d=> <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Mileage (km)</label>
                  <input name="mileage_km" type="number" min="0" className="w-full border rounded-xl px-3 py-2" placeholder="e.g., 35600" />
                </div>
              </div>
            </div>

            {/* Pricing & Colors */}
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-4">Pricing & Colors</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-slate-600 mb-1">Price (BDT) *</label>
                  <input name="price_bdt" type="number" min="0" required className="w-full border rounded-xl px-3 py-2" placeholder="e.g., 2196150" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Exterior Color</label>
                  <input name="color_exterior" className="w-full border rounded-xl px-3 py-2" placeholder="White" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Interior Color</label>
                  <input name="color_interior" className="w-full border rounded-xl px-3 py-2" placeholder="Black" />
                </div>
              </div>
            </div>

            {/* Media & Features */}
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-4">Media & Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Image URLs (comma-separated)</label>
                  <input
                    name="images"
                    className="w-full border rounded-xl px-3 py-2"
                    placeholder="https://..., https://..., https://..."
                  />
                  <p className="text-xs text-slate-500 mt-1">Paste up to 3–5 URLs, separated by commas.</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Features</label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-auto border rounded-xl p-3">
                    {FEATURES.map(f => (
                      <label key={f} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" name="features" value={f} className="accent-black" /> {f}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right column */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-4">Location & Seller</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">City</label>
                  <input name="city" className="w-full border rounded-xl px-3 py-2" placeholder="Dhaka" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Country</label>
                  <input name="country" className="w-full border rounded-xl px-3 py-2" placeholder="Bangladesh" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-slate-600 mb-1">Seller Type</label>
                  <select name="seller_type" className="w-full border rounded-xl px-3 py-2">
                    {SELLER_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-slate-600 mb-1">Safety Rating (est.)</label>
                  <input name="safety_rating_est" type="number" min="1" max="5" step="0.1" className="w-full border rounded-xl px-3 py-2" defaultValue={4.5} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl text-white font-semibold ${loading ? 'bg-gray-500' : 'bg-black hover:bg-gray-900'}`}
              >
                {loading ? 'Adding…' : 'Add Car'}
              </button>
              <p className="text-xs text-slate-500 mt-2">
                By submitting, you confirm the details are accurate. You can edit later from your dashboard.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
