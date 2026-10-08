// Sweep desktop viewport widths to find where the horizontal-archive breaks.
const { chromium } = require("playwright");
const fs = require("fs");
fs.mkdirSync("shots", { recursive: true });

const widths = [1920, 1536, 1366, 1280, 1100, 1024, 900, 820, 768];

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  for (const VW of widths) {
    const VH = Math.max(700, Math.round(VW * 0.62));
    const page = await browser.newPage({ viewport: { width: VW, height: VH } });
    try {
      await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(2500);
      const idx = await page.evaluate(() => {
        const secs = Array.from(document.querySelectorAll("section"));
        return secs.findIndex((s) => /horizontal archive/i.test(s.textContent || ""));
      });
      await page.evaluate((i) => {
        document.querySelectorAll("section")[i] && document.querySelectorAll("section")[i].scrollIntoView({ behavior: "instant", block: "start" });
      }, idx);
      await page.waitForTimeout(1400);

      const geomRest = await page.evaluate((i) => {
        const sec = document.querySelectorAll("section")[i];
        if (!sec) return null;
        const wrap = sec.querySelector("div.relative.z-10.flex");
        const panels = [...sec.querySelectorAll(".gallery-panel")].map((el) => {
          const r = el.getBoundingClientRect();
          return { x: Math.round(r.x), w: Math.round(r.width), y: Math.round(r.y), h: Math.round(r.height) };
        });
        const cards = [...sec.querySelectorAll(".gallery-panel > .glass-panel")].map((el) => {
          const r = el.getBoundingClientRect();
          return { x: Math.round(r.x), w: Math.round(r.width), y: Math.round(r.y), h: Math.round(r.height) };
        });
        const section = sec.getBoundingClientRect();
        return { vw: window.innerWidth, section: { x: Math.round(section.x), y: Math.round(section.y), w: Math.round(section.width), h: Math.round(section.height) }, wrapW: wrap ? wrap.offsetWidth : null, wrapFlexDir: wrap ? getComputedStyle(wrap).flexDirection : null, panels, cards };
      }, idx);

      await page.screenshot({ path: `shots/w${VW}-rest.png` });

      // transition frame: scroll into the pin
      await page.evaluate(() => window.scrollBy(0, 520));
      await page.waitForTimeout(1100);
      await page.screenshot({ path: `shots/w${VW}-mid.png` });

      console.log(`W=${VW}`, JSON.stringify(geomRest));
    } catch (e) {
      console.log(`W=${VW} ERROR`, e.message);
    }
    await page.close();
  }
  await browser.close();
  console.log("DONE");
})().catch((e) => { console.error(e); process.exit(1); });
