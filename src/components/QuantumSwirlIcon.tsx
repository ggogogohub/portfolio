"use client";

import { useEffect, useRef } from "react";

/**
 * Quantum Swirl nav icon — a live canvas of orbiting dots with a gentle
 * teardrop streak, tuned to sit quietly in the nav at icon scale.
 *
 * Adapts the Originkit effect to a 44px nav glyph:
 *  - transparent background (no card, no ring — blends with any theme)
 *  - theme-aware colors resolved from CSS variables at mount + on theme change
 *  - reduced motion: single static frame, no rAF loop
 */

const TAU = Math.PI * 2;

function frac(v: number): number {
  return v - Math.floor(v);
}

function lerpN(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function cumBump(x: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return x - Math.sin(TAU * x) / TAU;
}

function hash01(i: number, k: number): number {
  let h = (Math.imul(i + 1, 374761393) + Math.imul(k + 1, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

interface Dot {
  th: number;
  b: number;
  rj: number;
  sp: number;
  ph: number;
  kv: number;
  sz: number;
}

interface Pt {
  x: number;
  y: number;
}

function buildDots(n: number): Dot[] {
  const out: Dot[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      th: hash01(i, 0) * TAU,
      b: Math.pow(hash01(i, 1), 0.7),
      rj: (hash01(i, 2) - 0.5) * 0.04,
      sp: hash01(i, 3) * 1.25 - 1,
      ph: hash01(i, 4) * TAU,
      kv: hash01(i, 5),
      sz: hash01(i, 6),
    });
  }
  out.sort((a, c) => a.b * (0.5 + a.sz) - c.b * (0.5 + c.sz));
  return out;
}

function hexToRgb(hex: string, fallback: [number, number, number]): [number, number, number] {
  const s = hex.trim();
  if (s[0] === "#") {
    const h = s.slice(1);
    if (h.length === 3) {
      return [
        parseInt(h[0] + h[0], 16) / 255,
        parseInt(h[1] + h[1], 16) / 255,
        parseInt(h[2] + h[2], 16) / 255,
      ];
    }
    if (h.length === 6) {
      return [
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255,
      ];
    }
    if (h.length === 8 && hex.toLowerCase().startsWith("#ff")) {
      const v = parseInt(h.slice(0, 6), 16);
      return [(v >> 16 & 255) / 255, (v >> 8 & 255) / 255, (v & 255) / 255];
    }
  }
  return fallback;
}

/** Resolve the current theme's accent colors from document CSS variables. */
function resolveColors(): [string, string] {
  if (typeof document === "undefined") return ["#6b7f5e", "#8aa07a"];
  const get = (name: string, fallback: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  return [get("--accent", "#6b7f5e"), get("--accent-soft", "#8aa07a")];
}

export default function QuantumSwirlIcon() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!root || !canvas || !ctx) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = Math.max(1, Math.round(root.offsetWidth * dpr));
      canvas.height = Math.max(1, Math.round(root.offsetHeight * dpr));
    };
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize();

    const W = () => root.offsetWidth;
    const H = () => root.offsetHeight;

    // Nav-icon scale: ~140 dots is plenty at 44px; rings span 55%–95% of the glyph.
    const dots = buildDots(140);
    const unit = Math.max(W(), H());
    const half = unit / 2;

    // Compose the swirl when a dot's phase angle is inside the progress fraction.
    const drawFrame = (clock: number, progress: number) => {
      const w = W(), h = H();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const [cLow, cHigh] = resolveColors();
      const low = hexToRgb(cLow, [0x6b / 255, 0x7f / 255, 0x5e / 255]);
      const high = hexToRgb(cHigh, [0x8a / 255, 0xa0 / 255, 0x7a / 255]);

      const cx = w / 2, cy = h / 2;
      const T = 3.0; // 3s full cycle
      const rIn = 0.55 * half;
      const rOut = 0.92 * half;
      const spreadIn = 0.24 * half;
      const spreadOut = 0.05 * half;
      const spin = (90 * Math.PI) / 180 / T; // gentle rotation over the cycle
      const kick = Math.PI / 12; // soft kick

      const shown = Math.max(0, Math.min(1, progress));

      for (let i = 0; i < dots.length; i++) {
        if (i / dots.length > shown) continue;
        const d = dots[i];
        const t = clock;
        const u = frac(t / T);
        const tk = t + 0.15;
        const kc = Math.floor(tk / T) + cumBump(frac(tk / T) * (1100 / 3000) * 2.72);
        const th = d.th + spin * t + kick * (1 + 0.6 * (d.kv * 2 - 1)) * kc;
        const off = d.sp < 0 ? d.sp * spreadIn : d.sp * 4 * spreadOut;
        const r = Math.max(0.05, lerpN(rIn, rOut, d.b) + d.rj + off) * (1 + 0.06 * Math.sin(u * TAU));
        const x = cx + r * Math.cos(th);
        const y = cy + r * Math.sin(th);

        const rad = Math.max(0.6, lerpN(1.1, 3.4, d.b) * (1 + 0.6 * (d.sz * 2 - 1)));

        // Color flows between the two accent hues across the ring.
        const mix = lerpN(0.36, 1.0, d.b);
        const rr = lerpN(low[0], high[0], mix);
        const gg = lerpN(low[1], high[1], mix);
        const bb = lerpN(low[2], high[2], mix);

        // Teardrop streak along the direction of motion.
        const vx = Math.cos(th + spin * 0.035) * r * (spin * 0.035 + 0.01);
        const vy = Math.sin(th + spin * 0.035) * r * (spin * 0.035 + 0.01);
        const L = Math.min(rad * 3, Math.hypot(vx, vy) * 40);
        ctx.fillStyle = `rgb(${Math.round(rr * 255)}, ${Math.round(gg * 255)}, ${Math.round(bb * 255)})`;
        ctx.beginPath();
        if (L > rad * 1.25) {
          const a = Math.atan2(-vy, -vx);
          const beta = Math.acos(Math.min(1, rad / L));
          ctx.moveTo(x + Math.cos(a) * L, y + Math.sin(a) * L);
          ctx.arc(x, y, rad, a + beta, a + TAU - beta, false);
          ctx.closePath();
        } else {
          ctx.arc(x, y, rad, 0, TAU);
        }
        ctx.fill();
      }
    };

    const drawStatic = () => {
      // One calm mid-frame — everything visible, no motion.
      drawFrame(1.2, 1);
    };

    if (reduced) {
      drawStatic();
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = -1;
    let clock = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = last < 0 ? 0 : Math.min((now - last) / 1000, 1 / 30);
      last = now;
      clock += dt;
      // Blend toward fully drawn over the first ~0.6s, then stay.
      const shown = Math.min(1, clock / 0.6);
      drawFrame(clock, shown);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative w-10 h-10 md:w-11 md:h-11 shrink-0"
      role="img"
      aria-label="Sonu Thakur — logo"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ background: "transparent" }}
      />
    </div>
  );
}