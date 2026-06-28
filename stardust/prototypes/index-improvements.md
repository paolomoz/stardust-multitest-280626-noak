<!--
_provenance:
  writtenBy: stardust:direct (manual, hands-off run)
  writtenAt: 2026-06-28
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/index.json
    - stardust/current/pages/credit-cards.json
-->

# Improvements — index (and template floor)

1. **[dated-pattern]** The home masthead is an offer-carousel of credit-card promos with small 500x315 card thumbnails competing for attention; the carousel pattern hides 3 of 4 offers and reads as 2018 banner-rotation.
   *Fix:* Replace the rotator with a single confident hero (one masthead image + one primary offer + one primary CTA), and surface the other product entry points as a clean card grid below — no auto-advancing carousel.

2. **[ia-clutter]** Multiple competing CTAs in the first viewport (Open an account / Apply now / Sign in / Get the app) fragment the funnel.
   *Fix:* One primary CTA per section. Hero = "Open an account"; sign-in stays in the utility header; app promo moves to its own dedicated strip lower on the page.

3. **[contrast/density]** Body text frequently renders at 14px grey (#646464) on white in dense stacks; small type + low chroma reads tired and hurts AA on tinted card surfaces.
   *Fix:* Base body 16px, secondary 14px reserved for legal/footnotes; reserve grey for meta only; keep prose at near-ink on white.

4. **[cliché]** Generic soft-shadow cards everywhere with inconsistent radii (2/12/16/22/24px observed).
   *Fix:* One card system — 14px radius, one soft shadow token — applied consistently. Pill buttons standardized at 24px.

5. **[missed-opportunity]** The flagscape brand mark and FDIC trust signal are strong assets but get lost in a busy header.
   *Fix:* Give the flagscape logo clear space in a calm header; make the FDIC / Equal Housing trust strip a deliberate, quiet band rather than scattered fine print.
