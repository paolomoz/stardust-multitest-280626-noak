import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const ORG = 'paolomoz';
const REPO = 'stardust-multitest-280626-noak';
const MEDIA_BASE = `https://content.da.live/${ORG}/${REPO}/sony/media`;
const OUT = 'content';
const manifest = JSON.parse(readFileSync('stardust/current/_media-manifest.json', 'utf8'));
const usedImages = new Map(); // basename -> local file path

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function localToDa(local) {
  // local like /media/sony/abc-foo.jpg
  const base = local.split('/').pop();
  usedImages.set(base, `media/sony/${base}`.replace('media/sony/', 'media/sony/'));
  usedImages.set(base, `.${local}`); // store repo path for upload
  return `${MEDIA_BASE}/${base}`;
}
function img(local, alt) {
  if (!local) return '';
  return `<img src="${localToDa(local)}" alt="${esc(alt)}">`;
}

function pageDesc(slug) {
  try {
    const j = JSON.parse(readFileSync(`stardust/current/pages/${slug}.json`, 'utf8'));
    let d = (j.description || '').replace(/\s+/g, ' ').trim();
    if (/%TMPL/.test(d) || d.length < 15) return '';
    return d;
  } catch { return ''; }
}
const NAV = /\bopen\b|^\s*(Top|English|Japanese)\s*$|Businesses & Products|About Sony Group|Investor Relations|Games & Network|Read more|Share|Block Settings/i;
function cleanBody(slug, max = 10) {
  try {
    const j = JSON.parse(readFileSync(`stardust/current/pages/${slug}.json`, 'utf8'));
    const seen = new Set();
    return (j.body || [])
      .filter((b) => typeof b === 'string')
      .map((b) => b.replace(/\s+/g, ' ').trim())
      .filter((b) => b.length > 45 && !NAV.test(b) && !seen.has(b) && (seen.add(b), true))
      .slice(0, max);
  } catch { return []; }
}

function meta(rows) {
  const r = rows.map(([k, v]) => `        <div><div>${k}</div><div>${v}</div></div>`).join('\n');
  return `    <div>\n      <div class="metadata">\n${r}\n      </div>\n    </div>`;
}
function sectionWrap(inner, cls = '') {
  return `    <div${cls ? ` class="${cls}"` : ''}>\n${inner}\n    </div>`;
}
function heroBlock(slides) {
  const rows = slides.map((s, i) => {
    const hd = i === 0 ? `<h1>${esc(s.title)}</h1>` : `<h2>${esc(s.title)}</h2>`;
    const link = s.href ? `<div><a href="${s.href}">${esc(s.cta || 'Read More')}</a></div>` : '<div></div>';
    return `        <div><div>${img(s.img, s.alt || s.title)}</div><div>${hd}</div>${link}</div>`;
  }).join('\n');
  return `      <div class="hero">\n${rows}\n      </div>`;
}
function cardsBlock(cards, variant = '') {
  const cls = variant ? `cards ${variant}` : 'cards';
  const rows = cards.map((c) => {
    const media = c.img ? `<div>${img(c.img, c.label)}</div>` : '';
    const desc = c.desc ? `<div>${esc(c.desc)}</div>` : '';
    return `        <div>${media}<div><a href="${c.href}">${esc(c.label)}</a></div>${desc}</div>`;
  }).join('\n');
  return `      <div class="${cls}">\n${rows}\n      </div>`;
}
function newsBlock(items, variant = '') {
  const cls = variant ? `news ${variant}` : 'news';
  const cfg = '        <div><div>index</div><div>/sony/news-index.json</div></div>';
  const rows = items.map((n) => `        <div><div>${esc(n.date)}</div><div><a href="${n.href}">${esc(n.title)}</a></div></div>`).join('\n');
  return `      <div class="${cls}">\n${cfg}\n${rows}\n      </div>`;
}
function defaultContent(html) { return `      <div>\n${html}\n      </div>`; }

function page(parts) {
  return `<body>\n  <header></header>\n  <main>\n${parts.join('\n')}\n  </main>\n  <footer></footer>\n</body>\n`;
}
function write(p, html) {
  const fp = path.join(OUT, `${p}.html`);
  mkdirSync(path.dirname(fp), { recursive: true });
  writeFileSync(fp, html);
}

