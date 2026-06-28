import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const page = (slug) => JSON.parse(readFileSync(`stardust/current/pages/${slug}.json`, 'utf8'));
const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const BAD = /placeholder|product-placeholder|sparkle|gift-card-cup\.svg|\/p\?|1x1/i;
const fixUrl = (u) => u.replace(/([^:])\/\//g, '$1/'); // collapse accidental // (keep scheme)
const dapath = (url) => {
  let p = new URL(url).pathname.replace(/\/$/, '');
  if (!p || p === '') p = '/index';
  return `starbucks${p}`;
};
const clip = (s, n) => (s && s.length > n ? `${s.slice(0, n - 1)}…` : (s || ''));

function shell(title, desc, sections) {
  const meta = `    <div>
      <div class="metadata">
        <div><div>Title</div><div>${esc(clip(title, 60))}</div></div>
        <div><div>Description</div><div>${esc(clip(desc, 160))}</div></div>
      </div>
    </div>`;
  return `<body>
  <header></header>
  <main>
${meta}
${sections.join('\n')}
  </main>
  <footer></footer>
</body>
`;
}

const titleBand = (h1, lede) => `    <div class="section foam">
      <div>
        <h1>${esc(h1)}</h1>
        ${lede ? `<p>${esc(lede)}</p>` : ''}
      </div>
    </div>`;

const photoHero = (img, alt, eyebrow, h1, ctaLabel, ctaHref) => `    <div class="section full">
      <div class="hero full">
        <div><div><img src="${fixUrl(img)}" alt="${esc(alt)}"></div></div>
        ${eyebrow ? `<div><div><p>${esc(eyebrow)}</p></div></div>` : ''}
        <div><div><h1>${esc(h1)}</h1></div></div>
        <div><div><p><strong><a href="${ctaHref}">${esc(ctaLabel)}</a></strong></p></div></div>
      </div>
    </div>`;

const cardRow = (img, alt, title, href, ctaLabel) => {
  const media = img ? `<div><img src="${fixUrl(img)}" alt="${esc(alt || title)}"></div>` : '';
  let textCell;
  if (ctaLabel && href) textCell = `<div><h3>${esc(title)}</h3><p><strong><a href="${href}">${esc(ctaLabel)}</a></strong></p></div>`;
  else if (href) textCell = `<div><h3><a href="${href}">${esc(title)}</a></h3></div>`;
  else textCell = `<div><h3>${esc(title)}</h3></div>`;
  return `        <div>${media}${textCell}</div>`;
};

const cardsBlock = (variant, rows) => `    <div class="section">
      <div class="cards ${variant}">
${rows.join('\n')}
      </div>
    </div>`;

const out = [];
function emit(url, html) {
  const p = dapath(url);
  const fp = `content/${p}.html`;
  mkdirSync(path.dirname(fp), { recursive: true });
  writeFileSync(fp, html);
  out.push(p);
}

// ---------- HOME ----------
{
  const d = page('index');
  const promos = [
    ['137-108640.jpg', "It's Starbucks summer", '/starbucks/menu/featured', 'Explore the summer menu'],
    ['137-108405.jpg', 'Bold, iced and deliciously classic', '/starbucks/menu/drinks/cold-coffee', 'Order a cold coffee'],
    ['137-108664.jpg', 'Good energy in every sip', '/starbucks/menu/drinks/refreshers', 'Try one now'],
    ['137-109052.jpg', 'One night with Myles Smith', 'https://mylessmith.marriottbonvoy.starbucks.com/', 'Enter sweepstakes'],
  ];
  const alts = {
    '137-108640.jpg': 'Three pink, purple and orange layered drinks and an iced coffee on a sun-drenched table outside.',
    '137-108405.jpg': 'Three cold coffee drinks in glasses on a café table by a window.',
    '137-108664.jpg': 'A Mango Dragonfruit Lemonade Energy Refresher and a Strawberry Açaí Energy Refresher on a café table.',
    '137-109052.jpg': 'The top half of a person looking outward in front of a round spotlight glow.',
  };
  const base = 'https://content-prod-live.cert.starbucks.com/binary/v2/asset/';
  const rows = promos.map(([img, t, href, cta]) => cardRow(base + img, alts[img], t, href, cta));
  const hero = photoHero(`${base}137-108864.jpg`, 'An iced blue drink next to an iced matcha with light-blue cold foam on a light-gray surface.', "It's a great day for coffee", 'New: Blue coconut for a cause', 'Start an order', '/starbucks/menu');
  emit(d.url, shell(d.title, d.description, [hero, cardsBlock('promo', rows)]));
}

// ---------- MENU OVERVIEW ----------
{
  const d = page('menu');
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
  const cats = d.media.imgs.filter((i) => i.alt && i.src.includes('cloudassets') && links[i.alt]);
  const seen = new Set();
  const rows = cats.filter((c) => !seen.has(c.alt) && seen.add(c.alt)).map((c) => cardRow(c.src, c.alt, c.alt, links[c.alt]));
  emit(d.url, shell(d.title, d.description, [titleBand('Menu', 'Explore our full menu of handcrafted drinks and food — from hot and cold coffee to refreshers, tea, breakfast and bakery.'), cardsBlock('categories', rows)]));
}

// ---------- MENU FEATURED ----------
{
  const d = page('menu-featured');
  const heads = d.headings.filter((h) => h.tag === 'h2' && !['About Us', 'Careers', 'Social Impact', 'For Business Partners', 'Order and Pick Up'].includes(h.text)).map((h) => h.text);
  const imgs = [];
  const seen = new Set();
  d.media.imgs.filter((i) => i.w > 100 && i.src.includes('binary')).forEach((i) => { if (!seen.has(i.src)) { seen.add(i.src); imgs.push(i); } });
  const rows = heads.slice(0, 12).map((t, i) => cardRow(imgs[i] ? imgs[i].src : null, imgs[i] ? imgs[i].alt : t, t)).filter(Boolean);
  emit(d.url, shell(d.title, d.description, [titleBand('Summer starts here', 'The latest seasonal drinks and limited-time favorites at Starbucks.'), cardsBlock('products', rows)]));
}

// ---------- PRODUCT CATEGORY PAGES ----------
const catSlugs = ['menu-drinks-hot-coffee', 'menu-drinks-cold-coffee', 'menu-drinks-hot-tea', 'menu-drinks-cold-tea',
  'menu-drinks-refreshers', 'menu-drinks-protein-beverages', 'menu-drinks-frappuccino-blended-beverage',
  'menu-drinks-hot-chocolate-lemonade-more', 'menu-drinks-bottled-beverages', 'menu-food-breakfast',
  'menu-food-bakery', 'menu-food-treats', 'menu-food-lunch', 'menu-at-home-coffee-whole-bean'];
catSlugs.forEach((slug) => {
  const d = page(slug);
  const h1 = d.headings.find((h) => h.tag === 'h1')?.text || 'Menu';
  const prods = d.media.imgs.filter((i) => i.src.includes('cloudassets') && i.alt && !BAD.test(i.src)).slice(0, 24);
  const rows = prods.map((p) => cardRow(p.src, p.alt, p.alt));
  emit(d.url, shell(d.title, d.description, [titleBand(h1, `Order ${h1.replace(/®|™/g, '').toLowerCase()} for pickup or delivery. Handcrafted just the way you like it.`), cardsBlock('products', rows)]));
}); // snacks handled as thin page below

// ---------- SNACKS (thin — content gap logged) ----------
{
  const d = page('menu-food-snacks');
  const body = `    <div class="section foam">
      <div>
        <h1>Snacks</h1>
        <p>Grab a little something to go with your drink. Browse snacks and more on the Starbucks app or order ahead.</p>
        <p class="button-container"><a href="/starbucks/menu" class="button">Back to menu</a></p>
      </div>
    </div>`;
  emit(d.url, shell('Snacks: Starbucks Coffee Company', 'Browse Starbucks snacks and order ahead for pickup or delivery.', [body]));
}

// ---------- REWARDS ----------
{
  const d = page('rewards');
  const hero = photoHero('https://www.starbucks.com/weblx/images/sr6-rewards/hero-unauth-US.png', 'Starbucks Rewards', 'Starbucks® Rewards', 'Free coffee is just the beginning', 'Join now', '/account/create');
  const steps1 = `    <div class="section">
      <div>
        <h2>How it works</h2>
      </div>
      <div class="steps">
        <div><div><h3>Collect Stars</h3><p>Earn Stars on every purchase and get closer to a free reward.</p></div></div>
        <div><div><h3>Enjoy free treats</h3><p>Redeem Stars for handcrafted drinks, food and more.</p></div></div>
        <div><div><h3>Unlock benefits</h3><p>Get rewarded for your routine with member-only perks.</p></div></div>
      </div>
    </div>`;
  const steps2 = `    <div class="section foam">
      <div>
        <h2>Free to join, easy to get started</h2>
      </div>
      <div class="steps">
        <div><div><h3>Create an account</h3><p>Sign up for free in the app or online.</p></div></div>
        <div><div><h3>Order and pay your way</h3><p>Scan, order ahead or pay in-store however you like.</p></div></div>
        <div><div><h3>Earn Stars, get Rewards</h3><p>Watch your Stars add up toward free favorites.</p></div></div>
      </div>
      <div>
        <p class="button-container"><a href="/account/create" class="button">Join now</a></p>
      </div>
    </div>`;
  emit(d.url, shell(d.title, d.description, [hero, steps1, steps2]));
}

// ---------- STORES AND ORDERING ----------
{
  const d = page('stores-and-ordering');
  const imgs = d.media.imgs.filter((i) => i.alt && i.src.includes('binary'));
  const blurbs = {
    'Classic Café': 'Settle in with a handcrafted drink in a warm, welcoming space.',
    'Drive-thru': 'Grab your favorites on the go without leaving your car.',
    'Starbucks Reserve® and Starbucks Reserve® Roastery': 'Discover rare, small-lot coffees and immersive experiences.',
    Delivery: 'Get Starbucks delivered right to your door.',
    'Groceries, Airports, Hotels & More': 'Find Starbucks in the places you already go.',
  };
  const seen = new Set();
  const rows = imgs.filter((i) => !seen.has(i.alt) && seen.add(i.alt)).slice(0, 5).map((im) => `        <div>
          <div><img src="${fixUrl(im.src)}" alt="${esc(im.alt)}"></div>
          <div><h2>${esc(im.alt)}</h2><p>${esc(blurbs[im.alt] || 'A Starbucks experience made for you.')}</p></div>
        </div>`);
  const cols = `    <div class="section">
      <div class="columns">
${rows.join('\n')}
      </div>
      <div>
        <p class="button-container"><a href="/store-locator" class="button">Find a store</a></p>
      </div>
    </div>`;
  emit(d.url, shell(d.title, d.description, [titleBand('A store for everyone', 'However you like to enjoy Starbucks, there’s a way to order made for you — in-store, drive-thru, delivery and more.'), cols]));
}

// ---------- GIFT ----------
{
  const d = page('gift');
  const labels = ['Featured', 'Summer', 'Miffy x Starbucks', 'Graduation', 'Birthday', 'Thank You', 'Celebration', 'Appreciation', 'Encouragement', 'Workplace', 'Anytime'];
  const cards = d.media.imgs.filter((i) => i.src.includes('cloudassets') && !BAD.test(i.src)).slice(0, 12);
  const seen = new Set();
  const rows = cards.filter((c) => !seen.has(c.src) && seen.add(c.src)).map((c, i) => cardRow(c.src, labels[i] || 'Starbucks Gift Card', labels[i] || 'Gift Card', '/starbucks/gift'));
  emit(d.url, shell(d.title, d.description, [titleBand('Starbucks® Gift Cards', 'Gift the perfect cup. Send a digital card by email or browse physical cards for every occasion.'), cardsBlock('gifts', rows)]));
}

// ---------- ABOUT US ----------
{
  const d = page('about-us');
  const imgs = d.media.imgs.filter((i) => i.src.includes('binary'));
  const paras = d.body.filter((b) => b.length > 60).slice(0, 4);
  const heads = ['Our Heritage', 'Coffee & Craft', 'Our Partners', 'Doing Good'];
  const rows = paras.map((p, i) => `        <div>
          <div><img src="${fixUrl(imgs[i % imgs.length].src)}" alt="${esc(heads[i])}"></div>
          <div><h2>${esc(heads[i])}</h2><p>${esc(p)}</p></div>
        </div>`);
  const cols = `    <div class="section">
      <div class="columns">
${rows.join('\n')}
      </div>
    </div>`;
  emit(d.url, shell(d.title, d.description, [titleBand('Our Company', 'Our story begins in 1971 along the cobblestone streets of Seattle’s historic Pike Place Market.'), cols]));
}

// ---------- CONTACT ----------
{
  const d = page('contact');
  const items = [
    ['Customer Service', 'Questions about your order, the app, Rewards or a recent visit? Our Customer Service team is here to help.', 'https://customerservice.starbucks.com/'],
    ['Media Contacts', 'For press and media inquiries, reach the Starbucks newsroom.', 'https://about.starbucks.com/'],
    ['Investor Relations', 'Financial information and investor resources.', 'https://investor.starbucks.com'],
    ['Partnership and Sponsorship Requests', 'Submit a partnership or sponsorship request.', 'https://customerservice.starbucks.com/'],
  ];
  const body = `    <div class="section">
      <div>
        <h2>How can we help?</h2>
        ${items.map(([h, p, href]) => `<h3><a href="${href}">${esc(h)}</a></h3>\n        <p>${esc(p)}</p>`).join('\n        ')}
      </div>
    </div>`;
  emit(d.url, shell(d.title, d.description, [titleBand('Contact Us', 'We’d love to hear from you. Choose the team that best fits your question.'), body]));
}

// ---------- NAV FRAGMENT ----------
{
  const nav = `<body>
  <header></header>
  <main>
    <div>
      <ul>
        <li><a href="/starbucks/menu">Menu</a></li>
        <li><a href="/starbucks/rewards">Rewards</a></li>
        <li><a href="/starbucks/gift">Gift Cards</a></li>
        <li><a href="/store-locator">Find a store</a></li>
      </ul>
      <ul>
        <li><a href="/account/signin">Sign in</a></li>
        <li><a href="/account/create">Join now</a></li>
      </ul>
    </div>
  </main>
  <footer></footer>
</body>
`;
  mkdirSync('content/starbucks', { recursive: true });
  writeFileSync('content/starbucks/nav.html', nav);
  out.push('starbucks/nav');
}

// ---------- FOOTER FRAGMENT ----------
{
  const cols = {
    'About Us': [['Our Company', '/starbucks/about-us'], ['Our Coffee', 'https://about.starbucks.com/stories/category/coffee-products/coffee/'], ['Investor Relations', 'https://investor.starbucks.com'], ['Contact Us', '/starbucks/contact']],
    Careers: [['Culture and Values', 'https://careers.starbucks.com/culture/'], ['Belonging at Starbucks', 'https://about.starbucks.com/belonging-at-starbucks/'], ['College Achievement Plan', 'https://careers.starbucks.com/benefits/education/'], ['U.S. Careers', 'https://careers.starbucks.com/']],
    'Social Impact': [['Communities', 'https://about.starbucks.com/communities/'], ['Starbucks Foundation', 'https://about.starbucks.com/the-starbucks-foundation/'], ['Sustainability', 'https://about.starbucks.com/sustainability/'], ['Reporting Hub', 'https://www.starbucks.com/responsibility/reporting-hub/']],
    'For Business Partners': [['Landlord Support Center', 'https://www.starbucks.com/business/landlord-faq/'], ['Suppliers', 'https://www.starbucks.com/business/suppliers/'], ['Corporate Gift Card Sales', 'https://www.starbuckscardb2b.com/']],
    'Order and Pick Up': [['Order on the App', 'https://www.starbucks.com/rewards/mobile-apps/'], ['Order on the Web', '/starbucks/menu'], ['Delivery', 'https://www.starbucks.com/stores-and-ordering/delivery/'], ['Order and Pick Up Options', '/starbucks/stores-and-ordering']],
  };
  const legal = [['Privacy Notice', 'https://www.starbucks.com/terms/privacy-notice/'], ['Terms of Use', 'https://www.starbucks.com/terms/starbucks-terms-of-use/'], ['Do Not Sell or Share My Personal Information', 'https://www.starbucks.com/personal-information'], ['Accessibility', 'https://www.starbucks.com/about-us/accessibility/']];
  let body = '<body>\n  <header></header>\n  <main>\n    <div>\n';
  for (const [h, links] of Object.entries(cols)) {
    body += `      <h4>${esc(h)}</h4>\n      <ul>\n`;
    links.forEach(([t, href]) => { body += `        <li><a href="${href}">${esc(t)}</a></li>\n`; });
    body += '      </ul>\n';
  }
  body += '      <ul>\n';
  legal.forEach(([t, href]) => { body += `        <li><a href="${href}">${esc(t)}</a></li>\n`; });
  body += '      </ul>\n    </div>\n  </main>\n  <footer></footer>\n</body>\n';
  writeFileSync('content/starbucks/footer.html', body);
  out.push('starbucks/footer');
}

console.log(`wrote ${out.length} docs:`);
out.forEach((p) => console.log('  ', p));
