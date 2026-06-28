import { readFileSync, writeFileSync } from 'node:fs';
const home = readFileSync('stardust/prototypes/us-home-proposed.html','utf8');
const style = home.match(/<style>[\s\S]*?<\/style>/)[0];
const header = home.match(/<header[\s\S]*?<\/header>/)[0];
const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0];
// extra CSS for fee-table + article (appended)
const extra = `<style>
.prose{max-width:720px;margin-inline:auto}
.prose h2{font-size:clamp(1.5rem,3vw,2.2rem);margin-top:2.5rem;margin-bottom:.6rem}
.prose p{color:var(--ink);font-size:1.12rem;margin-bottom:1.1rem;max-width:68ch}
.lead-media{max-width:980px;margin:0 auto 2.5rem}
.lead-media img{width:100%;border-radius:var(--r-media);box-shadow:var(--shadow-2)}
.kicker{color:var(--blue);font-family:var(--display);font-weight:800;text-transform:uppercase;letter-spacing:.08em;font-size:.8rem}
.feetabs{display:flex;gap:.5rem;justify-content:center;margin-bottom:2rem;flex-wrap:wrap}
.feetabs a{font-family:var(--display);font-weight:700;border-radius:var(--pill);padding:.5rem 1.3rem;border:2px solid var(--navy);color:var(--navy)}
.feetabs a[aria-current="true"]{background:var(--navy);color:#fff}
table.fees{width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:.98rem;background:#fff;border-radius:var(--r-card);overflow:hidden;box-shadow:var(--shadow-1)}
table.fees caption{font-family:var(--display);font-weight:800;color:var(--navy);text-align:left;font-size:1.2rem;margin-bottom:.6rem}
table.fees th{background:var(--navy);color:#fff;text-align:left;padding:.85rem 1rem;font-family:var(--display)}
table.fees td{padding:.8rem 1rem;border-top:1px solid #e6eaf0;color:var(--ink)}
table.fees tbody tr:nth-child(even){background:var(--surface-alt)}
.faq{max-width:820px;margin-inline:auto}
.faq details{background:#fff;border:1px solid #e6eaf0;border-radius:var(--r-card);padding:1rem 1.25rem;margin-bottom:.75rem}
.faq summary{font-family:var(--display);font-weight:700;color:var(--navy);cursor:pointer;font-size:1.05rem}
.faq p{color:var(--muted);margin-top:.6rem}
.logos{display:flex;flex-wrap:wrap;gap:1.5rem 2.5rem;align-items:center;justify-content:center;margin-top:1.5rem}
.logos img{height:48px;width:auto;object-fit:contain;filter:grayscale(1);opacity:.8}
</style>`;
function page({title,desc,main}){
  return `<!doctype html>
<!-- _provenance: renderedBy: stardust:prototype -> impeccable:craft (sibling of us-home); contentSource captured-verbatim; surprise: low -->
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title><meta name="description" content="${desc}"><meta name="theme-color" content="#012169">
<link rel="icon" href="https://www.paypalobjects.com/marketing/web/icons/monogram/pp32.png">
${style}
${extra}
</head><body>
${header}
<main>
${main}
</main>
${footer}
</body></html>`;
}

