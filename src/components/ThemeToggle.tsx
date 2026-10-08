"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        aria-label="Theme toggle"
        className="relative w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--muted)] opacity-60 shadow-sm"
        disabled
        title="Loading theme"
      >
        <span aria-hidden className="text-sm">◐</span>
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="group relative w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--ink)] hover:text-[var(--accent)] transition shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(107,127,94,0.15)] overflow-hidden"
    >
      {/* Hover gradient ring — premium aceternity-inspired border glow */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--accent-soft)]/40 via-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
      <span aria-hidden className="relative z-10 text-base leading-none transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
        {isDark ? "☀" : "◐"}
      </span>
    </button>
  );
}
