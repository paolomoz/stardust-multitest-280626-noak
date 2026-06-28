import { readFileSync, writeFileSync } from 'node:fs';

const SCRATCH = '/private/tmp/claude-502/-Users-paolo-stardust-rollout-multitest-280626-noak/832349fd-ea09-4437-99d4-9d49d4adea77/scratchpad/chrome.json';
const { style, header, footer, script } = JSON.parse(readFileSync(SCRATCH, 'utf8'));
const page = (slug) => JSON.parse(readFileSync(`stardust/current/pages/${slug}.json`, 'utf8'));
const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const BAD = /placeholder|product-placeholder|\/p\?|1x1|sparkle/i;
const realImgs = (d) => d.media.imgs.filter((i) => i.src && !BAD.test(i.src) && i.w !== 1);

// extra block CSS appended to shared style
const extraCSS = `<style>
.page-hero{background:var(--foam);padding:56px 0 40px;border-bottom:1px solid var(--hairline)}
.page-hero h1{font-size:clamp(2.2rem,4.5vw,3.4rem);color:var(--espresso)}
.page-hero p.lede{margin-top:14px;max-width:60ch;color:var(--slate);font-size:18px}
.section{padding:var(--pad-d) 0}
.section.alt{background:var(--foam)}
.section.cream{background:var(--cream)}
.section h2{font-size:clamp(1.6rem,3vw,2.2rem);color:var(--espresso);margin-bottom:8px}
.section .grp-sub{color:var(--slate);margin-bottom:24px;max-width:60ch}
.grid-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:22px}
.pcard{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px}
.pcard .ph{width:140px;height:140px;border-radius:50%;overflow:hidden;background:var(--cream);box-shadow:0 1px 3px rgba(0,0,0,.08)}
.pcard .ph img{width:100%;height:100%;object-fit:cover}
.pcard h3{font-size:16px;color:var(--ink);line-height:1.25}
.cat-card{background:#fff;border-radius:var(--card-r);overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);text-align:center;transition:transform .25s var(--ease),box-shadow .25s var(--ease)}
.cat-card:hover{transform:translateY(-4px);box-shadow:0 8px 22px rgba(0,0,0,.12)}
.cat-card .ph{aspect-ratio:1;background:var(--cream)}
.cat-card .ph img{width:100%;height:100%;object-fit:cover}
.cat-card h3{padding:16px 12px;font-size:16px;color:var(--espresso)}
.feature-row{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-bottom:56px}
.feature-row:nth-child(even) .fr-media{order:2}
.feature-row .fr-media img{width:100%;border-radius:var(--card-r);box-shadow:0 4px 18px rgba(0,0,0,.1)}
.feature-row h2{margin-bottom:14px}
.feature-row p{color:var(--slate);font-size:17px}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:32px}
.step{text-align:center}
.step .num{width:48px;height:48px;border-radius:50%;background:var(--house-green);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:20px}
.step h3{color:var(--espresso);margin-bottom:8px}
.step p{color:var(--slate)}
.prose{max-width:72ch}
.prose p{margin-bottom:18px;font-size:18px;color:var(--ink)}
.contact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
.contact-card{background:#fff;border:1px solid var(--hairline);border-radius:var(--card-r);padding:26px}
.contact-card h3{color:var(--espresso);margin-bottom:10px}
.contact-card p{color:var(--slate)}
@media(max-width:760px){.feature-row{grid-template-columns:1fr;gap:24px}.feature-row:nth-child(even) .fr-media{order:0}.steps{grid-template-columns:1fr}}
</style>`;

function shell(slug, title, desc, body) {
  return `<!doctype html>
<html lang="en">
<head>
<!-- _provenance: { writtenBy: "stardust:prototype (reuses home canon)", slug: "${slug}", mode: "A brand-faithful", surprise: "low", voiceClassification: "captured-verbatim", unsourcedContent: [] } -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#006341">
${style}
${extraCSS}
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
${header}
<main id="main">
${body}
</main>
${footer}
${script}
</body>
</html>`;
}

const pageHero = (h1, lede) => `<section class="page-hero" data-section="page-hero"><div class="wrap"><h1>${esc(h1)}</h1>${lede ? `<p class="lede">${esc(lede)}</p>` : ''}</div></section>`;