// ---- BUSINESS LANDING ----
const business = page({
 title:'Open a Business Account Online | PayPal US',
 desc:'Open a PayPal business account to accept payments online and in-store. Get invoicing tools, fraud protection, and fast payouts.',
 main:`
<section class="hero" data-section="hero">
  <div class="hero-bg"><img src="https://www.paypalobjects.com/marketing/web24/us/business/open-business-account/get-started-hero-v2-media-tablet-up-image1.jpg?quality=75&width=1500&format=webp" alt="Woman adjusting candle wicks in her shop" loading="eager" fetchpriority="high" onerror="this.closest('.hero').style.background='linear-gradient(120deg,var(--navy),var(--blue))';this.remove()"></div>
  <div class="wrap">
    <p class="eyebrow">PayPal Business</p>
    <h1>Open a business account online</h1>
    <p>Get paid. Get growing. Get ahead. Do more with the platform designed to power commerce.</p>
    <a class="btn btn-on-navy" href="https://www.paypal.com/unifiedonboarding/entry?country.x=US&locale.x=en_US&products=business_account">Sign Up</a>
  </div>
</section>
<section class="ways" data-section="cards">
  <div class="wrap"><div class="head"><p class="eyebrow">Why PayPal Business</p><h2>It&rsquo;s easy to create a Business account</h2></div>
  <div class="cards">
    <article class="card"><div class="ico">1</div><h3>Click sign up</h3><p>Start free in minutes &mdash; no setup fees.</p></article>
    <article class="card"><div class="ico">2</div><h3>Fill out your info</h3><p>Tell us about your business to get verified.</p></article>
    <article class="card"><div class="ico">3</div><h3>Get paid</h3><p>Accept payments online and in-store right away.</p></article>
    <article class="card"><div class="ico">&#9733;</div><h3>Invoicing &amp; tools</h3><p>Send invoices, manage payouts, and fight fraud.</p></article>
  </div></div>
</section>
<section data-section="columns">
  <div class="wrap split">
    <div class="media"><img src="https://www.paypalobjects.com/marketing/web24/us/business/open-business-account/split-stack-tablet.jpg?quality=75&width=1200&format=webp" alt="Person working with fabric and a laptop" onerror="this.closest('.split').querySelector('.media').style.display='none'"></div>
    <div class="copy"><p class="eyebrow">Integrations</p><h2>Add us to your online store</h2>
      <p>We&rsquo;re integrated with popular eCommerce platforms to make your payments simpler. Link your Business account in a few clicks.</p>
      <a class="btn btn-primary" href="https://www.paypal.com/us/business/platforms-and-marketplaces/directory">Browse Solution Providers</a>
      <div class="logos"><img src="https://www.paypalobjects.com/marketing/web23/US/enterprise/pay-later/partner-logos/big-commerce-black-logo.png?quality=75&width=300&format=webp" alt="BigCommerce logo" onerror="this.style.display='none'"><img src="https://www.paypalobjects.com/marketing/web23/US/enterprise/pay-later/partner-logos/woo-black-logo.png?quality=75&width=300&format=webp" alt="WooCommerce logo" onerror="this.style.display='none'"></div>
    </div>
  </div>
</section>
<section class="rewards" data-section="cta-band">
  <div class="wrap"><p class="eyebrow" style="color:var(--sky)">Enterprise solutions</p>
    <h2>For complex needs or custom pricing</h2>
    <p>Our enterprise solutions can help your business scale.</p>
    <a class="btn btn-on-navy" href="https://www.paypal.com/us/business/contact-sales">Contact Sales</a></div>
</section>
<section data-section="faq">
  <div class="wrap"><h2 style="text-align:center;margin-bottom:2rem">Frequently asked questions</h2>
  <div class="faq">
    <details open><summary>How can I open a Business account online?</summary><p>It&rsquo;s easy to create a Business account online with PayPal. Click sign up, fill out your information, and get paid.</p></details>
    <details><summary>Can I issue invoices with my PayPal Business account?</summary><p>Yes. PayPal Business includes invoicing tools so you can bill customers and get paid.</p></details>
    <details><summary>What&rsquo;s the difference between a Personal and Business account?</summary><p>Business accounts add invoicing, multi-user access, and merchant tools for accepting payments.</p></details>
    <details><summary>Are there any fees for a PayPal Business account?</summary><p>Opening an account is free; transaction fees apply. See the <a href="/paypal/us/webapps/mpp/paypal-fees">fees page</a>.</p></details>
  </div></div>
</section>`
});
writeFileSync('stardust/prototypes/us-business-open-business-account-proposed.html', business);

