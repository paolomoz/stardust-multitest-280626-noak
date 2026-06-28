<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-28
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/brand-review.html
    - stardust/current/pages/index.json
    - stardust/current/pages/about.json
-->

# Improvements — index (home), brand-faithful (Mode A)

1. **[missed-opportunity]** The signature **film-montage video** captured on
   `/about` (`_brand-extraction.json#voice.heroMedium`) is absent from the home
   hero, which is a static key-art image mosaic. The home leads with the brand's
   biggest statement ("SHAPE THE FUTURE") but flattens its most cinematic asset.
   *Fix:* Bring the film-montage video into the home hero as an autoplay/muted/
   loop background with a navy gradient scrim and a `prefers-reduced-motion`
   static fallback (the captured mosaic image).

2. **[ia-clutter]** The brand portfolio is rendered as a long run of paragraph
   descriptions (Paramount+, Pictures, CBS, Pluto TV, MTV, Nickelodeon… 2446-char
   text block) rather than a scannable mark-led grid.
   *Fix:* Render brands as a responsive logo/card grid linking to each
   `/about/brands/<brand>` detail page; move the prose to the detail pages.

3. **[contrast]** Hero white headline sits over a bright multi-color key-art
   mosaic with no consistent scrim, so legibility drops over light show art.
   *Fix:* Add a fixed navy `#000A3C`→transparent gradient scrim beneath all hero
   text so contrast holds regardless of the image behind it.

4. **[cliché]** All headings render uppercase via CSS, including long descriptive
   copy — the shout reads as energy at the first heading and as fatigue by the
   third.
   *Fix:* Reserve ALL-CAPS for the display hero, short eyebrows, and CTA labels;
   set multi-word section headings and body copy in mixed-case (the brand voice
   survives it and reads more current).

5. **[dated-pattern]** The vivid brand-accent palette (yellow #FFD400, magenta
   #D63384, cyan #03D1E5) that signals the diversity of the portfolio is barely
   used — the site is almost entirely navy + white, underselling the range.
   *Fix:* Use the accent colors as section eyebrows / category markers / hover
   states to bring the portfolio's energy forward without changing the identity.
