"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ThemeToggle from "../components/ThemeToggle";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/* Verified evidence — do not invent */
const projects = [
  {
    title: "Nextera Workforce",
    tag: "Employee management & scheduling",
    repo: "https://github.com/ggogogohub/nextera-workforce.co.uk",
    tech: ["React", "TypeScript", "FastAPI", "MongoDB", "Docker", "OR-Tools"],
    summary: "Workforce operations system with optimization logic and scalable architecture.",
    note: "Evidence: repo verified; backend behaviour only where repo documents it.",
  },
  {
    title: "Media Gallery",
    tag: "Cloud-native media sharing",
    repo: "https://github.com/ggogogohub/Media-Gallery",
    tech: ["React", "Vite", "Azure Blob Storage", "Cosmos DB", "Logic Apps"],
    summary: "Uploading, previewing and managing images, video and audio with REST API support.",
    note: "Verified architecture from repository.",
  },
  {
    title: "eBay Used Cars",
    tag: "Used-car listing platform",
    repo: "https://github.com/ggogogohub/eBay-Used-Cars",
    tech: ["Angular 17", "Flask", "MongoDB", "JWT", "Bootstrap"],
    summary: "Authentication, advanced search and structured inventory workflows.",
    note: "Evidence: repo verified; technologies matched to listed stack.",
  },
];

/* Verified academic evidence */
const achievements = [
  { num: "01", title: "Paul Hanna Award", body: "Recipient of the School of Computing's Paul Hanna Award, certified by the Dean of QAHE (ULST) Limited." },
  { num: "02", title: "First-Class BSc", body: "Bachelor of Science with first class honours in Computing Systems, conferred by the University of Ulster (10 December 2025)." },
  { num: "03", title: "Broad computing record", body: "Strong performance across data analytics, cloud-native development, databases, networking, software process, and applied development." },
];

