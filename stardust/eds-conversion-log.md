# EDS conversion log — PayPal

runtime: aem-boilerplate (vanilla; scripts/aem.js + scripts.js, real header/footer blocks)

## Block inventory (locked before code)
- hero        — navy full-bleed photo + scrim, eyebrow/h1/lede/CTA (query-decoded)
- cards       — responsive card grid; first short text cell -> .card-ico badge
- columns     — split feature (media | copy), .reverse variant
- cta         — centered conversion band on navy (adds .navy to section)
- fees        — styled fee tables + tab row
- faq         — accordion (details/summary) from Q/A rows
- header      — self-contained: navy nav, white wordmark, Personal/Business, Log In, Sign Up, JS burger
- footer      — self-contained: multi-column nav + wordmark
- (default content) — article prose (brc/cshelp), lists

## Decisions
- Self-contained header/footer BLOCKS (not DA fragments) — migration-fidelity default.
  => no /paypal/nav or /paypal/footer DA docs; chrome lives in code. Nav hrefs are
  hardcoded /paypal/... targets, all of which are deployed local pages (self-contained nav).
- One prototype <section> = one block; same-pattern sections share blocks (cards/columns).
- Palette+type pinned (Mode A). No external fonts (brand Helvetica Neue/Arial fallback) -> fast LCP.
- fstab: / -> content.da.live/paolomoz/stardust-multitest-280626-noak ; all pages under /paypal/.

## Anti-patterns avoided
- No .block-class CSS reliance (vanilla, uses .section / decorated blocks).
- Buttons via decorateButtons (<strong><a> primary / <em><a> secondary); CSS targets a.button.
- Images authored as external paypalobjects.com <img> (public CDN, ingested 200, 0 about:error).
- QR SVG removed from CTA bands (external SVG choked content-bus preview -> 409).

## Pages delivered (11) — all live + headless-verified
index(home), business/open-business-account, digital-wallet, digital-wallet/send-receive-money/send-money,
digital-wallet/ways-to-pay/buy-now-pay-later, enterprise, money-hub, security, webapps/mpp/paypal-fees,
brc/article/10-habits-to-boost-success, cshelp/article/how-do-i-receive-money-through-paypal-faq1750
