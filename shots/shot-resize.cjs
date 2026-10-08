// Test a classic ScrollTrigger failure mode: does resizing the window (or the
// pin being calculated before content settles) leave the gallery overlapping a
// neighbour? Fixed-viewport screenshots can't see this; this can.
const { chromium } = require("playwright");
const URL = process.env.URL || "http://localhost:3000";

const measure = (page) =>
  page.evaluate(() => {
    const secs = [...document.querySelectorAll("section")];
    const i = secs.findIndex((s) => /horizontal archive/i.test(s.textContent || ""));
    const g = secs[i], next = secs[i + 1];
    if (!g) return null;
    const gr = g.getBoundingClientRect();
    const nr = next ? next.getBoundingClientRect() : null;
    const panels = [...g.querySelectorAll(".gallery-panel")].map((el) => {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), w: Math.round(r.width) };
    });
    return {
      vw: window.innerWidth,
      gallery: { y: Math.round(gr.y), b: Math.round(gr.bottom), h: Math.round(gr.height) },
      nextTop: nr ? Math.round(nr.y) : null,
      panels,
    };
  });

(async () => {
  const b = await chromium.launch({ channel: "chrome" });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(3500);

  // scroll to just past where the pin should END, into the next section
  const idx = await p.evaluate(() =>
    [...document.querySelectorAll("section")].findIndex((s) => /horizontal archive/i.test(s.textContent || ""))
  );
  await p.evaluate((i) => document.querySelectorAll("section")[i].scrollIntoView({ behavior: "instant", block: "start" }), idx);
  await p.waitForTimeout(1200);
  await p.evaluate(() => window.scrollBy(0, 2200)); // well into / past the pin
  await p.waitForTimeout(1500);
  console.log("A) 1920 wide, scrolled past pin:", JSON.stringify(await measure(p)));

  // resize NARROWER with no manual refresh — does the layout break / overlap?
  for (const [w, h] of [[1536, 864], [1280, 800], [1024, 700], [900, 700]]) {
    await p.setViewportSize({ width: w, height: h });
    await p.waitForTimeout(1800); // give ScrollTrigger's auto-refresh (if any) time
    const m = await measure(p);
    const overlap = m && m.nextTop !== null && m.nextTop < m.gallery.b - 1;
    console.log(`B) resized to ${w}x${h}:`, JSON.stringify(m), overlap ? "<<< NEXT SECTION OVERLAPS GALLERY" : "");
    await p.screenshot({ path: `shots/resize-${w}.png` });
  }
  await b.close();
  console.log("DONE");
})().catch((e) => { console.error(e); process.exit(1); });
