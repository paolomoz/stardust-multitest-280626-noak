import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const OUTDIR = 'media/sony';
mkdirSync(OUTDIR, { recursive: true });

// collect image urls from all page JSONs: per page keep logo + up to 8 largest distinct images
const dir = 'stardust/current/pages';
const urls = new Map(); // url -> {w,h}
for (const f of readdirSync(dir)) {
  if (!f.endsWith('.json')) continue;
  const j = JSON.parse(readFileSync(path.join(dir, f), 'utf8'));
  const imgs = (j.media?.imgs || []).filter((i) => i.src && i.src.startsWith('http'));
  // largest distinct by src
  const seen = new Set();
  const big = imgs.filter((i) => (i.w || 0) * (i.h || 0) >= 200 * 150)
    .sort((a, b) => (b.w * b.h) - (a.w * a.h));
  let kept = 0;
  for (const i of big) {
    if (seen.has(i.src) || urls.has(i.src)) continue;
    seen.add(i.src); urls.set(i.src, { w: i.w, h: i.h }); kept++;
    if (kept >= 10) break;
  }
}
console.error(`collected ${urls.size} image urls`);

const browser = await chromium.launch({ headless: false, channel: 'chrome' });
const ctx = await browser.newContext();
// warm the session (Akamai cookie) by visiting home
const warm = await ctx.newPage();
await warm.goto('https://www.sony.com/en/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await warm.waitForTimeout(1500);
await warm.close();

const manifest = {};
let ok = 0; let fail = 0;
for (const [url, dim] of urls) {
  const base = url.split('/').pop().split('?')[0].toLowerCase().replace(/[^a-z0-9.\-_]/g, '-');
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 6);
  const name = `${hash}-${base}`;
  try {
    const resp = await ctx.request.get(url, { headers: { referer: 'https://www.sony.com/en/' } });
    if (!resp.ok()) { manifest[url] = { error: resp.status() }; fail++; continue; }
    const buf = await resp.body();
    writeFileSync(path.join(OUTDIR, name), buf);
    manifest[url] = { local: `/${OUTDIR}/${name}`, bytes: buf.length, w: dim.w, h: dim.h };
    ok++;
  } catch (e) { manifest[url] = { error: e.message }; fail++; }
}
writeFileSync('stardust/current/_media-manifest.json', JSON.stringify(manifest, null, 2));
console.error(`done: ${ok} ok, ${fail} fail`);
await browser.close();
