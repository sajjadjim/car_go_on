"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { addNewCar } from "@/app/actions/car_action/addNewCar";
import { addNewBike } from "@/app/actions/bike_action/addNewBike";
import {
  FaCarSide,
  FaMotorcycle,
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
  FaShieldAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { formatBDPrice, BD_CITIES, CAR_MAKES, BIKE_MAKES } from "@/lib/vehicleUtils";

const CAR_BODY_TYPES = ["Sedan", "SUV", "Crossover", "Hatchback", "Microbus / MPV", "Coupe", "Pickup"];
const CAR_FUEL_TYPES = ["Hybrid", "Octane", "Petrol", "Electric", "Diesel", "CNG / LPG"];
const TRANSMISSIONS = ["Automatic", "Manual", "CVT", "DCT"];
const DRIVETRAINS = ["FWD", "RWD", "AWD", "4WD"];

const BIKE_TYPES = ["Sports / Supersport", "Naked Streetfighter", "Cruiser / Modern Classic", "Commuter", "Maxi Scooter", "Cafe Racer", "Adventure Tourer"];
const BIKE_BRAKE_TYPES = ["Dual Channel ABS", "Single Channel ABS", "Front Disc & Rear Drum", "Dual Disc (Non-ABS)"];
const BIKE_COOLING_TYPES = ["Liquid Cooled", "Air-Oil Cooled", "Air Cooled"];
const BIKE_FUEL_SYSTEMS = ["Fuel Injection (Fi)", "Electronic Fuel Injection (EFI)", "Carburetor"];

const SELLER_TYPES = ["Individual", "Dealer", "Certified Dealer", "Authorized Dealer"];
const CONDITIONS = ["Reconditioned", "Brand New", "Used (Second Hand)"];

const CAR_FEATURES = [
  "Push Start & Smart Key", "Toyota Safety Sense / Honda Sensing", "Reverse Camera", "360 Camera",
  "Apple CarPlay / Android Auto", "Panoramic Sunroof", "Leather Seats", "Power Backdoor",
  "Alloy Wheels", "Dual AC", "ABS & Airbags", "Cruise Control", "Lane Keep Assist", "Blind Spot Monitor"
];

const BIKE_FEATURES = [
  "Dual Channel ABS", "Single Channel ABS", "Quickshifter", "Traction Control System (TCS)",
  "Variable Valve Actuation (VVA)", "Assist & Slipper Clutch", "Digital Color TFT Console",
  "Bluetooth Smartphone Connectivity", "LED Projector Headlight", "Tubeless Tyres",
  "Alloy Wheels", "USB Charging Socket", "Riding Modes"
];

export default function AddCarPage() {
  const [vehicleType, setVehicleType] = useState("car"); // "car" | "bike"
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [createdId, setCreatedId] = useState(null);
  const [imageInput, setImageInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [featuresPicked, setFeaturesPicked] = useState(new Set());

  const imagePreviews = useMemo(() => {
    return imageInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5);
  }, [imageInput]);

  function toggleFeature(v) {
    setFeaturesPicked((prev) => {
      const next = new Set(prev);
      next.has(v) ? next.delete(v) : next.add(v);
      return next;
    });
  }

  const activeFeaturesList = vehicleType === "car" ? CAR_FEATURES : BIKE_FEATURES;
  const activeMakesList = vehicleType === "car" ? CAR_MAKES : BIKE_MAKES;

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);
    setCreatedId(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const features = Array.from(featuresPicked);
    const images = String(form.get("images") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // Fallback image if user didn't paste URLs
    const finalImages = images.length > 0 ? images : [
      vehicleType === "car"
        ? "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop"
    ];

    const commonData = {
      make: form.get("make"),
      model: form.get("model"),
      trim: form.get("trim") || "Standard",
      year: Number(form.get("year")),
      registration_year: Number(form.get("registration_year") || form.get("year")),
      condition: form.get("condition") || "Used (Second Hand)",
      price_bdt: Number(form.get("price_bdt")),
      mileage_km: Number(form.get("mileage_km") || 0),
      color_exterior: form.get("color_exterior") || "Standard",
      features,
      images: finalImages,
      location: {
        city: form.get("city") || "Dhaka",
        area: form.get("area") || "",
        country: "Bangladesh",
      },
      brta_reg: form.get("brta_reg") || "Dhaka Metro",
      tax_token_validity: form.get("tax_token_validity") || "2026",
      seller_name: form.get("seller_name") || "Verified Seller",
      seller_phone: form.get("seller_phone") || "+8801700000000",
      seller_type: form.get("seller_type") || "Individual",
      safety_rating_est: 4.8,
      listed_at: new Date().toISOString().slice(0, 10),
    };

    if (!commonData.make || !commonData.model || !commonData.year || !commonData.price_bdt) {
      setMsg({ type: "error", text: "Please fill in Make, Model, Year, and Price." });
      setLoading(false);
      return;
    }

    try {
      if (vehicleType === "car") {
        const carPayload = {
          ...commonData,
          body_type: form.get("body_type") || "Sedan",
          fuel_type: form.get("fuel_type") || "Octane",
          transmission: form.get("transmission") || "Automatic",
          drivetrain: form.get("drivetrain") || "FWD",
          seats: Number(form.get("seats") || 5),
          color_interior: form.get("color_interior") || "Black",
          engine: {
            displacement_cc: Number(form.get("displacement_cc") || 1500),
            horsepower: Number(form.get("horsepower") || 110),
          },
        };
        const res = await addNewCar(carPayload);
        setCreatedId(res.insertedId);
        setMsg({ type: "success", text: `Your ${carPayload.make} ${carPayload.model} car listing is now live across Bangladesh!` });
      } else {
        const bikePayload = {
          ...commonData,
          bike_type: form.get("bike_type") || "Sports / Supersport",
          engine_cc: Number(form.get("engine_cc") || 155),
          cooling: form.get("cooling") || "Liquid Cooled",
          brake_type: form.get("brake_type") || "Dual Channel ABS",
          fuel_type: "Octane / Petrol",
          fuel_system: form.get("fuel_system") || "Fuel Injection (Fi)",
          mileage_kmpl: Number(form.get("mileage_kmpl") || 45),
          transmission: form.get("transmission_bike") || "6-Speed Manual",
        };
        const res = await addNewBike(bikePayload);
        setCreatedId(res.insertedId);
        setMsg({ type: "success", text: `Your ${bikePayload.make} ${bikePayload.model} motorcycle listing is now live across Bangladesh!` });
      }

      e.currentTarget.reset();
      setImageInput("");
      setPriceInput("");
      setFeaturesPicked(new Set());
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Failed to publish listing." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              100% Free Listing
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Sell Your Vehicle in Bangladesh
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Connect directly with thousands of verified car and bike buyers in Dhaka, Chittagong, Sylhet, and nationwide.
            </p>
          </div>

          {/* Vehicle Type Switcher */}
          <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 flex items-center">
            <button
              type="button"
              onClick={() => {
                setVehicleType("car");
                setFeaturesPicked(new Set());
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                vehicleType === "car"
                  ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FaCarSide size={16} /> Sell a Car
            </button>
            <button
              type="button"
              onClick={() => {
                setVehicleType("bike");
                setFeaturesPicked(new Set());
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                vehicleType === "bike"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FaMotorcycle size={16} /> Sell a Bike
            </button>
          </div>
        </div>

        {/* Success / Error Notification */}
        {msg && (
          <div
            className={`mt-6 rounded-2xl p-5 border backdrop-blur-md ${
              msg.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                : "bg-rose-500/10 border-rose-500/30 text-rose-200"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {msg.type === "success" ? (
                  <FaCheckCircle className="text-emerald-400 text-2xl shrink-0" />
                ) : (
                  <FaTimesCircle className="text-rose-400 text-2xl shrink-0" />
                )}
                <div>
                  <h4 className="font-bold">{msg.type === "success" ? "Listing Published!" : "Submission Error"}</h4>
                  <p className="text-sm mt-0.5">{msg.text}</p>
                </div>
              </div>

              {createdId && (
                <Link
                  href={vehicleType === "car" ? `/cars/${createdId}` : `/bikes/${createdId}`}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition shrink-0"
                >
                  View Listing →
                </Link>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Basic Details */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <FaRegCalendarAlt className={vehicleType === "car" ? "text-amber-400" : "text-emerald-400"} />
                <h2 className="text-lg font-bold text-white">
                  1. {vehicleType === "car" ? "Car" : "Bike"} Overview
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Brand / Manufacturer *
                  </label>
                  <input
                    list="make-options"
                    name="make"
                    required
                    placeholder={vehicleType === "car" ? "e.g. Toyota, Honda" : "e.g. Yamaha, Royal Enfield"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
                  />
                  <datalist id="make-options">
                    {activeMakesList.map((m) => (
                      <option key={m} value={m} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Model Name *
                  </label>
                  <input
                    name="model"
                    required
                    placeholder={vehicleType === "car" ? "e.g. Premio, Vezel, Axio" : "e.g. R15 V4, Classic 350, MT-15"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Trim / Edition / Package
                  </label>
                  <input
                    name="trim"
                    placeholder={vehicleType === "car" ? "e.g. F-EX, G-Plus, RS Sensing" : "e.g. Dark Edition, Tri-Color ABS"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Model Year *
                  </label>
                  <input
                    name="year"
                    type="number"
                    min="1995"
                    max="2026"
                    defaultValue={2022}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Registration Year (BD)
                  </label>
                  <input
                    name="registration_year"
                    type="number"
                    min="1995"
                    max="2026"
                    defaultValue={2023}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Vehicle Condition *
                  </label>
                  <select
                    name="condition"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition"
                  >
                    {CONDITIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Technical & Powertrain */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <FaCogs className={vehicleType === "car" ? "text-amber-400" : "text-emerald-400"} />
                <h2 className="text-lg font-bold text-white">
                  2. Technical & Powertrain Details
                </h2>
              </div>

              {vehicleType === "car" ? (
                /* Car Specific Powertrain */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Body Type</label>
                    <select
                      name="body_type"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition"
                    >
                      {CAR_BODY_TYPES.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Fuel Type</label>
                    <select
                      name="fuel_type"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition"
                    >
                      {CAR_FUEL_TYPES.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Transmission</label>
                    <select
                      name="transmission"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition"
                    >
                      {TRANSMISSIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Drivetrain</label>
                    <select
                      name="drivetrain"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition"
                    >
                      {DRIVETRAINS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Engine CC</label>
                    <input
                      name="displacement_cc"
                      type="number"
                      defaultValue={1500}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Seating Capacity</label>
                    <input
                      name="seats"
                      type="number"
                      min="2"
                      max="12"
                      defaultValue={5}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">KM Run (Odometer)</label>
                    <input
                      name="mileage_km"
                      type="number"
                      min="0"
                      placeholder="e.g. 35000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Exterior Color</label>
                    <input
                      name="color_exterior"
                      placeholder="e.g. Pearl White"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>
                </div>
              ) : (
                /* Bike Specific Powertrain */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Bike Category</label>
                    <select
                      name="bike_type"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition"
                    >
                      {BIKE_TYPES.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Engine Displacement (CC) *</label>
                    <input
                      name="engine_cc"
                      type="number"
                      required
                      placeholder="e.g. 155 or 350"
                      defaultValue={155}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Braking System</label>
                    <select
                      name="brake_type"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition"
                    >
                      {BIKE_BRAKE_TYPES.map((br) => (
                        <option key={br} value={br}>{br}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Engine Cooling</label>
                    <select
                      name="cooling"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition"
                    >
                      {BIKE_COOLING_TYPES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Fuel Supply</label>
                    <select
                      name="fuel_system"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition"
                    >
                      {BIKE_FUEL_SYSTEMS.map((fs) => (
                        <option key={fs} value={fs}>{fs}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Fuel Economy (km/l)</label>
                    <input
                      name="mileage_kmpl"
                      type="number"
                      placeholder="e.g. 45"
                      defaultValue={45}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">KM Run (Odometer)</label>
                    <input
                      name="mileage_km"
                      type="number"
                      placeholder="e.g. 12000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Gearbox / Transmission</label>
                    <input
                      name="transmission_bike"
                      defaultValue="6-Speed Manual"
                      placeholder="e.g. 6-Speed Manual / Automatic CVT"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Pricing in Bangladesh */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <FaMoneyBillWave className={vehicleType === "car" ? "text-amber-400" : "text-emerald-400"} />
                <h2 className="text-lg font-bold text-white">
                  3. Pricing & Market Value in Bangladesh
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Asking Price (BDT) *
                  </label>
                  <input
                    name="price_bdt"
                    type="number"
                    required
                    min="10000"
                    placeholder={vehicleType === "car" ? "e.g. 3450000 (34.50 Lakh)" : "e.g. 535000 (5.35 Lakh)"}
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-lg font-bold placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Enter the exact amount in Bangladeshi Taka (no commas).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs uppercase tracking-wider text-slate-500 block">
                    Bangladeshi Format Preview
                  </span>
                  <div className="text-2xl font-black text-amber-400 mt-1">
                    {priceInput ? formatBDPrice(priceInput) : "৳ 0 Lakh"}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {priceInput ? `${Number(priceInput).toLocaleString("en-BD")} BDT` : "0 BDT"}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Media & Features */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <FaImages className={vehicleType === "car" ? "text-amber-400" : "text-emerald-400"} />
                <h2 className="text-lg font-bold text-white">4. Photos & Features</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Photo URLs (comma-separated image links)
                  </label>
                  <input
                    name="images"
                    placeholder="https://images.unsplash.com/..., https://..."
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Optional: Leave blank to use authentic default Bangladeshi showcase images.
                  </p>

                  {imagePreviews.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {imagePreviews.map((url, i) => (
                        <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt={`preview ${i}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">
                    Key Features ({featuresPicked.size} selected)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {activeFeaturesList.map((f) => (
                      <button
                        type="button"
                        key={f}
                        onClick={() => toggleFeature(f)}
                        className={`text-left text-xs p-2.5 rounded-xl border transition flex items-center justify-between ${
                          featuresPicked.has(f)
                            ? "bg-amber-400/10 border-amber-400/40 text-amber-300 font-semibold"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <span>{f}</span>
                        {featuresPicked.has(f) && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Location, Seller, Submission */}
          <div className="space-y-6">
            {/* Location & Paperwork */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className={vehicleType === "car" ? "text-amber-400" : "text-emerald-400"} />
                <h3 className="font-bold text-white">Location & BRTA</h3>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">City / District *</label>
                  <select
                    name="city"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  >
                    {BD_CITIES.filter((c) => c !== "All Cities").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Area / Thana</label>
                  <input
                    name="area"
                    placeholder="e.g. Banani, Uttara, Agrabad"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">BRTA Registration Plate</label>
                  <input
                    name="brta_reg"
                    placeholder="e.g. Dhaka Metro GA-37"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Tax Token Validity</label>
                  <input
                    name="tax_token_validity"
                    placeholder="e.g. 2026 or 2027"
                    defaultValue="2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Seller Contact Info */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <FaPhoneAlt className={vehicleType === "car" ? "text-amber-400" : "text-emerald-400"} />
                <h3 className="font-bold text-white">Seller Contact</h3>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Seller Name *</label>
                  <input
                    name="seller_name"
                    required
                    placeholder="e.g. Tanvir Ahmed / Progoti Motors"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    name="seller_phone"
                    required
                    placeholder="e.g. +880 1712-345678"
                    defaultValue="+880 1712-345678"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Seller Type</label>
                  <select
                    name="seller_type"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  >
                    {SELLER_TYPES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Box */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md sticky top-6">
              <div className="flex items-center gap-2 mb-2">
                <FaShieldAlt className={vehicleType === "car" ? "text-amber-400" : "text-emerald-400"} />
                <h3 className="font-bold text-white">Publish to Bangladesh</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Your listing will be instantly visible to buyers across all 64 districts in Bangladesh with WhatsApp and direct call options.
              </p>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-slate-950 shadow-lg transition-all duration-200 ${
                  vehicleType === "car"
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-amber-400/20"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/20"
                } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? "Publishing Listing..." : `Publish ${vehicleType === "car" ? "Car" : "Bike"} Listing`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
