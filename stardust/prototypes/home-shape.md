<!--
_provenance:
  writtenBy: stardust:prototype (Phase 1, authored directly)
  writtenAt: 2026-06-28
  readArtifacts:
    - stardust/current/pages/home.json
    - stardust/current/_brand-extraction.json
    - PRODUCT.md, DESIGN.md, DESIGN.json, stardust/direction.md
  mode: A (brand-faithful)
  surprise: low
  fidelity: refined
  capturedSourceLineage: see ## Sections
  signatureElements:
    - kind: background-video
      capturedSource: _brand-extraction.json#heroMedium (Sycamore-Partners-Animation.mp4)
      mechanism: inline autoplay/muted/loop bg video in hero
      fallback: static poster + prefers-reduced-motion still
  voiceClassification: all body/headline copy = captured-verbatim
-->

# Shape brief — home

**Page H1:** "A private equity firm specializing in consumer, distribution and retail-related investments." (captured-verbatim)

**Layout strategy:** institutional editorial. Single canvas substrate; parchment
alt on stat band. Balanced density (64px section padding). Merriweather display +
Work Sans body, forest #4f752d accent.

## Sections (one section = one EDS block)

1. **header / nav** — site-wide system component (`_brand-extraction.json#systemComponents`).
   Sycamore tree+wordmark logo left; nav: Investments, Team, Approach, News, Contact.
   → EDS block `header` (chrome fragment).

2. **hero** — captured from `pages/home.json#headings[0]` + first body paragraph +
   signature video. Inline autoplay/muted/loop background video
   (Sycamore-Partners-Animation.mp4) with legibility scrim, poster fallback,
   reduced-motion still. Headline + intro paragraph overlaid. → EDS block `hero`.

3. **stat-band** — captured from `pages/home.json` stat headings (~$11B / 30+ / 40+ /
   ~$200B / ~500K / ~20K + labels). Large Merriweather numerals over small-caps
   Work Sans labels, on parchment. Includes the FY2024 sourcing disclaimer. → EDS block `stats`.

4. **overview** — captured "Overview" + strategy paragraph, link to /approach. Two-column
   editorial: heading left, prose + text-link right. → EDS block `overview` (reuse `columns`).

5. **news** — captured 2 latest articles (Archie Norman; Shields Health) → /news-article/*,
   "News" heading links to /news. Card pair. → EDS block `cards` variant `news`.

6. **investments** — captured 23 portfolio companies (logo grid) → /investment-info/*,
   "Investments" heading links to /investments. Responsive logo grid, hover surfaces
   company name. → EDS block `logo-grid` (dynamic-capable; reads investments index).

7. **footer** — site-wide system component. Office contact + Terms / Privacy & Policy
   Notice. → EDS block `footer` (chrome fragment).

## Anti-template pass
- hero: rejected centered-stack + dual-CTA (anti-ref). Picked full-bleed video with
  left-anchored headline overlay — brand signature is the tree motion.
- portfolio: kept logo grid (the brand's signature catalogue shape) but escaped the
  loader.gif lazy placeholder; real logos at 200.

## Substrate transitions
default: canvas (#fff). exceptions: stat-band → parchment (#fafafa) [1 transition].

## Unsourced content
none — all copy/stats captured-verbatim; logos are real captured assets.