/* Signature interaction — 4 steps explaining Media Gallery architecture */
export default function RootPage() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 0.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(onTick); lenis.destroy(); };
  }, []);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".hero-line", { y: "110%", opacity: 0 }, { y: "0%", opacity: 1, duration: 1, stagger: 0.12, delay: 0.1 })
      .fromTo(".hero-sub", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .fromTo(".hero-cta", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.4");
  }, { scope: container });

  return (
    <main ref={container} className="relative w-full bg-[var(--background)] text-[var(--foreground)]" suppressHydrationWarning>
      {/* ===== HERO ===== */}
      <section className="relative z-10 min-h-[92svh] md:min-h-[100svh] w-full px-6 md:px-12 lg:px-16 pt-10 md:pt-12 pb-16 md:pb-24 flex flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-end gap-4 text-[11px] md:text-xs uppercase tracking-[0.15em] text-[var(--muted)]" aria-label="Primary">
          <div className="flex items-center gap-6 md:gap-8">
            <a href="#work" className="hover:text-[var(--accent)] transition-colors">Work</a>
            <a href="#about" className="hover:text-[var(--accent)] transition-colors">About</a>
            <a href="#contact" className="hover:text-[var(--accent)] transition-colors">Contact</a>
            <div className="ml-2" aria-label="Theme selection">
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Hero content: asymmetric */}
        <div className="mt-10 md:mt-14 lg:mt-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Left: identity + value */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 lg:pr-8">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              <span className="inline-block w-6 h-[1px] bg-[var(--accent)]" />
              <span>London, UK — Computing Graduate</span>
            </div>

            <h1 className="text-[clamp(3rem,14vw,9rem)] leading-[0.88] tracking-[-0.06em] font-display text-[var(--ink)]">
              <span className="hero-line block overflow-hidden"><span className="block">Sonu</span></span>
              <span className="hero-line block overflow-hidden"><span className="block">Thakur</span></span>
            </h1>

            <div className="max-w-xl">
              <p className="hero-sub text-2xl md:text-[1.75rem] lg:text-[2rem] leading-snug text-[var(--ink)] font-light tracking-[-0.02em]">
                Complex problems.<br />
                <span className="text-[var(--muted)] font-normal">Clear systems.</span>
              </p>
              <p className="hero-sub mt-3 text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-md">
                I build full-stack and cloud-native software with practical workflows and clear technical decisions.
              </p>
            </div>

            <div className="hero-cta flex flex-wrap gap-3 mt-2">
              <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-white px-6 py-3 text-sm font-medium tracking-tight hover:brightness-110 transition shadow-[0_4px_24px_rgba(107,127,94,0.25)]">
                Explore my work
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-transparent text-[var(--ink)] px-6 py-3 text-sm font-medium tracking-tight hover:border-[var(--accent)] hover:text-[var(--accent)] transition">
                Get in touch
              </a>
            </div>
          </div>

          {/* Featured project visual */}
          <aside className="lg:col-span-5 lg:pl-4 lg:-mt-6" aria-label="Featured project visual">
            <div className="card-surface p-6 md:p-8 shadow-[0_40px_120px_rgba(0,0,0,0.08)] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <span className="step-marker" />
                <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">Featured system</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display tracking-[-0.04em] mb-3">Media Gallery</h2>
              <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed mb-6">
                A simple upload. A system behind it. Four steps explain the verified architecture: upload interface, Azure Blob Storage, Cosmos DB + Logic Apps, and returned preview.
              </p>

              <a href="#signature" className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-[var(--accent)] hover:underline underline-offset-4">
                See both systems &rarr;
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== SELECTED PROJECTS ===== */}
      <section id="work" className="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28 bg-[var(--surface)] border-y border-[var(--line)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-4 mb-14 md:mb-20">
            <span className="step-marker mt-1" />
            <div>
              <h2 className="text-4xl md:text-6xl font-display tracking-[-0.05em] leading-[0.92]">Selected work.</h2>
              <p className="mt-3 text-base md:text-lg text-[var(--muted)] max-w-lg">Applications built around practical problems.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {projects.map((p) => (
              <article key={p.title} className="group flex flex-col card-surface p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.15em] text-[var(--accent)] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{p.tag}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display tracking-[-0.03em] mb-2 group-hover:text-[var(--accent)] transition-colors">{p.title}</h3>
                <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed mb-5">{p.summary}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[var(--panel-strong)] text-[var(--muted)] border border-[var(--line)]">{t}</span>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-[var(--line)] flex items-center justify-between gap-3">
                  <a href={p.repo} className="text-sm font-medium text-[var(--ink)] underline underline-offset-4 decoration-[var(--line)] hover:decoration-[var(--accent)]" rel="noopener noreferrer">View repository →</a>
                  <span className="text-[11px] text-[var(--muted)]">{p.note}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ===== ABOUT + EVIDENCE ===== */}
      <section id="about" className="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28 bg-[var(--surface)] border-y border-[var(--line)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="flex items-start gap-4 mb-6">
              <span className="step-marker mt-1" />
              <h2 className="text-4xl md:text-5xl font-display tracking-[-0.05em] leading-[0.92]">About.</h2>
            </div>
            <div className="space-y-5 text-base md:text-lg leading-relaxed text-[var(--ink)]">
              <p>Sonu Thakur — First-Class BSc (Hons) Computing Systems graduate from the University of Ulster, London. Paul Hanna Award recipient.</p>
              <p>Primary focus: full-stack and cloud-native development with practical AI-assisted workflows. Not interested in decorative dashboards — interested in systems that can be explained under pressure.</p>
              <p>Based in London, UK. Seeking graduate, junior and internship technology opportunities.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://github.com/ggogogohub" className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-white px-5 py-2.5 text-sm font-medium hover:brightness-110 transition" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/thakur-sonu" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:badshasonu020@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition">Email</a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h3 className="text-sm uppercase tracking-[0.15em] text-[var(--muted)] mb-6">Verified academic evidence</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {achievements.map((a) => (
                <article key={a.num} className="card-surface p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="text-3xl font-display text-[var(--accent)] mb-2">{a.num}</div>
                  <h4 className="text-base font-display font-medium mb-2 tracking-tight">{a.title}</h4>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{a.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 p-6 md:p-8 rounded-2xl bg-[var(--panel-strong)] border border-[var(--line)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <h4 className="text-sm uppercase tracking-[0.15em] text-[var(--muted)] mb-4 font-medium">Module performance (verified)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[ ["84", "Data Analytics"], ["80", "Full-stack Strategies"], ["78", "Cloud Native Development"], ["86", "Mathematics for Computing"], ["78", "Database Systems"], ["76", "Software Product & Process"] ].map(([n, label]) => (
                  <div key={label} className="flex items-baseline gap-2 text-sm">
                    <span className="font-display text-xl text-[var(--ink)]">{n}</span>
                    <span className="text-[var(--muted)]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES (contextual, not pill lists) ===== */}
      <section id="capabilities" className="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28" aria-label="Capabilities">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-10 md:mb-14">
            <span className="step-marker mt-1" />
            <h2 className="text-4xl md:text-5xl font-display tracking-[-0.05em] leading-[0.92]">Capabilities.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Cloud-native development", body: "Azure Blob Storage, Cosmos DB, Docker, Logic Apps — evidenced through Media Gallery architecture.", link: "https://github.com/ggogogohub/Media-Gallery" },
              { title: "Full-stack engineering", body: "React / TypeScript / FastAPI / Flask / MongoDB / Angular 17 — used across Nextera and eBay Used Cars.", link: "https://github.com/ggogogohub/nextera-workforce.co.uk" },
              { title: "Data & analytics", body: "Data Analytics (84), Cloud Native Development (78), Database Systems (78) — verified module scores.", link: "#about" },
              { title: "Systems security awareness", body: "JWT authentication, structured inventory workflows, documented technical decisions — not decorative claims.", link: "https://github.com/ggogogohub/eBay-Used-Cars" },
            ].map((cap) => (
              <a key={cap.title} href={cap.link} className="group card-surface p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition border-transparent hover:border-[var(--accent-soft)]">
                <h3 className="text-xl md:text-2xl font-display tracking-[-0.03em] mb-3 group-hover:text-[var(--accent)] transition-colors">{cap.title}</h3>
                <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed mb-4">{cap.body}</p>
                <span className="text-sm font-medium text-[var(--ink)] underline underline-offset-4 decoration-[var(--line)] group-hover:decoration-[var(--accent)]">Evidence →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28 bg-[var(--surface)] border-y border-[var(--line)] text-[var(--ink)]" aria-label="Contact">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-6xl font-display tracking-[-0.05em] leading-[0.92] mb-6">Let's build clearly.</h2>
              <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-md">
                Graduate, junior and internship roles in London and the UK. Full-stack, cloud-native, AI-assisted systems. Honest evidence over loud claims.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a href="mailto:badshasonu020@gmail.com" className="inline-flex items-center gap-3 rounded-xl bg-[var(--background)] border border-[var(--line)] px-6 py-4 hover:border-[var(--accent-soft)] transition">
                <span className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-sm font-bold">E</span>
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[var(--muted)]">Email</div>
                  <div className="font-display text-lg">badshasonu020@gmail.com</div>
                </div>
              </a>
              <a href="https://github.com/ggogogohub" className="inline-flex items-center gap-3 rounded-xl bg-[var(--background)] border border-[var(--line)] px-6 py-4 hover:border-[var(--accent-soft)] transition" rel="noopener noreferrer">
                <span className="w-10 h-10 rounded-full bg-[var(--ink)] text-white flex items-center justify-center text-sm font-bold">G</span>
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[var(--muted)]">GitHub</div>
                  <div className="font-display text-lg">ggogogohub</div>
                </div>
              </a>
              <a href="https://linkedin.com/in/thakur-sonu" className="inline-flex items-center gap-3 rounded-xl bg-[var(--background)] border border-[var(--line)] px-6 py-4 hover:border-[var(--accent-soft)] transition" rel="noopener noreferrer">
                <span className="w-10 h-10 rounded-full bg-[var(--ink)] text-white flex items-center justify-center text-sm font-bold">L</span>
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[var(--muted)]">LinkedIn</div>
                  <div className="font-display text-lg">thakur-sonu</div>
                </div>
              </a>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-[var(--line)] flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-[var(--muted)]">
            <span className="font-display text-lg text-[var(--ink)]">Let's build something that matters.</span>
            <div className="flex gap-3">
              <a href="mailto:badshasonu020@gmail.com" className="underline underline-offset-4 hover:text-[var(--accent)] transition">Email</a>
              <a href="https://github.com/ggogogohub" className="underline underline-offset-4 hover:text-[var(--accent)] transition" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/thakur-sonu" className="underline underline-offset-4 hover:text-[var(--accent)] transition" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 px-6 md:px-12 lg:px-16 py-8 text-[11px] text-[var(--muted)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3" aria-label="Footer">
        <span>Sonu Thakur — Computing Graduate, London</span>
        <span className="text-[10px] opacity-60">Portfolio — 2026</span>
      </footer>
    </main>
  );
}
