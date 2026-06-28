import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const fonts = new Set();
page.on('response', (r) => {
  const u = r.url();
  if (/\.(woff2?|ttf|otf)(\?|$)/i.test(u)) fonts.add(u);
});
await page.goto('https://www.starbucks.com/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.waitForTimeout(2500);

const data = await page.evaluate(() => {
  const colorCount = {};
  const fontCount = {};
  const radiusCount = {};
  const shadowSet = new Set();
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return;
    [cs.color, cs.backgroundColor, cs.borderTopColor].forEach((c) => {
      if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') colorCount[c] = (colorCount[c] || 0) + 1;
    });
    const ff = cs.fontFamily;
    if (ff) fontCount[ff] = (fontCount[ff] || 0) + 1;
    const br = cs.borderRadius;
    if (br && br !== '0px') radiusCount[br] = (radiusCount[br] || 0) + 1;
    if (cs.boxShadow && cs.boxShadow !== 'none') shadowSet.add(cs.boxShadow);
  });
  const top = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
  // logo
  const header = document.querySelector('header') || document.body;
  const svg = header.querySelector('svg');
  const logoSvg = svg ? svg.outerHTML : null;
  const logoImg = (() => {
    const im = header.querySelector('img[alt*="Starbucks" i], img[class*="logo" i]');
    return im ? im.src : null;
  })();
  // favicon
  const icons = [...document.querySelectorAll('link[rel*="icon"], link[rel*="apple-touch"]')].map((l) => ({ rel: l.rel, href: l.href }));
  return {
    colors: top(colorCount, 16),
    fonts: top(fontCount, 8),
    radius: top(radiusCount, 6),
    shadows: [...shadowSet].slice(0, 6),
    logoSvg,
    logoImg,
    icons,
    themeColor: document.querySelector('meta[name="theme-color"]')?.content || null,
  };
});

await mkdir('stardust/current/assets', { recursive: true });
data.fontFiles = [...fonts];
if (data.logoSvg) await writeFile('stardust/current/assets/logo.svg', data.logoSvg);
await writeFile('stardust/current/_brand-probe.json', JSON.stringify(data, null, 2));
console.log(JSON.stringify({ ...data, logoSvg: data.logoSvg ? `[svg ${data.logoSvg.length} chars]` : null }, null, 2));
await browser.close();
