"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FaCalculator,
  FaMoneyBillWave,
  FaCarSide,
  FaMotorcycle,
  FaPercentage,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { formatBDPrice, formatBDT } from "@/lib/vehicleUtils";

const BD_BANKS = [
  { name: "City Bank Auto Loan", rate: 10.5, maxTenure: 60 },
  { name: "BRAC Bank Vehicle Loan", rate: 11.0, maxTenure: 60 },
  { name: "Eastern Bank Ltd (EBL)", rate: 10.75, maxTenure: 60 },
  { name: "IDLC Auto & Bike Loan", rate: 11.5, maxTenure: 60 },
  { name: "Dhaka Bank Auto Finance", rate: 11.0, maxTenure: 48 },
];

export default function LoanCalculatorPage() {
  const [vehicleType, setVehicleType] = useState("car"); // "car" | "bike"
  const [price, setPrice] = useState(vehicleType === "car" ? 3450000 : 535000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [interestRate, setInterestRate] = useState(11.0);
  const [tenureMonths, setTenureMonths] = useState(36);

  // Switch defaults when vehicle type changes
  const handleTypeChange = (type) => {
    setVehicleType(type);
    if (type === "car") {
      setPrice(3450000);
      setTenureMonths(48);
    } else {
      setPrice(535000);
      setTenureMonths(24);
    }
  };

  const downPaymentAmount = useMemo(() => {
    return Math.round((price * downPaymentPercent) / 100);
  }, [price, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return Math.max(0, price - downPaymentAmount);
  }, [price, downPaymentAmount]);

  const { monthlyEMI, totalInterest, totalPayment } = useMemo(() => {
    if (loanAmount <= 0 || tenureMonths <= 0) {
      return { monthlyEMI: 0, totalInterest: 0, totalPayment: 0 };
    }
    const r = interestRate / 100 / 12;
    const n = tenureMonths;
    const emi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const total = emi * n;
    const interest = total - loanAmount;

    return {
      monthlyEMI: isNaN(emi) ? 0 : emi,
      totalInterest: isNaN(interest) ? 0 : interest,
      totalPayment: isNaN(total) ? 0 : total,
    };
  }, [loanAmount, interestRate, tenureMonths]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaCalculator /> Bangladesh Auto & Bike Finance
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Vehicle Loan & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">EMI Calculator</span>
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            Calculate accurate monthly installments (EMI) based on current Bangladesh bank loan interest rates for cars and motorcycles.
          </p>
        </div>

        {/* Vehicle Type Switcher */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 flex items-center">
            <button
              onClick={() => handleTypeChange("car")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition ${
                vehicleType === "car"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FaCarSide size={16} /> Car Loan EMI
            </button>
            <button
              onClick={() => handleTypeChange("bike")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition ${
                vehicleType === "bike"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FaMotorcycle size={16} /> Bike Loan EMI
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Price Input */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <FaMoneyBillWave className="text-emerald-400" /> Vehicle Price (BDT)
                </label>
                <span className="text-emerald-400 font-bold text-base">
                  {formatBDPrice(price)}
                </span>
              </div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-lg focus:outline-none focus:border-emerald-500"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {(vehicleType === "car"
                  ? [2000000, 3000000, 4500000, 7000000]
                  : [150000, 250000, 450000, 600000]
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrice(p)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                  >
                    {formatBDPrice(p)}
                  </button>
                ))}
              </div>
            </div>

            {/* Down Payment */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-white">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-amber-400 font-bold">
                  {formatBDPrice(downPaymentAmount)} ({formatBDT(downPaymentAmount)})
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>10% (Min)</span>
                <span>30% (Standard)</span>
                <span>70% (Max)</span>
              </div>
            </div>

            {/* Interest Rate & Tenure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                <label className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <FaPercentage className="text-emerald-400" /> Bank Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                <label className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <FaCalendarAlt className="text-amber-400" /> Loan Tenure (Months)
                </label>
                <select
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value={12}>12 Months (1 Year)</option>
                  <option value={24}>24 Months (2 Years)</option>
                  <option value={36}>36 Months (3 Years)</option>
                  <option value={48}>48 Months (4 Years)</option>
                  <option value={60}>60 Months (5 Years)</option>
                </select>
              </div>
            </div>

            {/* Bank Rates Comparison */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-3">
                Current Bangladesh Auto Loan Benchmark Rates
              </span>
              <div className="space-y-2 text-xs">
                {BD_BANKS.map((b) => (
                  <div
                    key={b.name}
                    onClick={() => setInterestRate(b.rate)}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 hover:bg-slate-800/80 cursor-pointer border border-slate-800 transition"
                  >
                    <span className="text-slate-300 font-medium">{b.name}</span>
                    <span className="text-emerald-400 font-bold">{b.rate}% p.a.</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl sticky top-6">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 block mb-1">
                Estimated Monthly Installment
              </span>
              <div className="text-4xl md:text-5xl font-black text-white mt-1">
                ৳{monthlyEMI.toLocaleString()}
                <span className="text-sm font-normal text-slate-400"> / month</span>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Vehicle Price:</span>
                  <span className="font-bold text-white">{formatBDT(price)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Down Payment ({downPaymentPercent}%):</span>
                  <span className="font-bold text-amber-400">{formatBDT(downPaymentAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Principal Loan Amount:</span>
                  <span className="font-bold text-white">{formatBDT(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Bank Interest:</span>
                  <span className="font-bold text-rose-400">{formatBDT(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-800 font-bold">
                  <span className="text-slate-200">Total Payable over {tenureMonths} mo:</span>
                  <span className="text-emerald-400 text-base">{formatBDT(totalPayment + downPaymentAmount)}</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  href={vehicleType === "car" ? "/cars" : "/bikes"}
                  className="w-full text-center block py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 transition"
                >
                  Browse {vehicleType === "car" ? "Cars" : "Bikes"} in this Budget
                </Link>

                <p className="text-[11px] text-slate-500 text-center">
                  * Final loan approval and interest rates depend on individual bank terms and credit evaluation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
