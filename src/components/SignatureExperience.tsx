"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import MediaGalleryDiagram from "./MediaGalleryDiagram";
import NexteraDiagram from "./NexteraDiagram";

type ProjectDef = {
  id: string;
  name: string;
  purpose: string;
  tech: string[];
  repo: string;
  live?: string;
  diagram: React.ReactNode;
  engineeringDecision: string;
  tradeoff: string;
};

const PROJECTS: ProjectDef[] = [
  {
    id: "nextera",
    name: "Nextera Workforce",
    purpose: "Employee management and scheduling with optimization logic and scalable architecture.",
    tech: ["React", "TypeScript", "FastAPI", "MongoDB", "Docker", "OR-Tools"],
    repo: "https://github.com/ggogogohub/nextera-workforce.co.uk",
    live: "https://nextera-workforce-co-uk.vercel.app/",
    diagram: <NexteraDiagram />,
    engineeringDecision: "Use OR-Tools for constraint-based scheduling rather than hard-coded rules, allowing the sistem to adapt to workforce changes.",
    tradeoff: "OR-Tools adds computational overhead and requires careful constraint modeling — acceptable for this scale, but not optimal for real-time streaming.",
  },
  {
    id: "media",
    name: "Media Gallery",
    purpose: "Cloud-native media sharing for uploading, previewing and managing images, video and audio.",
    tech: ["React", "Vite", "Azure Blob Storage", "Cosmos DB", "Logic Apps"],
    repo: "https://github.com/ggogogohub/Media-Gallery",
    diagram: <MediaGalleryDiagram />,
    engineeringDecision: "Use Azure Logic Apps for orchestration rather than a custom server, reducing maintenance and aligning with cloud-native positioning.",
    tradeoff: "Logic Apps have cold-start latency and execution-based pricing — acceptable for this scale, not ideal for high-throughput streaming.",
  },
];

export default function SignatureExperience() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [transition, setTransition] = useState(false);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const goTo = useCallback((i: number) => {
    if (i === active) return;
    setTransition(true);
    setTimeout(() => {
      setActive(i);
      setTransition(false);
    }, 600);
  }, [active]);

  const next = useCallback(() => {
    goTo((active + 1) % PROJECTS.length);
  }, [active, goTo]);

  // Auto-rotate timer
  useEffect(() => {
    if (playing && !prefersReduced) {
      timerRef.current = window.setInterval(() => next(), 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, prefersReduced, next]);

  // Pause on focus inside container (accessibility)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onFocus = () => setPlaying(false);
    el.addEventListener("focusin", onFocus);
    return () => el.removeEventListener("focusin", onFocus);
  }, []);

  // Pause on hover / touch interaction
  const pauseOnInteraction = useCallback(() => setPlaying(false), []);

  const project = PROJECTS[active];

  return (
    <section
      ref={containerRef}
      id="signature"
      className="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28"
      aria-label="Featured systems — how they work"
      onPointerEnter={pauseOnInteraction}
      onPointerLeave={() => { /* do not auto-resume — user must click */ }}
      onTouchStart={pauseOnInteraction}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start gap-4 mb-10 md:mb-14">
          <span className="step-marker mt-1" aria-hidden />
          <div>
            <h2 className="text-4xl md:text-6xl font-display tracking-[-0.05em] leading-[0.92]">
              How the systems work.
            </h2>
            <p className="mt-3 text-base md:text-lg text-[var(--muted)] max-w-xl">
              Two verified projects. One shared architecture explanation. Select, pause, or let it rotate.
            </p>
          </div>
        </div>

        {/* Project selector + controls */}
        <div className="flex flex-wrap items-center gap-3 mb-8" role="group" aria-label="Project selection">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setPlaying(false);
                goTo(i);
              }}
              aria-pressed={i === active}
              className={`rounded-full px-4 py-2 text-sm font-medium transition border ${
                i === active
                  ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-[0_4px_16px_rgba(107,127,94,0.25)]"
                  : "bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent-soft)] hover:text-[var(--ink)]"
              }`}
            >
              {p.name}
            </button>
          ))}
          <div className="w-px h-6 bg-[var(--line)] mx-1" aria-hidden />
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause automatic rotation" : "Resume automatic rotation"}
            className="rounded-full px-3 py-2 text-sm font-medium bg-[var(--surface)] border border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent-soft)] transition"
          >
            {playing ? "Pause" : "Resume"}
          </button>
        </div>

        {/* Active indication */}
        <div className="flex items-center gap-3 mb-6 text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" aria-hidden />
          <span aria-live="polite" aria-atomic="true">
            {project.name} — {project.id === "nextera" ? "Live demo verified" : "Repository verified"}
          </span>
        </div>

        {/* Main experience — crossfade */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 transition-opacity duration-500 ${
            transition ? "opacity-40" : "opacity-100"
          }`}
          aria-live="polite"
        >
          {/* Left: name + purpose */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl font-display tracking-[-0.03em] leading-tight">{project.name}</h3>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">{project.purpose}</p>

            {/* Technology tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map((t) => (
                <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[var(--panel-strong)] text-[var(--muted)] border border-[var(--line)]">{t}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-2">
              <a
                href={project.repo}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-white px-5 py-2.5 text-sm font-medium hover:brightness-110 transition"
                rel="noopener noreferrer"
              >
                Repository →
              </a>
              {project.live && (
                <a
                  href={project.live}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-transparent text-[var(--ink)] px-5 py-2.5 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
                  rel="noopener noreferrer"
                >
                  Live demo →
                </a>
              )}
            </div>
          </div>

          {/* Right: diagram + explanation */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="card-surface p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
                <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">Verified architecture</span>
              </div>
              <div className="mb-4">{project.diagram}</div>
              <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
                {project.engineeringDecision}
              </p>
              <div className="divider-line my-4" />
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                <strong className="text-[var(--ink)] font-medium">Trade-off:</strong> {project.tradeoff}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom manual navigation for accessibility */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => {
              setPlaying(false);
              goTo((active - 1 + PROJECTS.length) % PROJECTS.length);
            }}
            aria-label="Previous project"
            className="rounded-full w-10 h-10 flex items-center justify-center border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition bg-[var(--surface)]"
          >
            ←
          </button>
          <button
            onClick={() => {
              setPlaying(false);
              goTo((active + 1) % PROJECTS.length);
            }}
            aria-label="Next project"
            className="rounded-full w-10 h-10 flex items-center justify-center border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition bg-[var(--surface)]"
          >
            →
          </button>
          <span className="text-xs text-[var(--muted)] ml-2" aria-hidden>
            {active + 1} / {PROJECTS.length}
          </span>
        </div>
      </div>
    </section>
  );
}