// ---- shared chrome fragments ----
const NAVLINKS = [
  ['Businesses &amp; Products', '/sony/sonyinfo/products'],
  ['About Sony Group', '/sony/sonyinfo/corporateinfo'],
  ['Technology', '/sony/sonyinfo/technology'],
  ['Sustainability', '/sony/sonyinfo/csr'],
  ['Design', '/sony/sonyinfo/design'],
  ['Careers', '/sony/sonyinfo/careers'],
  ['Investor Relations', '/sony/sonyinfo/ir'],
];
function navFragment() {
  const logo = img('/media/sony/sony-logo-black.svg', 'Sony');
  const links = NAVLINKS.map(([l, h]) => `<p><a href="${h}">${l}</a></p>`).join('\n      ');
  return `<body>\n  <main>\n    <div>\n      <p><a href="/sony">${logo}</a></p>\n      ${links}\n    </div>\n  </main>\n</body>\n`;
}
function footerFragment() {
  const logo = img('/media/sony/sony-logo-white.svg', 'Sony');
  const cols = `      <div>\n        ${logo}\n        <div>\n          <div>\n            <h3>Businesses &amp; Products</h3>\n            <ul><li><a href="/sony/sonyinfo/products">Products &amp; Services</a></li><li><a href="/sony/sonyinfo/technology">Technology</a></li></ul>\n          </div>\n          <div>\n            <h3>About Sony Group</h3>\n            <ul><li><a href="/sony/sonyinfo/corporateinfo">Corporate Info</a></li><li><a href="/sony/sonyinfo/csr">Sustainability</a></li><li><a href="/sony/sonyinfo/design">Design</a></li></ul>\n          </div>\n          <div>\n            <h3>People</h3>\n            <ul><li><a href="/sony/sonyinfo/careers">Careers</a></li><li><a href="/sony/sonyinfo/ir">Investor Relations</a></li></ul>\n          </div>\n          <div>\n            <h3>News</h3>\n            <ul><li><a href="/sony/sonyinfo/news/press">News Releases</a></li><li><a href="/sony/sonyinfo/blog">Corporate Blog</a></li></ul>\n          </div>\n        </div>\n      </div>\n      <div>\n        <p><a href="/sony/copyright">Terms and Conditions</a> <a href="/sony/privacy">Privacy Policy</a> © 2026 Sony Group Corporation</p>\n      </div>`;
  return `<body>\n  <main>\n    <div>\n${cols}\n    </div>\n  </main>\n</body>\n`;
}

// =====================================================================
// HOME
// =====================================================================
write('sony/index', page([
  meta([['Title', 'Sony Group Portal'], ['Description', esc(pageDesc('en') || 'Sony Group Corporation — creativity and technology.')], ['template', 'home']]),
  sectionWrap(heroBlock([
    { img: '/media/sony/a44b56-en_20260626_spiderman-brandnewdaytrailer_image_l.jpg', title: "It's a Brand New Day For Peter Parker", alt: 'Spider-Man: Brand New Day key visual', href: '/sony/brand' },
    { img: '/media/sony/8bab54-en_20260626_bravia-shortfilm_image_l.jpg', title: 'BRAVIA Short Film', href: '/sony/sonyinfo/products' },
    { img: '/media/sony/a00676-en_20260626_legacyofsound_image_l.jpg', title: 'Legacy of Sound', href: '/sony/sonyinfo/products' },
    { img: '/media/sony/ace38f-en_20260626_1000x-bts_image_l.jpg', title: 'WH-1000X Behind the Scenes', href: '/sony/sonyinfo/products' },
  ]), 'full-bleed'),
  sectionWrap(`      <div class="default-content-wrapper"><h2>Explore Sony</h2></div>\n${cardsBlock([
    { label: 'Businesses & Products', href: '/sony/sonyinfo/products', img: '/media/sony/69f691-mv.png' },
    { label: 'Technology', href: '/sony/sonyinfo/technology', img: '/media/sony/c0abe2-copy_of_sony_technology_2nd_pc.jpg' },
    { label: 'Sustainability', href: '/sony/sonyinfo/csr', img: '/media/sony/479fa8-cdms0a0000000465.jpg' },
    { label: 'Design', href: '/sony/sonyinfo/design', img: '/media/sony/a9e8a4-about.jpg' },
    { label: 'Careers', href: '/sony/sonyinfo/careers', img: '/media/sony/f4b8d6-careers-img06.png' },
    { label: 'Investor Relations', href: '/sony/sonyinfo/ir', img: '/media/sony/b71097-ir_kv.png' },
  ])}`),
  sectionWrap(`      <div class="default-content-wrapper"><h2>Latest News</h2></div>\n${newsBlock([
    { date: 'Jun 23, 2026', title: 'Sony Group Corporation Director Appointments', href: '/sony/sonyinfo/news/press/202606/26-015e' },
    { date: 'Jun 19, 2026', title: 'Sony Partners with UNHCR to Support Emergency Humanitarian Response', href: '/sony/sonyinfo/news/press/202606/26-014e' },
  ])}`, 'surface'),
]));

