const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8082/index.html', { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'shots/theme-light.png', fullPage: false });
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'shots/theme-dark.png', fullPage: false });
  await b.close();
  console.log('Desktop light/dark ok');
})();
