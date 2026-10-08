// Check whether the pinned gallery overlaps the section above/below it,
// and capture the gallery in document context (not just isolated).
const { chromium } = require("playwright");
const URL = process.env.URL || "http://localhost:3000";
const VW = Number(process.env.VW || 1280);
const VH = Number(process.env.VH || 800);

(async () => {
  const b = await chromium.launch({ channel: "chrome" });
  const p = await b.newPage({ viewport: { width: VW, height: VH } });
  await p.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(3000);

  const idx = await p.evaluate(() =>
    [...document.querySelectorAll("section")].findIndex((s) => /horizontal archive/i.test(s.textContent || ""))
  );
  const all = await p.evaluate(() =>
    [...document.querySelectorAll("section")].map((s) => ({ top: s.offsetTop, h: s.offsetHeight }))
  );
  console.log("all sections:", JSON.stringify(all), "gallery idx:", idx);

  const measure = () =>
    p.evaluate((i) => {
      const secs = [...document.querySelectorAll("section")];
      const g = secs[i], prev = secs[i - 1], next = secs[i + 1];
      const R = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { y: Math.round(r.y), b: Math.round(r.bottom), h: Math.round(r.height) }; };
      return { scrollY: Math.round(window.scrollY), gallery: R(g), prev: R(prev), next: R(next) };
    }, idx);

  // just above the gallery
  await p.evaluate((i) => {
    const g = document.querySelectorAll("section")[i];
    window.scrollTo(0, Math.max(0, g.offsetTop - 200));
  }, idx);
  await p.waitForTimeout(1500);
  console.log("ABOVE:", JSON.stringify(await measure()));
  await p.screenshot({ path: `shots/ctx-${VW}-above.png` });

  // gallery pin start
  await p.evaluate((i) => document.querySelectorAll("section")[i].scrollIntoView({ behavior: "instant", block: "start" }), idx);
  await p.waitForTimeout(1500);
  console.log("PINSTART:", JSON.stringify(await measure()));
  await p.screenshot({ path: `shots/ctx-${VW}-pinstart.png` });

  // scroll well past the pin to reach the next section
  await p.evaluate((d) => window.scrollBy(0, d), VW * 3.4);
  await p.waitForTimeout(1800);
  console.log("AFTER:", JSON.stringify(await measure()));
  await p.screenshot({ path: `shots/ctx-${VW}-after.png` });

  await b.close();
  console.log("DONE");
})().catch((e) => { console.error(e); process.exit(1); });
