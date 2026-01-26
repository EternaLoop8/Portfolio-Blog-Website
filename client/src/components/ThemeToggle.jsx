import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // Optional: npm install lucide-react

const ThemeToggle = () => {
  // 1. Initialize state based on localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // 2. Update the <html> class and localStorage whenever isDark changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative flex items-center justify-center w-10 h-10 rounded-full 
                 bg-slate-200 dark:bg-slate-800 transition-all duration-300 
                 hover:ring-2 ring-blue-500/50 group overflow-hidden"
      aria-label="Toggle Theme"
    >
      {/* Sun Icon (shown in light mode) */}
      <div className={`absolute transform transition-all duration-500 ${
        isDark ? "translate-y-12 opacity-0" : "translate-y-0 opacity-100"
      }`}>
        <Sun className="w-6 h-6 text-amber-500" />
      </div>

      {/* Moon Icon (shown in dark mode) */}
      <div className={`absolute transform transition-all duration-500 ${
        isDark ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
      }`}>
        <Moon className="w-6 h-6 text-blue-400" />
      </div>

      {/* Subtle background glow effect */}
      <span className="absolute inset-0 bg-white/10 dark:bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};

export default ThemeToggle;
