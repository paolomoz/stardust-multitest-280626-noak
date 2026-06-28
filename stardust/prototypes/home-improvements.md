<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-28
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
    - stardust/current/pages/index.json (splash)
  mode: A (brand-faithful)
-->

# Improvements — home

1. **[dated-pattern]** The site entry (`/`) is a 4-second autoplay video that
   blocks all content, then JS-redirects (`setTimeout … window.location='/home'`).
   A forced timed splash is a 2010s pattern; it hurts first-paint, SEO, and access.
   *Fix:* Make the home page the real destination. Reproduce the sycamore-tree
   animation as an **inline, non-blocking hero** (autoplay/muted/loop background
   video with a static poster fallback + reduced-motion still), with the headline
   and primary nav immediately available over a legibility scrim.

2. **[dated-tech / density]** Built on Bootstrap 5 + jQuery + a FontAwesome kit
   with `loader.gif` lazy placeholders. Generic Bootstrap spacing flattens the
   institutional voice.
   *Fix:* Native CSS grid + design tokens, no framework; balanced editorial
   density (~64px section padding) and a confident serif scale (≥1.25 ratio).

3. **[missed-opportunity]** The stat band (~$11B aggregate committed capital, 30+
   investments, 40+ professionals, ~$200B portfolio revenues, ~500K employees,
   ~20K stores) is the strongest credibility signal but renders as plain headings.
   *Fix:* Elevate to a typographic stat band — large **Merriweather** numerals
   over small-caps **Work Sans** labels, on the off-white surface.

4. **[cliché]** Portfolio is a flat logo grid behind `loader.gif` lazy
   placeholders; logos load slowly and inconsistently.
   *Fix:* Refined responsive logo grid, real logos served at 200, subtle hover
   that surfaces the company name and links to its detail page.

5. **[contrast]** Sycamore green `#4f752d` on white passes AA (~5.0:1) but the
   sage `#78915c` used for some links/labels drops near 3:1 on white.
   *Fix:* Reserve sage for large text / accents only; keep body links and small
   UI on the deeper `#4f752d` (or a slightly deepened green) to hold AA.
