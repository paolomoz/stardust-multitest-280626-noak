# EDS authoring contract — Bank of America (blocks ⇄ content)

Runtime: **aem-boilerplate (vanilla)**. Blocks live at `blocks/<name>/{<name>.js,<name>.css}`. Content pages are DA body fragments under `content/bankofamerica/...`. CSS scoped under `.<name>` (NOT `.<name>.block`). Tokens global in `styles/styles.css`. Decode defensively (DA flattens rows to one cell — query by content, never by fixed row index).

## Tokens (in styles/styles.css :root)
--bofa-navy #012169; --bofa-blue #0053C2; --bofa-red #E31837; --ink #1A1A1A; --slate #5A5A5A; --bg #FFFFFF; --surface #F5F6F8; --surface-cool #EEF3FC; --maxw 1200px; --radius-card 14px; --radius-btn 24px; --shadow-card 0 2px 20px rgba(0,0,0,.12). Fonts: --font-head Inter; --font-body Roboto.

## Buttons (global, vanilla decorateButtons)
Primary CTA = `<strong><a>` → `a.button.primary` (action-blue fill, white, pill 24px). Secondary = `<em><a>` → `a.button.secondary` (navy outline). Plain `<a>` = text link (blue, underline hover). Style `a.button*` globally.

## Block contracts

### header (self-contained; content authors empty `<header></header>`)
header.js builds the chrome in `decorate(block)`: flagscape inline-SVG logo (links to /bankofamerica/), utility row (Locations, Contact Us, Help, En español, Sign in), primary nav (Personal, Wealth Management, Business, Corporations & Institutions), "Open an account" primary button. Mobile hamburger via real `addEventListener` toggling `aria-expanded`. Links: internal → /bankofamerica/...; external pillars keep absolute captured URLs. Reserve header height in styles.css.

### footer (self-contained; content authors empty `<footer></footer>`)
footer.js builds: product/company/legal link columns, a quiet trust strip ("FDIC-Insured — Backed by the full faith and credit of the U.S. Government" + "Equal Housing Lender"), social row, "© 2026 Bank of America Corporation." Internal links → /bankofamerica/...

### hero (one row, one cell — query by content)
Authoring cell contains, in order: optional `<p>` eyebrow, `<h1>` (home) or `<h2>` (other pages — but on a page the hero heading IS the page h1, so author `<h1>`), `<p>` lede, `<p>` with `<strong><a>` primary CTA, optional `<img>` (masthead bg). decorate() queries: `h1,h2` = heading; link-free `<p>` after heading = lede; short link-free `<p>` before heading = eyebrow; link-bearing `<p>` = CTA; `picture,img` = bg layer with CSS scrim `::before`. Variants: `hero` (photo) / `hero plain` (cool-tint, no photo).

### cards (variant class: `cards products|card-offers|perks|resources|contact-topics`)
Section head (eyebrow + `<h2>`) authored as **default content** before the block. Block table = ONE ROW PER CARD; each card cell contains: optional `<img>`, `<h3>` title, one or more `<p>` (blurb / offer line / "No annual fee"), and a CTA as `<strong><a>` or plain `<a>`. decorate() iterates rows, builds a card per row (`.card`), grid via CSS (`grid-template-columns` responsive). Handle empty image cell with CSS fallback. If DA flattens to one cell, segment on `<h3>` boundary.

### columns (variant class: `columns news|security-app|categories|compare|connect|how-to|locations-appointment|social|call-us`)
Section head as default content before block. Block table = ONE ROW PER COLUMN; each cell = `<h3>` + links/`<p>`s/list. decorate() renders N equal columns (`display:grid`, responsive → 1 col mobile). For link-list variants each cell is `<h3>` + several `<a>`.

### accordion (variant `accordion faq`)
Section head as default content. Block table = ONE ROW PER Q&A: cell1 = question text, cell2 = answer (`<p>`s). decorate() builds `<details><summary>Q</summary><div class="answer">A</div></details>` (accessible, keyboard, aria). Optional "Expand all" control via JS. Honor prefers-reduced-motion. If a Q has no answer cell, render summary only — never invent an answer.

## Content page skeleton (body fragment — NO doctype/html/head)
```
<body>
  <header></header>
  <main>
    <div><div class="metadata"><div><div>Title</div><div>…≤60</div></div><div><div>Description</div><div>…~155</div></div></div></div>
    <div><div class="hero"> …hero cell… </div></div>
    <div> <!-- default content: eyebrow <p> + <h2> --> <div class="cards card-offers"> …rows… </div></div>
    ...
  </main>
  <footer></footer>
</body>
```
Exactly ONE `<h1>` (in hero). Section titles `<h2>`, card/sub titles `<h3>`. Images: author real captured URLs (verified) or omit; never `/img/` in content. Run sanitise.js before DA write. All copy captured-verbatim; invent nothing.

## Paths (DA, all under /bankofamerica/)
home → content/bankofamerica/index ; nav → content/bankofamerica/nav (if fragment used; here header is self-contained so nav optional) ; footer → content/bankofamerica/footer (self-contained, optional). Pages:
- content/bankofamerica/index.html
- content/bankofamerica/credit-cards.html
- content/bankofamerica/credit-cards/cash-back-credit-cards.html
- content/bankofamerica/auto-loans/auto-loan-faq.html
- content/bankofamerica/preferred-rewards.html
- content/bankofamerica/customer-service/contact-us/about-bank-of-america.html
- content/bankofamerica/customer-service/contact-us.html
Path-safety: lowercase, no trailing slash, no double slash.
