import { chromium } from 'playwright';
const file = process.argv[2];
const out = process.argv[3] || 'shot.png';
const w = +(process.argv[4] || 1440);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: w, height: 900 } });
const errs = [];
p.on('pageerror', e => errs.push(String(e)));
p.on('console', m => { if (m.type() === 'error') errs.push('console:' + m.text()); });
await p.goto('file://' + file, { waitUntil: 'networkidle' });
await p.waitForTimeout(700);
const info = await p.evaluate(() => ({
  sections: document.querySelectorAll('main .section, main .hero').length,
  cardsDisplay: getComputedStyle(document.querySelector('.cards')).display,
  brokenImgs: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src),
}));
await p.screenshot({ path: out, fullPage: true });
console.log(JSON.stringify({ info, errs }, null, 2));
await b.close();
