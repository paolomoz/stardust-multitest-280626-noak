<!--
_provenance:
  writtenBy: stardust:prototype (Phase 1)
  writtenAt: 2026-06-28
  slug: us-home
  againstDirection: stardust/direction.md (Active, Mode A)
  surprise: low
  capturedSourceLineage:
    - hero: pages/us-home.json#headings + brand-moment-hero img
    - send-receive-split-pool: pages/us-home.json#headings[Send,Receive,Split,Pool]
    - rewards: pages/us-home.json#"Get rewards from the brands you love"
    - savings: pages/us-home.json#"Get 3.30% APY11 with your PayPal Savings account"
    - crypto: pages/us-home.json#"Crypto the easy way"
    - app-cta: pages/us-home.json#"All in the PayPal app" + Get the PayPal app
    - header/footer: _brand-extraction.json#systemComponents
  voiceClassification:
    - {section: hero, classification: captured-verbatim}
    - {section: savings, classification: captured-verbatim, copy: "Get 3.30% APY with your PayPal Savings account"}
    - {section: crypto, classification: captured-verbatim}
  signatureElements: []   # home is image-led; no captured video/canvas signature motion
-->

# Shape brief — home

**Surprise:** low (Mode A brand-faithful + improvements).
**H1:** "Pay, send, and save smarter" (promoted from captured hero copy).

## Sections (one prototype section = one EDS block downstream)
1. **header** — site-wide chrome: PayPal wordmark (white on navy), Personal/Business
   toggle, primary nav, Log In + Sign Up pill. (system-component)
2. **hero** — navy-scrimmed full-bleed brand-moment photo (headphones-on-rug,
   1440x814); left-anchored display H1 + deck + one primary pill CTA "Get the app".
3. **ways-to-pay** (cards) — Send / Receive / Split / Pool, 4-up responsive grid,
   each with heading + short line + text link (Start a Pool etc.). lineage: headings.
4. **rewards** — "Get rewards from the brands you love" benefit band + cashback line.
5. **savings** — "Get 3.30% APY with your PayPal Savings account" with featured photo
   (mother-and-child) + Start Saving CTA + FDIC/Synchrony disclosure as footnote.
6. **crypto** — "Crypto the easy way" + buy/sell/transfer copy + Explore Crypto CTA.
7. **app-cta** (cta-band) — "All in the PayPal app" pre-footer conversion band,
   navy ground, Get the PayPal app pill.
8. **footer** — multi-column product/company/legal nav + locale. (system-component)

## Layout strategy
Full-bleed navy hero with scrim; alternating white / mist (#F5F7FA) bands; cards in
16px-radius soft-shadow grid; editorial-scale media (24px radius) for savings/crypto.

## Anti-template pass
- hero: chose left-anchored photo-overlay (not centered-stack dual-CTA). rationale: improvements #1.
- ways-to-pay: 4-up card grid preserved — it IS PayPal's signature money-actions shape.

## Substrate transitions
default: white; exceptions: hero (navy), app-cta (navy) — 2 transitions, within cap.

## Key states
- CTA hover lift; reduced-motion honored; cards stack to 1-col on mobile.

## Unsourced content
- none invented; all copy/imagery captured-verbatim from us-home.json.