// ---------- menu overview: category cards ----------
function buildMenu() {
  const d = page('menu');
  const cats = realImgs(d).filter((i) => i.alt).slice(0, 16);
  const links = {
    'Hot Coffee': '/starbucks/menu/drinks/hot-coffee', 'Cold Coffee': '/starbucks/menu/drinks/cold-coffee',
    'Hot Tea': '/starbucks/menu/drinks/hot-tea', 'Cold Tea': '/starbucks/menu/drinks/cold-tea',
    Refreshers: '/starbucks/menu/drinks/refreshers', 'Protein Beverages': '/starbucks/menu/drinks/protein-beverages',
    'Frappuccino® Blended Beverage': '/starbucks/menu/drinks/frappuccino-blended-beverage',
    'Hot Chocolate, Lemonade & More': '/starbucks/menu/drinks/hot-chocolate-lemonade-more',
    'Bottled Beverages': '/starbucks/menu/drinks/bottled-beverages', Breakfast: '/starbucks/menu/food/breakfast',
    Bakery: '/starbucks/menu/food/bakery', Treats: '/starbucks/menu/food/treats', Lunch: '/starbucks/menu/food/lunch',
    Snacks: '/starbucks/menu/food/snacks',
  };
  const cards = cats.map((c) => `<a class="cat-card" href="${links[c.alt] || '/starbucks/menu'}"><div class="ph"><img src="${c.src}" alt="${esc(c.alt)}" loading="lazy"></div><h3>${esc(c.alt)}</h3></a>`).join('\n');
  const body = pageHero('Menu', 'Explore our full menu of handcrafted drinks and food — from hot and cold coffee to refreshers, tea, breakfast and bakery.')
    + `<section class="section" data-section="cards"><div class="wrap"><h2>Drinks &amp; Food</h2><div class="grid-cards">\n${cards}\n</div></div></section>`;
  return shell('menu', d.title, d.description, body);
}

// ---------- product category: grouped product cards ----------
function buildCategory(slug) {
  const d = page(slug);
  const h1 = d.headings.find((h) => h.tag === 'h1')?.text || 'Menu';
  const prods = d.media.imgs.filter((i) => i.src.includes('cloudassets') && i.alt).slice(0, 24);
  const cards = prods.map((p) => `<div class="pcard"><div class="ph"><img src="${p.src}" alt="${esc(p.alt)}" loading="lazy"></div><h3>${esc(p.alt)}</h3></div>`).join('\n');
  const body = pageHero(h1, `Order ${h1.toLowerCase()} for pickup or delivery. Handcrafted just the way you like it.`)
    + `<section class="section" data-section="cards"><div class="wrap"><h2>${esc(h1)}</h2><div class="grid-cards">\n${cards}\n</div></div></section>`;
  return shell(slug, d.title, d.description, body);
}

// ---------- rewards: hero + steps + tiers + steps2 ----------
function buildRewards() {
  const d = page('rewards');
  const hero = realImgs(d).find((i) => i.src.includes('hero')) || realImgs(d)[0];
  const body = `<section class="hero" data-section="hero" style="min-height:clamp(380px,48vh,520px)"><img src="${hero.src}" alt="Starbucks Rewards" fetchpriority="high"><div class="wrap"><p class="eyebrow">Starbucks® Rewards</p><h1>Free coffee is just the beginning</h1><a class="btn btn-primary" href="/account/create">Join now</a></div></section>`
    + `<section class="section" data-section="steps"><div class="wrap"><h2>How it works</h2><div class="steps">
<div class="step"><div class="num">1</div><h3>Collect Stars</h3><p>Earn Stars on every purchase and get closer to a free reward.</p></div>
<div class="step"><div class="num">2</div><h3>Enjoy free treats</h3><p>Redeem Stars for handcrafted drinks, food and more.</p></div>
<div class="step"><div class="num">3</div><h3>Unlock benefits</h3><p>Get rewarded for your routine with member-only perks.</p></div>
</div></div></section>`
    + `<section class="section alt" data-section="steps"><div class="wrap"><h2>Free to join, easy to get started</h2><div class="steps">
<div class="step"><div class="num">1</div><h3>Create an account</h3><p>Sign up for free in the app or online.</p></div>
<div class="step"><div class="num">2</div><h3>Order and pay your way</h3><p>Scan, order ahead or pay in-store however you like.</p></div>
<div class="step"><div class="num">3</div><h3>Earn Stars, get Rewards</h3><p>Watch your Stars add up toward free favorites.</p></div>
</div><p style="margin-top:32px"><a class="btn btn-primary" href="/account/create">Join now</a></p></div></section>`;
  return shell('rewards', d.title, d.description, body);
}