// =====================================================================
// SECTION-LANDING pages
// =====================================================================
const SECTIONS = [
  { p: 'sony/sonyinfo/products', slug: 'en-sonyinfo-products', h1: 'Businesses & Products', img: '/media/sony/69f691-mv.png',
    cards: [
      { label: 'New Initiatives', href: 'https://www.sony.com/en/SonyInfo/products/#new-initiatives' },
      { label: 'Electronics', href: 'https://www.sony.com/en/SonyInfo/products/#electronics' },
      { label: 'Games & Network Services', href: 'https://www.sony.com/en/SonyInfo/products/' },
      { label: 'Pictures', href: 'https://www.sony.com/en/SonyInfo/products/' },
      { label: 'Music', href: 'https://www.sony.com/en/SonyInfo/products/' },
      { label: 'Financial Services', href: 'https://www.sony.com/en/SonyInfo/products/' },
    ] },
  { p: 'sony/sonyinfo/corporateinfo', slug: 'en-sonyinfo-corporateinfo', h1: 'About Sony Group', img: '/media/sony/3f7aee-main-pic-brandbanner.png',
    cards: [
      { label: "Sony's Purpose & Values", href: '/sony/sonyinfo/corporateinfo/purpose_and_values' },
      { label: 'Message from the CEO', href: '/sony/sonyinfo/message' },
      { label: 'History', href: 'https://www.sony.com/en/SonyInfo/CorporateInfo/History/' },
      { label: 'Corporate Data', href: 'https://www.sony.com/en/SonyInfo/CorporateInfo/data/' },
      { label: 'Affiliated Companies', href: 'https://www.sony.com/en/SonyInfo/CorporateInfo/Subsidiaries/' },
    ] },
  { p: 'sony/sonyinfo/technology', slug: 'en-sonyinfo-technology', h1: 'Technology', img: '/media/sony/c0abe2-copy_of_sony_technology_2nd_pc.jpg',
    cards: [
      { label: 'Chief Digital Officer Message', href: 'https://www.sony.com/en/SonyInfo/technology/kodera_message/' },
      { label: 'Tech Stories', href: 'https://www.sony.com/en/SonyInfo/technology/stories/' },
      { label: 'Programs & Events', href: 'https://www.sony.com/en/SonyInfo/technology/programs_events/' },
      { label: 'Corporate Distinguished Engineer', href: 'https://www.sony.com/en/SonyInfo/technology/activities/distinguished_engineer/' },
      { label: 'Publications', href: 'https://www.sony.com/en/SonyInfo/technology/publications/' },
    ] },
  { p: 'sony/sonyinfo/csr', slug: 'en-sonyinfo-csr', h1: 'Sustainability', img: '/media/sony/479fa8-cdms0a0000000465.jpg',
    cards: [
      { label: 'Vision of Founder and Basic Policy', href: 'https://www.sony.com/en/SonyInfo/csr/vision/' },
      { label: 'Sustainability Report', href: 'https://www.sony.com/en/SonyInfo/csr_report/' },
      { label: 'Social Contribution', href: 'https://www.sony.com/en/SonyInfo/csr/community/' },
      { label: 'Diversity', href: 'https://www.sony.com/en/SonyInfo/diversity/' },
      { label: 'Accessibility', href: 'https://www.sony.com/en/SonyInfo/accessibility/' },
    ] },
  { p: 'sony/sonyinfo/design', slug: 'en-sonyinfo-design', h1: 'Design', img: '/media/sony/a9e8a4-about.jpg',
    cards: [
      { label: 'About', href: 'https://www.sony.com/en/SonyInfo/design/about/' },
      { label: 'Design Stories', href: '/sony/sonyinfo/design/stories' },
      { label: 'Interviews & Lectures', href: 'https://www.sony.com/en/SonyInfo/design/interviews-lectures/' },
      { label: 'Gallery', href: 'https://www.sony.com/en/SonyInfo/design/gallery/' },
      { label: 'News', href: 'https://www.sony.com/en/SonyInfo/design/news/' },
    ] },
  { p: 'sony/sonyinfo/careers', slug: 'en-sonyinfo-careers', h1: 'Careers', img: '/media/sony/f4b8d6-careers-img06.png',
    cards: [
      { label: 'Careers Top', href: 'https://www.sony.com/en/SonyInfo/Careers/' },
      { label: 'Employees / Careers', href: 'https://www.sony.com/en/SonyInfo/Employee/' },
    ] },
  { p: 'sony/sonyinfo/ir', slug: 'en-sonyinfo-ir', h1: 'Investor Relations', img: '/media/sony/b71097-ir_kv.png',
    cards: [
      { label: 'IR News', href: 'https://www.sony.com/en/SonyInfo/IR/news/2026.html' },
      { label: 'IR Library', href: 'https://www.sony.com/en/SonyInfo/IR/library/' },
      { label: 'Corporate Report', href: 'https://www.sony.com/en/SonyInfo/IR/library/corporatereport/' },
      { label: 'Earnings Announcement', href: 'https://www.sony.com/en/SonyInfo/IR/library/presen/er/archive.html' },
      { label: 'Corporate Bonds & Ratings', href: 'https://www.sony.com/en/SonyInfo/IR/stock/convert.html' },
    ] },
];
for (const s of SECTIONS) {
  const desc = pageDesc(s.slug) || `Explore ${s.h1} at Sony Group Corporation.`;
  write(s.p, page([
    meta([['Title', `${s.h1} — Sony Group`], ['Description', esc(desc)], ['template', 'section-landing']]),
    sectionWrap(heroBlock([{ img: s.img, title: s.h1 }]), 'full-bleed'),
    sectionWrap(defaultContent(`        <p>${esc(desc)}</p>`).trim().replace(/^ {6}/, '')),
    sectionWrap(`      <div class="default-content-wrapper"><h2>Explore ${esc(s.h1)}</h2></div>\n${cardsBlock(s.cards, 'links')}`, 'surface'),
  ]));
}

