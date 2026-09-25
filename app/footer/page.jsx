"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCar,
  FaMotorcycle,
  FaShieldAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-emerald-400 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center gap-0.5">
                <FaCar className="text-amber-400 text-sm" />
                <FaMotorcycle className="text-emerald-400 text-xs" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-white tracking-tight">
                CarGo<span className="text-amber-400">ON</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-slate-950">
                BD
              </span>
            </div>
          </Link>

          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Bangladesh’s trusted vehicle marketplace for buying and selling cars and bikes. Verified Bangladeshi market prices, transparent specifications, BRTA registration verification, and direct seller contact.
          </p>

          <div className="flex items-center gap-3 text-lg text-slate-400 pt-1">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 hover:text-blue-400 hover:bg-slate-800 transition">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 hover:text-pink-400 hover:bg-slate-800 transition">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 hover:text-red-500 hover:bg-slate-800 transition">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Cars in Bangladesh */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
            <FaCar className="text-amber-400" /> Popular Cars BD
          </h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/cars" className="hover:text-amber-400 transition">Toyota Premio (30-36 Lakh)</Link></li>
            <li><Link href="/cars" className="hover:text-amber-400 transition">Toyota Allion (31-35 Lakh)</Link></li>
            <li><Link href="/cars" className="hover:text-amber-400 transition">Corolla Axio Hybrid (20-25 Lakh)</Link></li>
            <li><Link href="/cars" className="hover:text-amber-400 transition">Honda Vezel RS (28-33 Lakh)</Link></li>
            <li><Link href="/cars" className="hover:text-amber-400 transition">Toyota Noah 7-Seater (38-45 Lakh)</Link></li>
            <li><Link href="/cars" className="hover:text-amber-400 transition">Toyota Harrier & Prado (65L+)</Link></li>
          </ul>
        </div>

        {/* Bikes in Bangladesh */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
            <FaMotorcycle className="text-emerald-400" /> Popular Bikes BD
          </h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/bikes" className="hover:text-emerald-400 transition">Yamaha R15M V4 (৳6.05 Lakh)</Link></li>
            <li><Link href="/bikes" className="hover:text-emerald-400 transition">Royal Enfield Classic 350 (৳4.95 Lakh)</Link></li>
            <li><Link href="/bikes" className="hover:text-emerald-400 transition">Yamaha MT-15 V2 (৳5.35 Lakh)</Link></li>
            <li><Link href="/bikes" className="hover:text-emerald-400 transition">Suzuki Gixxer SF ABS (৳3.35 Lakh)</Link></li>
            <li><Link href="/bikes" className="hover:text-emerald-400 transition">Bajaj Pulsar N160 (৳2.65 Lakh)</Link></li>
            <li><Link href="/bikes" className="hover:text-emerald-400 transition">TVS Apache RTR 160 4V (৳2.28 Lakh)</Link></li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
            BD Support & Hubs
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-amber-400 shrink-0" />
              <span>+880 1712-345678 (9am-9pm)</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-amber-400 shrink-0" />
              <span>support@cargoon.com.bd</span>
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-amber-400 mt-0.5 shrink-0" />
              <span>Tejgaon Commercial Area & Banani, Dhaka, Bangladesh</span>
            </li>
            <li className="pt-2">
              <Link
                href="/calculator"
                className="inline-block py-1.5 px-3 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 text-xs font-semibold hover:border-amber-400/50 transition"
              >
                🧮 Bank EMI Calculator →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          © {new Date().getFullYear()} CarGoON BD. Designed for Bangladesh Vehicle Market. All Rights Reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/filter" className="hover:text-slate-400">Advanced Filter</Link>
          <Link href="/showrooms" className="hover:text-slate-400">BD Showrooms</Link>
          <Link href="/calculator" className="hover:text-slate-400">EMI Calculator</Link>
          <Link href="/addCar" className="hover:text-slate-400">Sell Vehicle</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