// ---------- stores-and-ordering: photo hero + feature rows ----------
function buildStores() {
  const d = page('stores-and-ordering');
  const imgs = d.media.imgs.filter((i) => i.alt && i.src.includes('binary'));
  const blurbs = {
    'Classic Café': 'Settle in with a handcrafted drink in a warm, welcoming space.',
    'Drive-thru': 'Grab your favorites on the go without leaving your car.',
    'Starbucks Reserve® and Starbucks Reserve® Roastery': 'Discover rare, small-lot coffees and immersive experiences.',
    Delivery: 'Get Starbucks delivered right to your door.',
    'Groceries, Airports, Hotels & More': 'Find Starbucks in the places you already go.',
  };
  const rows = imgs.slice(0, 5).map((im) => `<div class="feature-row"><div class="fr-media"><img src="${im.src}" alt="${esc(im.alt)}" loading="lazy"></div><div class="fr-text"><h2>${esc(im.alt)}</h2><p>${esc(blurbs[im.alt] || 'A Starbucks experience made for you.')}</p></div></div>`).join('\n');
  const body = pageHero('A store for everyone', 'However you like to enjoy Starbucks, there’s a way to order made for you — in-store, drive-thru, delivery and more.')
    + `<section class="section" data-section="feature-rows"><div class="wrap">\n${rows}\n<p><a class="btn btn-primary" href="/store-locator">Find a store</a></p></div></section>`;
  return shell('stores-and-ordering', d.title, d.description, body);
}

// ---------- gift: hero + gift card catalog ----------
function buildGift() {
  const d = page('gift');
  const cards = d.media.imgs.filter((i) => i.src.includes('cloudassets')).slice(0, 16);
  const labels = ['Featured', 'Summer', 'Miffy x Starbucks', 'Graduation', 'Birthday', 'Thank You', 'Celebration', 'Appreciation', 'Encouragement', 'Workplace', 'Anytime'];
  const grid = cards.map((c, i) => `<a class="cat-card" href="/starbucks/gift"><div class="ph"><img src="${c.src}" alt="${esc(labels[i] || 'Starbucks Gift Card')}" loading="lazy"></div><h3>${esc(labels[i] || 'Gift Card')}</h3></a>`).join('\n');
  const body = pageHero('Starbucks® Gift Cards', 'Gift the perfect cup. Send a digital card by email or browse physical cards for every occasion.')
    + `<section class="section" data-section="cards"><div class="wrap"><h2>Browse gift cards</h2><div class="grid-cards">\n${grid}\n</div></div></section>`;
  return shell('gift', d.title, d.description, body);
}

// ---------- about-us: editorial prose + image rows ----------
function buildAbout() {
  const d = page('about-us');
  const imgs = d.media.imgs.filter((i) => i.src.includes('binary'));
  const paras = d.body.filter((b) => b.length > 60).slice(0, 6);
  const heads = ['Our Heritage', 'Coffee & Craft', 'Our Partners', 'Doing Good'];
  let rows = '';
  paras.forEach((p, i) => {
    const im = imgs[i % imgs.length];
    rows += `<div class="feature-row"><div class="fr-media"><img src="${im.src}" alt="${esc(heads[i % heads.length])}" loading="lazy"></div><div class="fr-text"><h2>${esc(heads[i % heads.length])}</h2><p>${esc(p)}</p></div></div>\n`;
  });
  const body = pageHero('Our Company', 'Our story begins in 1971 along the cobblestone streets of Seattle’s historic Pike Place Market.')
    + `<section class="section" data-section="feature-rows"><div class="wrap">\n${rows}</div></section>`;
  return shell('about-us', d.title, d.description, body);
}

// ---------- contact: directory cards ----------
function buildContact() {
  const d = page('contact');
  const cards = [
    ['Customer Service', 'Questions about your order, the app, Rewards or a recent visit? Our Customer Service team is here to help.', 'https://customerservice.starbucks.com/'],
    ['Media Contacts', 'For press and media inquiries, reach the Starbucks newsroom.', 'https://about.starbucks.com/'],
    ['Investor Relations', 'Financial information and investor resources.', 'https://investor.starbucks.com'],
    ['Partnership and Sponsorship Requests', 'Submit a partnership or sponsorship request.', 'https://customerservice.starbucks.com/'],
  ].map(([h, p, href]) => `<a class="contact-card" href="${href}"><h3>${esc(h)}</h3><p>${esc(p)}</p></a>`).join('\n');
  const body = pageHero('Contact Us', 'We’d love to hear from you. Choose the team that best fits your question.')
    + `<section class="section" data-section="contact"><div class="wrap"><div class="contact-grid">\n${cards}\n</div></div></section>`;
  return shell('contact', d.title, d.description, body);
}

const out = {
  menu: buildMenu(),
  'menu-drinks-hot-coffee': buildCategory('menu-drinks-hot-coffee'),
  rewards: buildRewards(),
  'stores-and-ordering': buildStores(),
  gift: buildGift(),
  'about-us': buildAbout(),
  contact: buildContact(),
};
for (const [slug, html] of Object.entries(out)) {
  writeFileSync(`stardust/prototypes/${slug}-proposed.html`, html);
  console.log('wrote', slug, html.length, 'bytes');
}
