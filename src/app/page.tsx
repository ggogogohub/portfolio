"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import HorizontalGallery from "../components/HorizontalGallery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Respect the OS-level reduced-motion preference for all JS-driven motion
// (Lenis smoothing + GSAP timelines). The CSS media query in globals.css only
// reaches CSS animations/transitions, not GSAP/Lenis, so this gates them too.
const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const achievements = [
  ["01", "Paul Hanna Award", "Recipient of the School of Computing's Paul Hanna Award, certified by the Dean of QAHE (ULST) Limited."],
  ["02", "First-Class BSc", "Bachelor of Science with first class honours in Computing Systems, conferred by the University of Ulster on 10 December 2025."],
  ["03", "Broad computing record", "Strong performance across data analytics, cloud-native development, databases, networking, software process, and applied development."],
];

const academicSignals = [
  ["84", "Data Analytics"],
  ["80", "Full-stack Strategies"],
  ["78", "Cloud Native Development"],
  ["86", "Mathematics for Computing"],
  ["78", "Database Systems"],
  ["76", "Software Product & Process"],
];

const roleTargets = [
  "Graduate Software Engineer",
  "Junior Developer",
  "Technology Intern",
  "Cloud / DevOps Graduate",
  "Data / AI Graduate",
  "QA / Automation Engineer",
  "Security-aware junior roles",
  "Product-minded engineering roles",
];

const skills = [
  "Software engineering", "Cloud-native development", "Data analytics", "AI fundamentals", "Systems security", "Computer networking", "React", "Angular 17", "TypeScript", "Python", "FastAPI", "Flask", "MongoDB", "Docker", "GitHub Actions", "Laravel", "MySQL", "Problem solving", "Team leadership"
];

const principles = [
  ["Learn fast", "I do not need a narrow box to start contributing. I learn the domain, tools, and standards quickly, then turn them into working output."],
  ["Build clearly", "I value readable systems, practical user flows, documented decisions, and software that can be explained under pressure."],
  ["Stay accountable", "Academic performance matters, but I want my portfolio judged by evidence: shipped projects, measurable results, and honest growth."],
];

