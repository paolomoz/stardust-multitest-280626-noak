<!--
_provenance:
  writtenBy: stardust:prototype Phase 1 (hands-off run)
  writtenAt: 2026-06-28
  readArtifacts: [stardust/current/pages/index.json, stardust/current/_brand-extraction.json, DESIGN.md, DESIGN.json, stardust/direction.md, stardust/prototypes/index-improvements.md]
  surprise: low
  fidelity: quick
-->

# Shape brief — index (home)

**Role:** Variant A (faithful + improvements). Mode A, surprise low, IA verbatim.

## Sections (one section = one EDS block)
1. **header** — site-wide system component (from `_brand-extraction.json#systemComponents.header`). Flagscape logo (assets/logo.png), utility links (Locations/Contact/Help/En español/Sign in), 4-pillar primary nav (Personal / Wealth Management / Business / Corporations & Institutions), "Open an account" primary CTA. _captured-verbatim labels._
2. **hero** — consolidates the captured offer-masthead into ONE confident hero (improvement #1: kill carousel). Headline "What would you like the power to do?" (tagline, captured-verbatim), subcopy = purpose line, one primary CTA "Open an account", masthead webp background image. Legibility scrim over photo.
3. **cards (products)** — "Your financial goals matter"-style product entry grid. 6 cards: Checking, Savings & CDs, Credit Cards, Home Loans, Auto Loans, Merrill Investing. Each = title + one-line captured blurb + "Explore" link. _captured-verbatim._
4. **cards (card-offers)** — "Choose the card that works for you". 4 cards: Customized Cash Rewards (6% cash back, no annual fee), Unlimited Cash Rewards (2%), Travel Rewards (1.5 pts/$1), BankAmericard (intro APR 21 billing cycles). title + offer badge + "Apply now"/"Learn more". _captured-verbatim rates._
5. **columns (news)** — "Your news and information" / Better Money Habits: 3-4 article links (Money Confessions, home equity line, savings & CDs, retrain your brain for saving) + "Visit Better Money Habits". _captured-verbatim._
6. **columns (security-app)** — two-up: "Level up your account security" (Check your account security level) + "Convenient banking with our Mobile app" (Get the app). _captured-verbatim._
7. **footer** — site-wide system component. Product/company/legal columns, FDIC-Insured + Equal Housing Lender trust strip, social, copyright. _captured-verbatim._

## Layout strategy
Single white substrate; alt sections use surface `#F5F6F8`. One primary CTA per band. Card system: 14px radius, soft shadow, image-led. Pill buttons. Max 1200px content.

## Anti-template pass
- Hero: reject offer-carousel reflex → single hero + photo + one CTA (improvement #1).
- Product nav: reject 5-up icon grid → labeled cards with real blurbs.

## Voice classification
All copy `captured-verbatim` from index.json (tagline, product blurbs, offer rates, nav labels). No invented facts. Offer fine-print rendered as quiet secondary type.

## Signature elements
None (static masthead; no video/canvas/Lottie). Carry brand motifs: pill buttons, soft cards, FDIC strip.

## Unsourced content
None — every value sourced from index.json.
