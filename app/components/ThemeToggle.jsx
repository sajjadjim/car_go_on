"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { key: "system", label: "Device Auto", icon: <FaDesktop size={13} /> },
    { key: "light", label: "Light Mode", icon: <FaSun size={13} /> },
    { key: "dark", label: "Dark Mode", icon: <FaMoon size={13} /> },
  ];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 text-slate-200 transition flex items-center gap-1.5 text-xs font-semibold"
        title={`Current mode: ${theme} (${resolvedTheme})`}
        aria-label="Toggle theme mode"
      >
        {resolvedTheme === "dark" ? (
          <FaMoon className="text-amber-400" size={14} />
        ) : (
          <FaSun className="text-amber-500" size={14} />
        )}
        <span className="hidden xl:inline capitalize text-[11px] text-slate-300">
          {theme === "system" ? "Auto" : theme}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 backdrop-blur-md">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/80 mb-1">
            Display Mode
          </div>
          {options.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => {
                setTheme(opt.key);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition ${
                theme === opt.key
                  ? "bg-amber-400/10 text-amber-400 font-bold"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                {opt.icon}
                <span>{opt.label}</span>
              </div>
              {theme === opt.key && <span className="text-[10px]">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