export default function RootPage() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Let native (instant) scroll handle reduced-motion users — no smoothing.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Keep ScrollTrigger in lock-step with Lenis' smoothed scrolling so the
    // pinned horizontal gallery and scrubbed reveals track the virtual scroll.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker — a single rAF source per frame. Avoids
    // the double-update (and double-speed scroll) you get when Lenis is also
    // driven by its own requestAnimationFrame loop.
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      // Skip all entrance/scrub animations for reduced-motion users; the
      // elements then render in their natural (visible) CSS state.
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".reveal-text",
        { y: "130%", clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
        {
          y: "0%",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 115%, 0% 115%)",
          duration: 1.55,
          stagger: 0.09,
          delay: 0.15,
        }
      )
        .fromTo(".divider-bar", { scaleX: 0 }, { scaleX: 1, duration: 1.35, ease: "expo.inOut" }, "-=1")
        .fromTo(".support-text", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, "-=0.65");

      gsap.utils.toArray<HTMLElement>(".lift-in").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, scale: 0.98 },
          {
            scrollTrigger: { trigger: el, start: "top 82%", end: "top 55%", scrub: 0.6 },
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "expo.out",
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <main ref={container} className="relative w-full min-h-screen text-[var(--foreground)]" suppressHydrationWarning>
      <section className="relative z-10 min-h-[100svh] w-full flex flex-col justify-between px-5 md:px-12 pt-7 pb-[8svh]">
        <nav className="support-text flex items-center justify-between gap-4 text-[10px] md:text-xs uppercase tracking-[0.28em] text-white/60">
          <span>Sonu Thakur</span>
          <span className="hidden md:block">Computing Graduate with #1 University Topper // London, UK</span>
          <a href="mailto:badshasonu020@gmail.com" className="hover:text-[var(--gold)] transition-colors">Contact</a>
        </nav>

        <div className="mt-10 md:mt-0 relative">
          <h1 className="relative z-10">
            <span className="block overflow-hidden mb-[-1.5vw]">
              <span className="reveal-text block text-[clamp(3rem,17vmin,19vw)] md:text-[14vw] font-display leading-[0.75] tracking-[-0.08em] uppercase">
                Sonu
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="reveal-text aurora-text block text-[clamp(2.5rem,15vmin,17vw)] md:text-[12.8vw] font-display leading-[0.78] tracking-[-0.075em] uppercase">
                Thakur
              </span>
            </span>
          </h1>
          <div className="absolute top-1/2 -translate-y-1/2 left-[58%] md:left-[52%] lg:left-[55%] w-[26vw] md:w-[20vw] lg:w-[16vw] hidden md:block z-20 pointer-events-none">
            <div className="spark-frame shadow-2xl shadow-[var(--gold)]/20">
              <img src="/me.jpg" alt="Sonu Thakur portrait" className="w-full h-auto object-cover rounded-[inherit] scale-105 hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/60 via-transparent to-[var(--background)]/60 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="md:hidden mt-8 flex justify-center">
          <div className="spark-frame w-48 shadow-2xl shadow-[var(--gold)]/20">
            <img src="/me.jpg" alt="Sonu Thakur portrait" className="w-full h-auto object-cover rounded-[inherit] scale-105" />
          </div>
        </div>
        <div>
          <div className="divider-bar w-full h-px bg-white/18 origin-left" />
          <div className="mt-7 grid md:grid-cols-[1.1fr_0.9fr_0.7fr] gap-8 md:gap-10 items-end">
            <p className="support-text font-sans text-lg md:text-2xl text-white/72 max-w-[780px] leading-snug text-balance">
              First-Class Computing Systems graduate seeking UK graduate, junior, and internship technology roles across software, cloud, data, AI, security, and product engineering.
            </p>
            <p className="support-text font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-white/60 leading-relaxed">
              Paul Hanna Award recipient<br />BSc Computing Systems — First Class<br />University of Ulster, London, 2025
            </p>
            <div className="support-text glass-panel rounded-3xl p-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/60 mb-3">Professional signal</p>
              <p className="font-display text-2xl leading-none tracking-[-0.05em] text-[var(--gold)]">Adaptable learner. <br/>Evidence-led builder.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-24 md:py-36">
        <div className="lift-in max-w-[1180px]">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.32em] text-[var(--accent-soft)] mb-6">Profile // built for first technology roles</p>
          <h2 className="text-[13vw] md:text-[7vw] font-display uppercase leading-[0.86] tracking-[-0.07em] text-balance">
            Confident because the record has evidence.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {achievements.map(([number, title, body]) => (
            <article key={title} className="lift-in glass-panel rounded-[2rem] p-6 md:p-8 min-h-[260px] flex flex-col justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">{number}</span>
              <div>
                <h3 className="font-display text-3xl md:text-4xl leading-none tracking-[-0.055em] mb-4">{title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-white/55">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 pb-24 md:pb-36">
        <div className="lift-in glass-panel rounded-[2rem] md:rounded-[3rem] p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.32em] text-white/60 mb-4">Academic signals // selected module marks</p>
              <h2 className="text-[12vw] md:text-[5vw] font-display uppercase leading-[0.84] tracking-[-0.07em]">Proof across domains.</h2>
            </div>
            <p className="max-w-[520px] text-sm md:text-base leading-relaxed text-white/52">
              The transcript supports a broad computing profile: analytics, cloud, databases, networking, security, software process, and applied development.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {academicSignals.map(([mark, module]) => (
              <div key={module} className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <p className="font-display text-5xl tracking-[-0.08em] text-[var(--gold)]">{mark}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/60">{module}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-20 md:py-28 border-y border-white/10 bg-white/[0.025]">
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-12 md:gap-20 items-start">
          <div className="lift-in md:sticky md:top-10">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.32em] text-white/60 mb-5">Role fit // not boxed into one label</p>
            <h2 className="text-[16vw] md:text-[5.8vw] font-display uppercase leading-[0.82] tracking-[-0.07em]">Open to the right first role.</h2>
          </div>
          <div className="lift-in grid sm:grid-cols-2 gap-3">
            {roleTargets.map((role) => (
              <div key={role} className="rounded-3xl border border-white/12 bg-black/30 px-5 py-4 text-xs md:text-sm uppercase tracking-[0.18em] text-white/62">
                {role}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 md:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20 items-start">
          <div className="lift-in">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.32em] text-white/60 mb-5">Capability map // range with direction</p>
            <h2 className="text-[16vw] md:text-[5.8vw] font-display uppercase leading-[0.82] tracking-[-0.07em]">Useful from day one.</h2>
          </div>
          <div className="lift-in flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-white/12 bg-black/30 px-5 py-3 text-xs md:text-sm uppercase tracking-[0.18em] text-white/62 hover:border-[var(--accent-soft)] hover:text-white transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <a
        href="#after-gallery"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[var(--gold)] focus:px-4 focus:py-2 focus:text-[10px] focus:uppercase focus:tracking-[0.22em] focus:text-black"
      >
        Skip project gallery
      </a>
      <HorizontalGallery />

      <section id="after-gallery" tabIndex={-1} className="relative z-10 px-5 md:px-12 py-24 md:py-36 scroll-mt-4">
        <div className="lift-in grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-20 items-start">
          <h2 className="text-[14vw] md:text-[6.2vw] font-display uppercase leading-[0.84] tracking-[-0.075em] text-balance">
            How I want to be judged.
          </h2>
          <div className="grid gap-4">
            {principles.map(([title, body]) => (
              <article key={title} className="glass-panel rounded-[2rem] p-6 md:p-8">
                <h3 className="font-display text-3xl md:text-4xl tracking-[-0.055em] leading-none mb-4">{title}</h3>
                <p className="text-white/58 text-base md:text-lg leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 min-h-[100svh] w-full flex flex-col justify-center bg-[var(--accent)] text-black px-5 md:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(90deg,rgba(0,0,0,.4)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.4)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative z-10">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-bold mb-7">Open to UK graduate, junior, and internship technology roles</p>
          <h2 className="text-[16vw] md:text-[8vw] font-display font-bold tracking-[-0.08em] leading-[0.78] uppercase max-w-[1100px]">
            Ready to contribute, learn, and grow.
          </h2>
          <div className="mt-14 flex flex-col md:flex-row gap-5 md:gap-10">
            <a href="mailto:badshasonu020@gmail.com" className="font-sans text-base md:text-xl uppercase tracking-[0.22em] font-extrabold hover:text-white transition-colors">Email</a>
            <a href="https://github.com/ggogogohub" target="_blank" rel="noreferrer" className="font-sans text-base md:text-xl uppercase tracking-[0.22em] font-extrabold hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/thakur-sonu" target="_blank" rel="noreferrer" className="font-sans text-base md:text-xl uppercase tracking-[0.22em] font-extrabold hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