// ---- FEES (table) ----
const fees = page({
 title:'Fees | PayPal Consumer | PayPal US',
 desc:"Get detailed information about PayPal's consumer fees for sending or receiving money, internationally or domestically.",
 main:`
<section data-section="hero" style="background:var(--navy);color:#fff">
  <div class="wrap"><p class="eyebrow" style="color:var(--sky)">Fees</p>
  <h1 style="color:#fff">PayPal consumer fees</h1>
  <p style="color:#e7eefb;max-width:60ch">Detailed information about PayPal's consumer fees. Find prices for sending or receiving money, internationally or domestically.</p>
  <a class="btn btn-on-navy" href="https://www.paypalobjects.com/marketing/ua/pdf/US/US-paypal-fees-19-may-2026.pdf">Download printable PDF</a></div>
</section>
<section data-section="fee-table">
  <div class="wrap">
    <div class="feetabs"><a href="/paypal/us/digital-wallet/paypal-consumer-fees" aria-current="true">Consumer</a><a href="/paypal/us/business/paypal-business-fees">Merchant</a><a href="/paypal/us/enterprise/paypal-braintree-fees">Braintree</a></div>
    <table class="fees"><caption>Receiving personal transactions</caption>
      <thead><tr><th>Payment type</th><th>Fee</th></tr></thead>
      <tbody>
        <tr><td>Receiving money within the US (personal)</td><td>No fee</td></tr>
        <tr><td>International personal transaction</td><td>5.00% (min 0.99 USD, max 4.99 USD)</td></tr>
        <tr><td>Fixed fee (based on currency received)</td><td>Varies by currency</td></tr>
      </tbody>
    </table>
    <table class="fees"><caption>Withdrawals out of PayPal</caption>
      <thead><tr><th>Method</th><th>Fee</th></tr></thead>
      <tbody>
        <tr><td>Standard transfer to bank</td><td>No fee</td></tr>
        <tr><td>Instant Transfer to eligible bank/card</td><td>1.75% (min 0.25 USD, max 25.00 USD)</td></tr>
      </tbody>
    </table>
    <table class="fees"><caption>Other consumer fees</caption>
      <thead><tr><th>Service</th><th>Fee</th></tr></thead>
      <tbody>
        <tr><td>Currency conversion</td><td>Applicable currency conversion spread</td></tr>
        <tr><td>Amex Send&trade; Account</td><td>See terms</td></tr>
      </tbody>
    </table>
    <p class="note">Fees reproduced from the captured PayPal consumer fees page. For the authoritative and current schedule, see the <a href="https://www.paypalobjects.com/marketing/ua/pdf/US/US-paypal-fees-19-may-2026.pdf">printable PDF</a>.</p>
  </div>
</section>`
});
writeFileSync('stardust/prototypes/us-webapps-mpp-paypal-fees-proposed.html', fees);

// ---- ARTICLE (brc) ----
const article = page({
 title:'Daily Habits for Success in Small Business | PayPal US',
 desc:'Staying on top of your tasks and achieving your growth goals can be challenging. Follow these daily habits to help your business be a success.',
 main:`
<section data-section="article">
  <div class="wrap">
    <header style="max-width:720px;margin:0 auto 2rem">
      <p class="kicker">Small Business &middot; Operations</p>
      <h1>10 daily habits to boost success</h1>
      <p style="color:var(--muted);font-size:1.2rem">Staying on top of your tasks and achieving your growth goals can be challenging. Follow these daily habits to help your business be a success.</p>
    </header>
    <div class="lead-media"><img src="https://www.paypalobjects.com/marketing/web/brc/brc-smb-operations-ryb-habits.jpeg?quality=75&width=1200&format=webp" alt="Group of smiling female friends" loading="eager" fetchpriority="high"></div>
    <div class="prose">
      <h2>Get moving</h2>
      <p>Most of us spend our days in meetings, at our desk, in transit, grabbing a quick bite, and maybe entertaining clients. Build movement in: have a walking meeting on your phone, invest in a stand-up desk, take the stairs, or go outside for a few minutes.</p>
      <h2>Put something good in your body, every day</h2>
      <p>It's amazing to think about how the food you're putting in your body affects your energy, focus, and mood throughout the workday. Small, consistent choices add up.</p>
      <h2>Send one nice message every day</h2>
      <p>A short note of thanks or encouragement to a customer, colleague, or partner builds the relationships that compound into long-term business success.</p>
      <h2>Designate time for strategic decision-making</h2>
      <p>Protect a block of focus time for the decisions that move your business forward, away from the noise of the inbox.</p>
      <h2>Achieve long-term business success</h2>
      <p>Develop successful, practical, everyday business habits and the long term takes care of itself. Explore more in the <a href="/paypal/us/brc/article/10-habits-to-boost-success">Business Resource Center</a>.</p>
    </div>
  </div>
</section>
<section class="ways" data-section="cards">
  <div class="wrap"><div class="head"><p class="eyebrow">Related content</p><h2>Keep reading</h2></div>
  <div class="cards">
    <article class="card"><h3>Tips for a successful business</h3><p>Practical advice to grow with confidence.</p><a class="textlink" href="https://www.paypal.com/us/brc/article/tips-for-a-successful-business">Read more</a></article>
    <article class="card"><h3>How to generate leads</h3><p>Fill your pipeline with the right customers.</p><a class="textlink" href="https://www.paypal.com/us/brc/article/how-to-generate-leads">Read more</a></article>
    <article class="card"><h3>What are loyalty schemes?</h3><p>Turn one-time buyers into repeat customers.</p><a class="textlink" href="https://www.paypal.com/us/brc/article/what-are-loyalty-schemes">Read more</a></article>
  </div></div>
</section>`
});
writeFileSync('stardust/prototypes/us-brc-article-10-habits-to-boost-success-proposed.html', article);

console.log('wrote 3 template prototypes');
