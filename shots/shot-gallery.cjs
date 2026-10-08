// Diagnostic screenshot harness for the horizontal-archive section.
// Loads the page at a desktop viewport, then captures the gallery section as
// it is scrolled through its ScrollTrigger pin (start → mid → end).
const { chromium } = require("playwright");
const fs = require("fs");

fs.mkdirSync("shots", { recursive: true });

const VW = Number(process.env.VW || 1440);
const VH = Number(process.VH || 900);
const URL = process.env.URL || "http://localhost:3000";

(async () => {
  const browser = await chromium.launch({
    channel: "chrome",
    executablePath: undefined,
  });
  const page = await browser.newPage({
    viewport: { width: VW, height: VH },
    deviceScaleFactor: 1,
  });

  console.log("loading", URL, "at", VW + "x" + VH);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  // fonts + GSAP/Lenis init + first paint settle
  await page.waitForTimeout(3500);

  // locate the gallery section by its label text
  const idx = await page.evaluate(() => {
    const secs = Array.from(document.querySelectorAll("section"));
    return secs.findIndex((s) => /horizontal archive/i.test(s.textContent || ""));
  });
  console.log("gallery section index:", idx);
  if (idx < 0) throw new Error("gallery section not found");

  // snapshot the resting layout (gallery scrolled to top of viewport = pin start)
  await page.evaluate((i) => {
    const secs = document.querySelectorAll("section");
    secs[i] && secs[i].scrollIntoView({ behavior: "instant", block: "start" });
  }, idx);
  await page.waitForTimeout(1800);
  await page.screenshot({ path: "shots/desktop-gallery-start.png" });
  console.log("shot: desktop-gallery-start.png");

  // also dump the computed layout of the wrapper + panels for hard evidence
  const geom = await page.evaluate((i) => {
    const sec = document.querySelectorAll("section")[i];
    const wrapper = sec.querySelector("div.relative.z-10.flex");
    const panels = Array.from(sec.querySelectorAll(".gallery-panel"));
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    };
    return {
      section: rect(sec),
      wrapper: rect(wrapper),
      wrapperOffsetWidth: wrapper ? wrapper.offsetWidth : null,
      panels: panels.map(rect),
    };
  }, idx);
  console.log("GEOM@start", JSON.stringify(geom));

  // scroll through the pin in steps to capture the transition
  const steps = [600, 600, 600, 600, 600, 600];
  for (let n = 0; n < steps.length; n++) {
    await page.evaluate((d) => window.scrollBy(0, d), steps[n]);
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `shots/desktop-gallery-step-${n + 1}.png` });
    const pg = await page.evaluate((i) => {
      const sec = document.querySelectorAll("section")[i];
      const panels = Array.from(sec.querySelectorAll(".gallery-panel"));
      return panels.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), w: Math.round(r.width) };
      });
    }, idx);
    console.log(`step${n + 1} panels:`, JSON.stringify(pg));
  }

  await browser.close();
  console.log("DONE");
})().catch((e) => {
  console.error("ERR", e);
  process.exit(1);
});
