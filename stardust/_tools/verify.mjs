import { chromium } from 'playwright';

const H = 'https://site-sony--stardust-multitest-280626-noak--paolomoz.aem.page';
const PAGES = [
  ['/sony/', 'home'],
  ['/sony/sonyinfo/products', 'section-landing'],
  ['/sony/sonyinfo/news/press', 'listing'],
  ['/sony/sonyinfo/news/press/202606/26-015e', 'article'],
  ['/sony/sonyinfo/design/stories', 'editorial'],
  ['/sony/brand', 'editorial'],
];

const browser = await chromium.launch();
const results = [];
for (const [path, tpl] of PAGES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  let http = 0;
  page.on('response', (r) => { if (r.url().endsWith(path) || r.url().endsWith(`${path}/`)) http = r.status(); });
  try {
    const resp = await page.goto(H + path, { waitUntil: 'networkidle', timeout: 45000 });
    http = resp ? resp.status() : http;
    await page.waitForTimeout(1200);
    const info = await page.evaluate(() => {
      const imgs = [...document.images];
      return {
        appear: document.body.classList.contains('appear'),
        sections: document.querySelectorAll('main .section').length,
        blocks: document.querySelectorAll('main .block[data-block-status="loaded"], main .block').length,
        h1: document.querySelectorAll('h1').length,
        h1text: (document.querySelector('h1') || {}).textContent || '',
        brokenImgs: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
        imgCount: imgs.length,
        aboutError: document.body.innerHTML.includes('about:error'),
        is404: !!window.isErrorPage,
        deadLinks: [...document.querySelectorAll('main a[href^="/sony"]')].map((a) => a.getAttribute('href')),
      };
    });
    results.push({ path, tpl, http, errs, ...info });
  } catch (e) {
    results.push({ path, tpl, http, error: String(e), errs });
  }
  await page.close();
}
await browser.close();

let pass = 0;
for (const r of results) {
  const ok = r.http === 200 && !r.is404 && !r.aboutError && r.sections > 0 && r.h1 === 1 && (r.brokenImgs || []).length === 0 && (r.errs || []).length === 0;
  if (ok) pass += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'} [${r.tpl}] ${r.path}`);
  console.log(`     http=${r.http} appear=${r.appear} sections=${r.sections} blocks=${r.blocks} h1=${r.h1} imgs=${r.imgCount} broken=${(r.brokenImgs || []).length} pageerr=${(r.errs || []).length} aboutError=${r.aboutError} is404=${r.is404}`);
  if (r.h1text) console.log(`     h1: "${r.h1text.trim().slice(0, 60)}"`);
  if ((r.brokenImgs || []).length) console.log(`     BROKEN: ${r.brokenImgs.slice(0, 3).join(', ')}`);
  if ((r.errs || []).length) console.log(`     ERRS: ${r.errs.slice(0, 2).join(' | ')}`);
}
console.log(`\n${pass}/${results.length} pages PASS`);