// =====================================================================
// LISTING pages
// =====================================================================
write('sony/sonyinfo/news/press', page([
  meta([['Title', 'News Releases — Sony Group'], ['Description', 'Latest news releases from Sony Group Corporation.'], ['template', 'listing']]),
  sectionWrap(`      <div class="default-content-wrapper"><h1>News Releases</h1></div>`),
  sectionWrap(newsBlock([
    { date: 'Jun 23, 2026', title: 'Sony Group Corporation Director Appointments', href: '/sony/sonyinfo/news/press/202606/26-015e' },
    { date: 'Jun 19, 2026', title: 'Sony Partners with UNHCR to Support Emergency Humanitarian Response', href: '/sony/sonyinfo/news/press/202606/26-014e' },
  ], 'list')),
]));

write('sony/sonyinfo/blog', page([
  meta([['Title', 'Sony Corporate Blog — Sony Group'], ['Description', esc(pageDesc('en-sonyinfo-blog') || 'Stories of value creation at Sony.')], ['template', 'listing']]),
  sectionWrap(`      <div class="default-content-wrapper"><h1>Sony Corporate Blog</h1><p>${esc(pageDesc('en-sonyinfo-blog') || 'Stories of value creation at Sony.')}</p></div>`),
  sectionWrap(cardsBlock([
    { label: 'The Global Power of Anime', href: 'https://www.sony.com/en/SonyInfo/blog/', img: '/media/sony/3f7aee-main-pic-brandbanner.png' },
    { label: 'In Celebration of Global Accessibility Awareness', href: 'https://www.sony.com/en/SonyInfo/blog/' },
    { label: 'Sony Pictures at CinemaCon 2026', href: 'https://www.sony.com/en/SonyInfo/blog/' },
    { label: 'Sony Group Corporate Strategy 2026', href: 'https://www.sony.com/en/SonyInfo/blog/' },
  ], 'story')),
]));

