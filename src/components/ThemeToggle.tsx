"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";

const options = [
  { key: "light", label: "Light", aria: "Choose light theme" },
  { key: "dark", label: "Dark", aria: "Choose dark theme" },
  { key: "system", label: "System", aria: "Use system theme preference" },
];

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const current = options.find((o) => o.key === theme) || options[2];

  if (!mounted) {
    return (
      <button
        aria-label="Theme settings"
        className="w-9 h-9 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--muted)] opacity-60"
        disabled
        title="Loading theme"
      >
        <span aria-hidden className="text-xs">☀</span>
      </button>
    );
  }

  return (
    <div ref={ref} className="relative inline-block" aria-label="Theme selection">
      <button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-controls="theme-menu"
        aria-label={`${current.label} theme selected — open options`}
        className="w-9 h-9 rounded-full border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition shadow-sm"
        title={`${current.label} theme`}
      >
        <span aria-hidden className="text-sm leading-none">
          {resolvedTheme === "dark" ? "◐" : resolvedTheme === "light" ? "☀" : "◐"}
        </span>
      </button>

      {open && (
        <div
          id="theme-menu"
          role="menu"
          aria-label="Theme options"
          className="absolute right-0 top-full mt-2 w-36 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden z-50"
        >
          {options.map((o) => (
            <button
              key={o.key}
              role="menuitemradio"
              aria-checked={theme === o.key}
              onClick={() => {
                setTheme(o.key);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition flex items-center gap-3 ${
                theme === o.key
                  ? "text-[var(--ink)] font-medium bg-[var(--panel-strong)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--panel-strong)]"
              }`}
            >
              <span aria-hidden className="w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0 opacity-100 transition">{theme === o.key ? "●" : "○"}</span>
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
