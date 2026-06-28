import { chromium } from 'playwright';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const BASE = 'https://site-xfinity--stardust-multitest-280626-noak--paolomoz.aem.page';
const ROOT = '/Users/paolo/stardust/rollout/multitest-280626-noak/runs/xfinity';
const CONTENT = path.join(ROOT, 'content');

// gather deployed paths
function walk(dir, acc) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, acc);
    else if (e.name.endsWith('.html')) {
      let p = f.slice(CONTENT.length).replace(/\.html$/, '');
      acc.push(p);
    }
  }
  return acc;
}
const paths = walk(CONTENT, []).filter((p) => !/\/(nav|footer)$/.test(p));

const get = async (u) => {
  try { const r = await fetch(u); return r.status; } catch { return 0; }
};

console.log('=== delivery check (.plain.html 200 + about:error) ===');
let pass = 0; const bad = [];
for (const p of paths) {
  const u = `${BASE}${p}.plain.html`;
  try {
    const r = await fetch(u);
    const t = r.ok ? await r.text() : '';
    const err = (t.match(/about:error/g) || []).length;
    if (r.status === 200 && err === 0) pass += 1;
    else bad.push(`${p} status=${r.status} about:error=${err}`);
  } catch (e) { bad.push(`${p} FETCH-FAIL`); }
}
console.log(`delivered: ${pass}/${paths.length} clean`);
bad.forEach((b) => console.log('  BAD', b));

// internal link audit via headless on a sample + all pages' plain html links
console.log('\n=== internal link audit (live GET) ===');
const links = new Set();
for (const p of paths) {
  try {
    const t = await (await fetch(`${BASE}${p}.plain.html`)).text();
    [...t.matchAll(/href="(\/xfinity\/[^"#?]*)"/g)].forEach((m) => links.add(m[1]));
  } catch { /* skip */ }
}
const link404 = [];
for (const l of links) {
  const s = await get(`${BASE}${l}`);
  if (s !== 200) link404.push(`${l} -> ${s}`);
}
console.log(`internal links checked: ${links.size}, non-200: ${link404.length}`);
link404.forEach((l) => console.log('  404', l));

// headless render per-template sample
console.log('\n=== headless render (per-template sample) ===');
const sample = ['/xfinity/', '/xfinity/learn/internet-service', '/xfinity/compare', '/xfinity/hub/internet', '/xfinity/accessibility', '/xfinity/site-map', '/xfinity/local'];
const b = await chromium.launch({ headless: true });
for (const s of sample) {
  const page = await b.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  try {
    await page.goto(`${BASE}${s}`, { waitUntil: 'networkidle', timeout: 40000 });
    await page.waitForTimeout(1200);
    const r = await page.evaluate(() => ({
      sections: document.querySelectorAll('main .section').length,
      decorated: document.querySelectorAll('[data-block-status="loaded"]').length,
      h1: document.querySelectorAll('h1').length,
      appear: document.body.classList.contains('appear'),
      broken: [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).length,
    }));
    console.log(`${s}  sections=${r.sections} decorated=${r.decorated} h1=${r.h1} appear=${r.appear} broken=${r.broken} pageerr=${errs.length}`);
  } catch (e) { console.log(`${s}  RENDER-FAIL ${e.message}`); }
  await page.close();
}
await b.close();
