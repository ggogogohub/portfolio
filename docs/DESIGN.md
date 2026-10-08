# DESIGN.md — Visual System

## Chosen direction: Editorial Clarity (recommended)
Reason: the existing portfolio competes between loud gradients, rotating frames, pill lists, and glass panels. A single coherent editorial direction — warm neutral ground, moss-green accent, restrained typography — gives durability into 2027 and avoids the generic "AI portfolio template" risk.

## Alternative rejected: Brighter Gradient / Glass / Pill-Heavy (existing)
Reason: multicolour gradient text, rotating spark-frame portrait, orange/gold/cyan accents, long pill lists, and glass panels create visual noise that competes with the evidence. Keeping elements that work (project links, academic evidence, GSAP) while stripping decorative competition yields stronger hierarchy.

## Art direction: "Complex problems. Clear systems."
- Editorial precision; quiet confidence; engineering clarity; distinctive identity.
- Not corporate résumé; not generic SaaS; not decorative dashboard.
- One strong featured-project visual (Media Gallery upload interface), carefully controlled whitespace, purposeful section rhythm.

## Typography
- Display: a single family with tight tracking (-0.055em) for headings; tabular-nums for data.
- Hero name: very large but not overwhelming; asymmetric desktop layout (name left, featured image right/offset) rather than centered block.
- Body: comfortable line length (~65-75ch); size appropriate at 320px (minimum ~16px base); adequate leading (1.55-1.65).
- Section labels: small uppercase tracking-wide labels (not pill tags for every skill).

## Colour (durable, accessible, high-contrast in both themes if added)
- Background: warm neutral (#f7f4ef or similar) — not pure white, not dark default. Subtly tinted dark counterpart if light/dark pair used.
- Text: near-black (#0a0a0a) on light; near-white (#f0ede6) on dark; never low-contrast grey for body.
- Accent: restrained moss-green (#6b7f5e or similar) — one accent, used sparingly (selected links, one divider, one label highlight). No multicolour gradients.
- Secondary muted: warm grey (#8a8378) for meta, dates, captions.
- Selection: moss-green with dark text for visibility.

## Layout
- Asymmetric desktop hero: name + value prop left-aligned; featured project visual offset to right with intentional overlap/space—not centered.
- Sections in vertical rhythm: identity → selected projects → signature story → about/award/degree → capabilities → contact.
- Projects shown as cards with actual imagery/diagram, repo link, short factual description (problem, users, contribution if evidenced, one engineering decision, one trade-off or limitation).
- Signature interaction (Media Gallery): 4-step sequence with beginning/middle/end; static equivalent on mobile/reduced-motion.
- No pinned horizontal gallery that forces horizontal scroll for essential content; mobile uses stacked cards.
- Enough padding at section boundaries; no accidental overflow at 320-430.

## Surface treatment
- No glass panels (remove backdrop-filter glass; replace with solid or barely-tinted surfaces if needed).
- No grain/noise overlay competing with content; keep clean.
- No rotating border animation; replace with static refined frame or none.
- No gradient text; solid colour with weight/size hierarchy.
- Subtle divider lines (1px, muted) between sections, not bars.

## Motion principles
- Content visible by default; animations are enhancement only (never hide content permanently).
- GSAP/ScrollTrigger used for controlled reveal and the signature interaction only; not for every paragraph.
- Respects prefers-reduced-motion in CSS and JS (existing gate preserved).
- Clean observers / timelines on unmount.
- No long scroll traps; no autoplay; no audio.
- Prefer transform/opacity; profile expensive effects (no particle fields, no orbit objects).

## Responsive
- Touch targets ≥44px where practical.
- No hover-only information; all interaction available via touch.
- Keyboard navigation visible; semantically correct headings (h1 for name + role context, h2 for sections, h3 for cards).
- Short landscape viewport handled (avoid clipped hero text).

## Accessibility
- Focus outline visible (2px solid moss-green, offset 3px).
- Meaningful link labels (not "click here").
- Alt text for all imagery; decorative graphics marked aria-hidden.
- Sufficient contrast at 4.5:1 for body, 3:1 for large/text decorative.
- Reflow at 320% zoom / text scaling; no horizontal overflow.

## Implementation notes
- Use existing Tailwind v4 + PostCSS setup.
- Keep Lenis for smooth scroll if beneficial; do not add second scroll library.
- Keep GSAP / ScrollTrigger for signature sequence and selective reveal; do not duplicate with other libraries.
- Client-only motion isolated to focused components; rest server-rendered.
- Update meta / social preview to match new identity after build.