// =====================================================================
// ARTICLE pages
// =====================================================================
function articlePage(p, { title, desc, h1, date, newsdate, body, sourceUrl, template = 'article', leadImg, ogImg }) {
  const m = [['Title', esc(title)], ['Description', esc(desc)], ['template', template]];
  if (newsdate) m.push(['newsDate', esc(newsdate)]);
  if (date) m.push(['publishDate', esc(date)]);
  if (ogImg) m.push(['og:image', localToDa(ogImg)]);
  const paras = body.map((b) => `        <p>${esc(b)}</p>`).join('\n');
  const dateLine = newsdate ? `        <p class="article-date">${esc(newsdate)}</p>\n` : '';
  const lead = leadImg ? sectionWrap(`      <div class="default-content-wrapper">${img(leadImg, h1)}</div>`) : '';
  const src = sourceUrl ? `\n        <p><a href="${sourceUrl}">Read the full release on sony.com →</a></p>` : '';
  return page([
    meta(m),
    sectionWrap(`      <div class="default-content-wrapper">\n${dateLine}        <h1>${esc(h1)}</h1>\n      </div>`),
    ...(lead ? [lead] : []),
    sectionWrap(`      <div class="default-content-wrapper">\n${paras}${src}\n      </div>`),
  ]);
}

write('sony/sonyinfo/news/press/202606/26-015e', articlePage('sony/sonyinfo/news/press/202606/26-015e', {
  title: 'Sony Group Corporation Director Appointments',
  desc: 'Sony Group Corporation announced the appointment of members to its Board of Directors.',
  h1: 'Sony Group Corporation Director Appointments',
  date: '2026-06-23', newsdate: 'Jun 23, 2026',
  body: cleanBody('en-sonyinfo-news-press-202606-26-015e-index-html', 9).filter((b) => !/^Sony Group Corporation Director Appointments$/.test(b)),
  sourceUrl: 'https://www.sony.com/en/SonyInfo/News/Press/202606/26-015E/index.html',
}));

write('sony/sonyinfo/news/press/202606/26-014e', articlePage('sony/sonyinfo/news/press/202606/26-014e', {
  title: 'Sony Partners with UNHCR for Emergency Humanitarian Response',
  desc: 'Sony partners with UNHCR to support emergency humanitarian assistance and higher education for refugee students.',
  h1: 'Sony Partners with UNHCR to Support Emergency Humanitarian Response',
  date: '2026-06-19', newsdate: 'Jun 19, 2026',
  body: ['Sony Group Corporation announced a partnership with UNHCR, the UN Refugee Agency, to support emergency humanitarian assistance and higher education for refugee students.'],
  sourceUrl: 'https://www.sony.com/en/SonyInfo/News/Press/202606/26-014E/index.html',
}));

write('sony/sonyinfo/message', articlePage('sony/sonyinfo/message', {
  title: 'Message from the CEO — Sony Group',
  desc: 'A message from the CEO of Sony Group Corporation.',
  h1: 'Message from the CEO',
  body: cleanBody('en-sonyinfo-message', 8),
  sourceUrl: 'https://www.sony.com/en/SonyInfo/message/',
}));

write('sony/sonyinfo/corporateinfo/purpose_and_values', articlePage('sony/sonyinfo/corporateinfo/purpose_and_values', {
  title: "Sony's Purpose & Values — Sony Group",
  desc: esc(pageDesc('en-sonyinfo-corporateinfo-purpose-and-values') || "Sony's Purpose and Values."),
  h1: "Sony's Purpose & Values",
  body: cleanBody('en-sonyinfo-corporateinfo-purpose-and-values', 8),
  sourceUrl: 'https://www.sony.com/en/SonyInfo/CorporateInfo/purpose_and_values/',
}));

