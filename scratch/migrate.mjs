import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/paolo/stardust/rollout/multitest-280626-noak/runs/xfinity';
const PAGES = path.join(ROOT, 'stardust/current/pages');
const OUT = path.join(ROOT, 'content/xfinity');
const HAND = new Set(['index']); // hand-authored, skip

const decode = (s) => (s || '')
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&rsquo;/g, '’')
  .replace(/&lsquo;/g, '‘').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/\s+/g, ' ').trim();

const esc = (s) => decode(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const JUNK = /(pricing\s*&?\s*other\s*info|^change$|^pricing$|cookie|decline all|sign in here|block settings|^contents$|^categories$|read more|^share$|^learn more$|terms|privacy policy|^skip to|your privacy choices|^chat$|^menu$|^close$|^overview$|^x$)/i;
const cleanText = (t) => decode(t);
const isJunk = (t) => !t || t.length < 2 || JUNK.test(t.trim());

const CAT = [
  [/internet|gig|wifi/i, 'Internet'],
  [/mobile/i, 'Mobile'],
  [/cable-tv|tv|stream|x1|sports|premium|svod|channel/i, 'TV & Streaming'],
  [/home-solutions|security|smart-home/i, 'Home Security'],
  [/home-phone|voice/i, 'Home Phone'],
  [/deals|offer/i, 'Deals'],
  [/moving|move/i, 'Moving'],
  [/membership/i, 'Membership'],
  [/local|store/i, 'Local'],
  [/hub/i, 'Xfinity Hub'],
];
const category = (p) => (CAT.find(([re]) => re.test(p)) || [null, 'Xfinity'])[1];

const slugToPath = (url) => {
  try { return new URL(url).pathname.replace(/\/$/, '').toLowerCase() || '/'; } catch { return '/'; }
};

// Build roster of deployed paths (all captured pages) for link localization
const files = readdirSync(PAGES).filter((f) => f.endsWith('.json'));
const roster = new Set();
const records = files.map((f) => {
  const d = JSON.parse(readFileSync(path.join(PAGES, f), 'utf8'));
  d._path = slugToPath(d.url);
  roster.add(`/xfinity${d._path}`);
  return d;
});
roster.add('/xfinity/planbuilder');
roster.add('/xfinity/bill-pay');

const localize = (href) => {
  if (!href) return null;
  let h = href.trim();
  if (h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('tel:')) return null;
  let p = null;
  if (/^https?:\/\/(www\.)?xfinity\.com/i.test(h)) p = h.replace(/^https?:\/\/(www\.)?xfinity\.com/i, '');
  else if (h.startsWith('/')) p = h;
  if (p !== null) {
    p = p.replace(/[?#].*$/, '').replace(/\.html$/, '').replace(/\/$/, '').toLowerCase();
    if (!p) return '/xfinity/';
    const local = `/xfinity${p}`;
    if (roster.has(local)) return local;
    return `https://www.xfinity.com${p}`; // bounce to source (no local page)
  }
  if (/^https?:\/\//.test(h)) return h; // external absolute
  return null;
};

const goodBody = (d) => d.body.map(cleanText).filter((t) => t.length >= 45 && t.length <= 400 && /\s/.test(t) && !isJunk(t));

const primaryCTA = (d) => {
  const c = (d.ctas || []).find((x) => {
    const l = cleanText(x.label);
    return x.href && /plan-builder|\/learn\/|\/now\/|\/gig|shop|build/i.test(x.href) && l && l.length >= 3 && l.length <= 28 && !isJunk(l);
  });
  if (c) { const lz = localize(c.href); if (lz) return { label: cleanText(c.label), href: lz }; }
  return { label: 'Shop plans', href: '/xfinity/planbuilder' };
};

const relatedLinks = (d) => {
  const seen = new Set(); const out = [];
  (d.ctas || []).forEach((c) => {
    const label = cleanText(c.label);
    const href = localize(c.href);
    if (!href || !label || label.length < 3 || label.length > 30 || isJunk(label)) return;
    if (!href.startsWith('/xfinity/')) return; // only real local pages as related cards
    if (href === `/xfinity${d._path}`) return;
    const key = label.toLowerCase();
    if (seen.has(key)) return; seen.add(key);
    out.push({ label, href });
  });
  return out.slice(0, 6);
};

function build(d) {
  const p = d._path;
  const cat = category(p);
  const title = esc((cleanText(d.title) || cat).slice(0, 65));
  const heading = (d.headings || []).map((h) => cleanText(h.text)).find((t) => t && t.length >= 6 && !isJunk(t)) || cleanText(d.title) || cat;
  const body = goodBody(d);
  const desc = esc((cleanText(d.description) || body[0] || `${heading} from Xfinity.`).slice(0, 160));
  const cta = primaryCTA(d);
  const lead = body[0] || '';
  const rest = body.slice(1, 7);
  const related = relatedLinks(d);

  let html = '<body>\n  <header></header>\n  <main>\n';
  // metadata
  html += `    <div>\n      <div class="metadata">\n        <div><div>Title</div><div>${title}</div></div>\n        <div><div>Description</div><div>${desc}</div></div>\n      </div>\n    </div>\n`;
  // hero
  html += '    <div>\n      <div class="hero">\n        <div>\n          <div>\n';
  html += `            <p>${esc(cat)}</p>\n            <h1>${esc(heading)}</h1>\n`;
  if (lead) html += `            <p>${esc(lead)}</p>\n`;
  html += `            <p><strong><a href="${cta.href}">${esc(cta.label)}</a></strong></p>\n`;
  html += '          </div>\n        </div>\n      </div>\n    </div>\n';
  // prose (real body)
  if (rest.length) {
    html += '    <div>\n';
    rest.forEach((t) => { html += `      <p>${esc(t)}</p>\n`; });
    html += '    </div>\n';
  }
  // related links as pillars cards
  if (related.length >= 2) {
    html += '    <div>\n      <div class="cards pillars">\n';
    related.forEach((r) => { html += `        <div><div><p><a href="${r.href}">${esc(r.label)}</a></p></div></div>\n`; });
    html += '      </div>\n    </div>\n';
  }
  // cta band
  html += '    <div>\n      <div class="cta">\n        <div><div><h2>Build a plan that fits your home and your budget.</h2></div></div>\n        <div><div><p><strong><a href="/xfinity/planbuilder">Build your plan</a></strong></p></div></div>\n      </div>\n    </div>\n';
  html += '  </main>\n  <footer></footer>\n</body>\n';
  return { path: p, html, sections: 2 + (rest.length ? 1 : 0) + (related.length >= 2 ? 1 : 0) + 1, body: body.length, related: related.length };
}

let count = 0; const report = [];
for (const d of records) {
  if (HAND.has(d.slug)) continue;
  if (d._path === '/') continue;
  const { path: pp, html, sections, body, related } = build(d);
  const outFile = path.join(OUT, `${pp.replace(/^\//, '')}.html`);
  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  count += 1;
  report.push(`${pp}  sections=${sections} body=${body} related=${related}`);
}
console.log(`generated ${count} pages`);
console.log(report.join('\n'));
