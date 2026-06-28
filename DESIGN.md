---
colors:
  ground: "#000A3C"        # deep navy canvas
  surface: "#FFFFFF"
  ink: "#000A3C"           # text on white
  paper-text: "#FFFFFF"    # text on navy
  signal: "#0064FF"        # electric blue — primary action
  spark-yellow: "#FFD400"
  spark-magenta: "#D63384"
  spark-cyan: "#03D1E5"
  muted: "#8386A0"
typography:
  display: "Paramount Vista Sans, 'Peak Sans', Arial, sans-serif"
  heading: "'Peak Sans', Arial, Helvetica, sans-serif"
  body: "'Peak Sans', Arial, Helvetica, sans-serif"
  scaleRatio: 1.333
  displayTransform: uppercase
rounded: small
spacing:
  base: 4
  sectionPadding:
    desktop: 64px
    tablet: 48px
    mobile: 32px
components: [button-primary, button-secondary, card, link, badge, input]
---

# Paramount — Design System (target)

## North Star
One unified, cinematic Paramount: a deep-navy stage where the moving image leads,
the mountain emblem anchors, and the brand portfolio's range shows through vivid
accent sparks. Faithful to the captured identity, executed at a current bar.

## Color
- **Ground** `#000A3C` deep navy — dominant full-bleed canvas.
- **Signal** `#0064FF` electric blue — primary CTA / links / focus.
- **Surface** `#FFFFFF`, **Ink** `#000A3C` — white sections / type on white.
- **Sparks** `#FFD400` yellow · `#D63384` magenta · `#03D1E5` cyan — category
  markers, eyebrows, hovers. Used sparingly as pops, never as large fields.
- **Muted** `#8386A0` — meta / secondary text.
Inherited from `_brand-extraction.json` (Mode A pin).

## Typography
- **Display:** Paramount Vista Sans (brand face) — hero statements, ALL-CAPS.
- **Heading / Body:** Peak Sans — mixed-case for headings ≥3 words and all body.
- Scale ratio 1.333 (committed/cinematic). Arial/Helvetica fallback.

## Spacing & Layout
4pt base. Section padding balanced (64 / 48 / 32) — brand-register multi-audience
floor. Full-bleed navy bands alternate with white content sections.

## Components
- **button-primary:** solid electric-blue on navy, squared, white label, ALL-CAPS.
- **button-secondary:** white outline on navy / navy outline on white.
- **card:** flat, near-squared, subtle border; hover lifts to a spark accent rule.
- **link:** electric blue, underline on hover.
- **badge:** spark-colored eyebrow chip (category marker).

## Motion
Register: **kinetic-display** (selected from Brand Personality
`display-typography-signature` + `signage-led`). Signature film-montage video
preserved as hero background motion with navy scrim and reduced-motion still
fallback. Large display type arrives with staggered reveals; restrained elsewhere.

## Voice
DO: "SHAPE THE FUTURE", "Join Us", short imperative CTAs in caps.
DON'T: all-caps multi-sentence body copy; SaaS hero clichés; stock photography.
