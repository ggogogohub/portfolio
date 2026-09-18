"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    title: "Nextera Workforce",
    category: "AI Scheduling Platform",
    description:
      "Employee management and scheduling system focused on practical workforce operations, optimization logic, and scalable product architecture.",
    impact: "AI-assisted rota planning",
    stack: ["React", "TypeScript", "FastAPI", "MongoDB", "Docker", "OR-Tools"],
    year: "Current",
    link: "https://github.com/ggogogohub/nextera-workforce.co.uk.git",
    linkLabel: "GitHub",
  },
  {
    title: "eBay Used Cars",
    category: "Marketplace System",
    description:
      "Used-car listing platform with authentication, advanced search, and a structured backend for inventory-style data workflows.",
    impact: "Search-led commerce UX",
    stack: ["Angular 17", "Flask", "MongoDB", "JWT", "Bootstrap"],
    year: "2025",
    link: "https://github.com/ggogogohub/eBay-Used-Cars.git",
    linkLabel: "GitHub",
  },
  {
    title: "Media Gallery",
    category: "Azure Cloud-Native App",
    description:
      "Cloud-native media sharing platform for uploading, previewing, and managing images, videos, and audio with Azure Blob Storage, Cosmos DB metadata, and Logic Apps APIs.",
    impact: "Azure-backed media workflows",
    stack: ["React", "Vite", "Azure Blob Storage", "Cosmos DB", "Logic Apps", "CSS"],
    year: "2025",
    link: "https://github.com/ggogogohub/Media-Gallery.git",
    linkLabel: "GitHub",
  },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Skip the pinned horizontal scroll for reduced-motion users. The
      // motion-reduce: classes below restack the panels vertically so all
      // three projects remain reachable via native scroll.
      if (
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      // Skip the pin on narrow viewports too. On short/landscape phones the
      // pinned horizontal track clips the (tall, single-column) cards behind
      // the section's overflow-hidden with no way to scroll to them, and the
      // pin+smooth-scroll combo is a lag/focus-trap risk on touch. The max-md:
      // classes below restack the panels vertically — identical to the
      // reduced-motion path — so every project stays fully reachable via
      // native scroll on mobile. Desktop (>= md) keeps the horizontal pin.
      if (
        typeof window !== "undefined" &&
        window.matchMedia?.("(max-width: 767px)").matches
      ) {
        return;
      }

      const sections = gsap.utils.toArray(".gallery-panel");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.25,
          end: () => `+=${wrapperRef.current ? wrapperRef.current.offsetWidth : 1000}`,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="h-[100svh] w-full relative overflow-hidden flex items-center border-y border-white/10 bg-[#050505] motion-reduce:h-auto motion-reduce:overflow-visible max-md:h-auto max-md:overflow-visible max-md:py-20 overflow-x-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,61,0,0.18),transparent_32rem),radial-gradient(circle_at_80%_50%,rgba(125,249,255,0.08),transparent_30rem)]" />
      <div className="absolute top-8 left-6 md:left-12 pointer-events-none font-sans tracking-[0.32em] uppercase text-[10px] text-white/60">
        Selected systems // horizontal archive
      </div>
      <div className="absolute bottom-8 right-6 md:right-12 pointer-events-none font-sans tracking-[0.32em] uppercase text-[10px] text-white/60 max-md:hidden">
        Scroll to traverse
      </div>

      <div ref={wrapperRef} className="relative z-10 flex h-[76svh] items-center w-[300vw] motion-reduce:w-screen motion-reduce:flex-col motion-reduce:h-auto max-md:w-screen max-md:flex-col max-md:h-auto max-md:gap-10">
        {projects.map((project, i) => (
          <article
            key={project.title}
            className="gallery-panel h-full w-screen flex flex-col justify-center px-6 md:px-24 flex-shrink-0 max-md:h-auto max-md:py-10 md:py-6"
          >
            <div className="max-w-[980px] glass-panel rounded-[2rem] md:rounded-[3rem] p-7 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.32em] text-[var(--accent-soft)]">
                  [{String(i + 1).padStart(2, "0")}] — {project.category}
                </span>
                <div className="flex items-center gap-4">
                  <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.32em] text-white/60">
                    {project.year}
                  </span>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
                    >
                      {project.linkLabel}
                    </a>
                  ) : null}
                </div>
              </div>

              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" className="group block mb-7">
                  <h2 className="text-[14vw] md:text-[6.2vw] font-display leading-[0.86] tracking-[-0.07em] uppercase text-balance transition-colors group-hover:text-[var(--gold)]">
                    {project.title}
                  </h2>
                </a>
              ) : (
                <h2 className="text-[14vw] md:text-[6.2vw] font-display leading-[0.86] tracking-[-0.07em] uppercase mb-7 text-balance">
                  {project.title}
                </h2>
              )}

              <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-14 items-end">
                <div>
                  <p className="font-sans text-base md:text-xl text-white/62 max-w-[680px] leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/55"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-l border-white/12 pl-5 md:pl-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-3">Signal</p>
                  <p className="font-display text-2xl md:text-4xl leading-none tracking-[-0.05em] text-[var(--gold)]">
                    {project.impact}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
