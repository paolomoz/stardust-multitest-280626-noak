import { chromium } from 'playwright';
const [,, file, out, w] = process.argv;
const width = +(w || 1440);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto('file://' + file, { waitUntil: 'networkidle', timeout: 30000 }).catch(()=>{});
await page.waitForTimeout(1500);
const info = await page.evaluate(() => ({
  sections: document.querySelectorAll('main [data-section], [data-section]').length,
  h1: document.querySelectorAll('h1').length,
  imgs: [...document.querySelectorAll('img')].map(i=>({src:i.currentSrc||i.src, ok:i.complete && i.naturalWidth>0})),
  navGridDisplay: getComputedStyle(document.querySelector('.promo-grid')||document.body).display,
}));
await page.screenshot({ path: out, fullPage: true });
console.log(JSON.stringify({ errors, sections: info.sections, h1: info.h1, promoGridDisplay: info.navGridDisplay, brokenImgs: info.imgs.filter(i=>!i.ok).length, totalImgs: info.imgs.length }, null, 2));
await browser.close();
