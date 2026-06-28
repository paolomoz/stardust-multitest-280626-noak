import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = 'stardust/current';
const ASSETS = path.join(OUT, 'assets');

const browser = await chromium.launch({ headless: false, channel: 'chrome' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('https://www.sony.com/en/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(3500);
// scroll to trigger lazy
for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 900); await page.waitForTimeout(300); }
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);

const surface = await page.evaluate(() => {
  const norm = (c) => {
    if (!c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent') return null;
    return c;
  };
  const colorCount = {}; const bgCount = {}; const fontCount = {}; const sizeCount = {}; const radiusCount = {}; const shadowCount = {};
  const els = document.querySelectorAll('body *');
  let n = 0;
  els.forEach((el) => {
    if (n > 6000) return; n++;
    const s = getComputedStyle(el);
    const col = norm(s.color); if (col) colorCount[col] = (colorCount[col] || 0) + 1;
    const bg = norm(s.backgroundColor); if (bg) bgCount[bg] = (bgCount[bg] || 0) + 1;
    const r = el.getBoundingClientRect();
    if (r.width > 4 && r.height > 4 && el.textContent && el.textContent.trim()) {
      const ff = s.fontFamily; if (ff) fontCount[ff] = (fontCount[ff] || 0) + 1;
      const fs = `${s.fontSize}/${s.fontWeight}`; sizeCount[fs] = (sizeCount[fs] || 0) + 1;
    }
    const rad = s.borderRadius; if (rad && rad !== '0px') radiusCount[rad] = (radiusCount[rad] || 0) + 1;
    const sh = s.boxShadow; if (sh && sh !== 'none') shadowCount[sh] = (shadowCount[sh] || 0) + 1;
  });
  const top = (o, k = 12) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, k);
  // logo: inline svg or img with logo class
  let logo = null;
  const logoImg = document.querySelector('header img[src*="logo"], img[src*="logo"], .logo img, [class*="logo"] img');
  if (logoImg) logo = { type: 'img', src: logoImg.src, alt: logoImg.alt };
  const favicon = (document.querySelector('link[rel~="icon"]') || {}).href || null;
  const appleIcon = (document.querySelector('link[rel="apple-touch-icon"]') || {}).href || null;
  const themeColor = (document.querySelector('meta[name="theme-color"]') || {}).content || null;
  // hero
  const heroSel = document.querySelector('main img, .hero img, [class*="hero"] img, [class*="slide"] img');
  const hero = heroSel ? { src: heroSel.src, w: heroSel.naturalWidth, h: heroSel.naturalHeight } : null;
  const h1 = (document.querySelector('h1') || {}).textContent || null;
  return {
    colors: top(colorCount), backgrounds: top(bgCount), fonts: top(fontCount), sizes: top(sizeCount, 16),
    radii: top(radiusCount), shadows: top(shadowCount, 5), logo, favicon, appleIcon, themeColor, hero, h1,
  };
});

await mkdir(ASSETS, { recursive: true });
await mkdir(path.join(ASSETS, 'screenshots'), { recursive: true });
await page.screenshot({ path: path.join(ASSETS, 'screenshots', 'en.png'), fullPage: false });

// download logo + favicon through the browser context (bypasses Akamai)
async function dl(url, dest) {
  if (!url) return null;
  try {
    const resp = await ctx.request.get(url);
    if (!resp.ok()) return `FAIL ${resp.status()}`;
    const buf = await resp.body();
    await writeFile(dest, buf);
    return `OK ${buf.length}b`;
  } catch (e) { return `ERR ${e.message}`; }
}
const logoUrl = surface.logo?.src || 'https://www.sony.com/en/template/2023/img/logo.svg';
const ext = logoUrl.split('.').pop().split('?')[0];
surface._logoDownload = await dl(logoUrl, path.join(ASSETS, `logo.${ext}`));
surface._faviconDownload = await dl(surface.favicon, path.join(ASSETS, 'favicon-src'));
if (surface.appleIcon) surface._appleDownload = await dl(surface.appleIcon, path.join(ASSETS, 'apple-touch-icon-src'));

await writeFile(path.join(OUT, '_brand-surface-raw.json'), JSON.stringify(surface, null, 2));
console.log(JSON.stringify(surface, null, 2));
await browser.close();
