<!--
_provenance:
  writtenBy: stardust:prototype
  writtenAt: 2026-06-28
  readArtifacts: [stardust/current/pages/index.json, stardust/current/_brand-extraction.json, DESIGN.md, DESIGN.json, stardust/direction.md, stardust/prototypes/index-improvements.md]
  capturedSourceLineage: per-section below
  surprise: low
  signatureElements:
    - kind: hero-video
      capturedSource: _brand-extraction.json#voice.heroMedium
      mechanism: autoplay muted loop bg video + navy scrim
      fallback: captured key-art still + prefers-reduced-motion
  voiceClassification: all captured-verbatim except direction-authorized eyebrows
  copyCadenceBypass: { rules: [em-dash-overuse, marketing-buzzword], basis: captured-verbatim brand prose }
-->

# Shape brief — index (home)

**Page:** Paramount home. Register brand. Mode A. Surprise low. ia-fidelity reimagined.

## Sections
1. **header** — site-wide system-component (from `_brand-extraction.json` system
   components). Mountain logo + nav: About, News, Careers, Investors. Sticky, navy.
2. **video-hero** — direction-authorized reproduction of captured signature
   (`#voice.heroMedium` film-montage video). Display "SHAPE THE FUTURE" (captured
   h2+h1), navy scrim, one primary CTA "ALL BRANDS" → /paramount/about/brands,
   secondary "Join Us" → /paramount/careers. Static fallback = captured key-art still.
3. **intro** — captured `description`: "Paramount is one of the world's leading
   producers of premium entertainment content…" (captured-verbatim).
4. **brand-grid** — derived from captured brand prose (consolidates the 12 brand
   description paragraphs of `pages/index.json#body`). Mark-led card grid; each card
   = brand name + one-line descriptor + link to /paramount/about/brands/<brand>.
   Anti-template pass: chose card-grid over prose-list (the captured prose-run is the
   pattern being escaped per improvement #2).
5. **cta-band** — "Join Us" careers prompt (captured CTA). Spark-accent.
6. **footer** — site-wide system-component. Full secondary nav (About/News/Careers/
   Investors columns from captured footer CTAs) + legal (Terms, Privacy, Contact).

## Layout strategy
Full-bleed navy video hero → white intro band → navy brand-grid (cards) →
spark-accent cta-band → navy footer. Balanced density (64px).

## Anti-template pass
- hero: video-hero with scrim (not centered-stack + dual-button). picked: video-hero.
- brand list: card-grid (not prose run, not 5-up nav). picked: responsive auto-grid.

## Substrate transitions
default navy; exceptions: [intro=white (legibility for long copy)] — 1 transition.

## Unsourced content
none — all copy captured-verbatim from index.json.
