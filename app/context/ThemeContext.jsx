"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "system", // "system" | "dark" | "light"
  resolvedTheme: "dark", // "dark" | "light"
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system");
  const [resolvedTheme, setResolvedTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("cargoon_theme") || "system";
      setTheme(stored);
    } catch {
      setTheme("system");
    }
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyCurrentTheme = () => {
      let active = "dark";
      if (theme === "dark") {
        active = "dark";
      } else if (theme === "light") {
        active = "light";
      } else {
        // "system": automatic device mode
        active = mediaQuery.matches ? "dark" : "light";
      }

      setResolvedTheme(active);

      const root = document.documentElement;
      if (active === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        root.setAttribute("data-theme", "dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.setAttribute("data-theme", "light");
        root.style.colorScheme = "light";
      }
    };

    applyCurrentTheme();

    // Listen to OS / device dark/light mode toggle
    const handleDeviceThemeChange = () => {
      if (theme === "system") {
        applyCurrentTheme();
      }
    };

    mediaQuery.addEventListener("change", handleDeviceThemeChange);
    return () => mediaQuery.removeEventListener("change", handleDeviceThemeChange);
  }, [theme, mounted]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem("cargoon_theme", newTheme);
    } catch {
      // ignore
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