// =====================================================================
// EDITORIAL pages
// =====================================================================
write('sony/sonyinfo/design/stories', page([
  meta([['Title', 'Design Stories — Sony Design'], ['Description', esc(pageDesc('en-sonyinfo-design-stories') || 'Stories from Sony Design.')], ['template', 'editorial']]),
  sectionWrap(`      <div class="default-content-wrapper"><h1>Design Stories</h1></div>`),
  sectionWrap(cardsBlock([
    { label: 'Sakurai Kokeshi x Sony Design', href: 'https://www.sony.com/en/SonyInfo/design/stories/', img: '/media/sony/b94aea-index_kokeshi.jpg', desc: 'Extending the wonders of kokeshi dolls through collaborative design' },
    { label: 'Sony ExploraDream', href: 'https://www.sony.com/en/SonyInfo/design/stories/', img: '/media/sony/fa534c-index_exploradream.jpg', desc: 'A Creative Entertainment Science Museum that ignites young dreams' },
    { label: 'SIGNALS', href: 'https://www.sony.com/en/SonyInfo/design/stories/', img: '/media/sony/106f7d-index_calarts.jpg' },
    { label: 'RX1R III digital still camera', href: 'https://www.sony.com/en/SonyInfo/design/stories/', img: '/media/sony/156f0d-index_rx1riii.jpg', desc: 'Crystallizing beauty through the purity of form and function' },
    { label: 'Sony Semiconductor Solutions', href: 'https://www.sony.com/en/SonyInfo/design/stories/', img: '/media/sony/6a0a93-index_sss.jpg', desc: 'Crafting the vision for a semiconductor business' },
    { label: 'FavoriteSpace', href: 'https://www.sony.com/en/SonyInfo/design/stories/', img: '/media/sony/266347-index_favoritespace.jpg' },
  ], 'story')),
]));

write('sony/brand', page([
  meta([['Title', 'Brand — Sony Group'], ['Description', esc(pageDesc('en-brand') || "Sony's latest brand stories.")], ['template', 'editorial']]),
  sectionWrap(heroBlock([{ img: '/media/sony/3f7aee-main-pic-brandbanner.png', title: 'Brand' }]), 'full-bleed'),
  sectionWrap(`      <div class="default-content-wrapper"><h2>Highlights</h2></div>\n${cardsBlock([
    { label: 'Create Infinite Realities: Create without Limits', href: 'https://www.sony.com/en/brand/', img: '/media/sony/79320d-createinfiniterealities_pc.png' },
    { label: 'Create Infinite Realities: The Last of Us', href: 'https://www.sony.com/en/brand/', img: '/media/sony/84d3cd-createinfiniterealities_thelastofus_pc.jpg' },
    { label: 'Seeds of Emotion', href: 'https://www.sony.com/en/brand/seedsofemotion/esquisse-outro/', img: '/media/sony/0d6a5a-seeds_of_emotion_pc.jpg' },
    { label: 'Beyond the Screen: Future Immersive Experiences', href: 'https://www.sony.com/en/brand/', img: '/media/sony/783328-torchlight_pc.png' },
  ], 'story')}`, 'surface'),
]));

// =====================================================================
// LEGAL pages
// =====================================================================
write('sony/copyright', page([
  meta([['Title', 'Terms and Conditions — Sony Group'], ['Description', 'Terms and conditions for the Sony Group Portal.'], ['template', 'article']]),
  sectionWrap(`      <div class="default-content-wrapper"><h1>Terms and Conditions</h1><p>These terms govern use of the Sony Group Portal. For the complete, authoritative Terms and Conditions, please refer to the source below.</p><p><a href="https://www.sony.com/en/copyright/">View the full Terms and Conditions on sony.com →</a></p></div>`),
]));
write('sony/privacy', page([
  meta([['Title', 'Privacy Policy — Sony Group'], ['Description', 'Privacy policy for the Sony Group Portal.'], ['template', 'article']]),
  sectionWrap(`      <div class="default-content-wrapper"><h1>Privacy Policy</h1><p>This privacy policy explains how Sony Group handles personal information. For the complete, authoritative Privacy Policy, please refer to the source below.</p><p><a href="https://www.sony.com/en/privacy/">View the full Privacy Policy on sony.com →</a></p></div>`),
]));

// ---- chrome fragments ----
write('sony/nav', navFragment());
write('sony/footer', footerFragment());

// ---- emit used-images manifest for upload ----
const uniq = {};
for (const [base, repoPath] of usedImages) { if (repoPath.startsWith('.')) uniq[base] = repoPath; }
writeFileSync('stardust/current/_used-images.json', JSON.stringify(uniq, null, 2));
console.log('generated content pages. used images:', Object.keys(uniq).length);
