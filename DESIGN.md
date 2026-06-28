---
colors:
  forest: "#4f752d"
  sage: "#78915c"
  forest-deep: "#3c5a22"
  canvas: "#ffffff"
  parchment: "#fafafa"
  ink: "#23211f"
  text: "#333333"
  text-warm: "#4f5047"
  navy: "#041e42"
typography:
  heading: "Merriweather"
  body: "Work Sans"
  scaleRatio: 1.25
rounded: minimal
spacing:
  base: 4px
  sectionPadding:
    desktop: 64px
    tablet: 48px
    mobile: 32px
components: [button-primary, button-secondary, card, link, badge, stat]
---

# Sycamore Partners — Target Visual System

## Overview
A brand-faithful modernization of Sycamore Partners. Institutional, editorial,
restrained. Merriweather serif display over Work Sans body, a single sycamore-green
accent, generous-but-balanced whitespace, and the sycamore-tree motion preserved as
an inline hero. Native CSS — no Bootstrap/jQuery.

## Color
- **Forest `#4f752d`** — the signature accent: rules, links, the tree mark, stat
  emphasis, primary buttons.
- **Forest-deep `#3c5a22`** — hover/active and small-text on light surfaces (AA).
- **Sage `#78915c`** — large accents and tints only (not small body text).
- **Ink `#23211f` / Text `#333` / Warm `#4f5047`** — type.
- **Canvas `#fff` / Parchment `#fafafa`** — backgrounds, alternating sections.
- **Navy `#041e42`** — rare deep accent (footer, legal).

## Typography
- **Merriweather** (serif) for display and headings — editorial, institutional.
- **Work Sans** (sans) for body, labels, small-caps stat labels.
- Modular scale ratio **1.25**.

## Spacing & Layout
- 4pt base. Section padding 64/48/32 (desktop/tablet/mobile) — balanced density
  (brand-register multi-audience hard floor honored, ≤64px).
- Max content width ~1200px; generous gutters.

## Components
- `button-primary` — solid forest, white text, minimal radius; hover forest-deep.
- `button-secondary` — outline forest on canvas.
- `card` — parchment surface, hairline border, subtle shadow; news + portfolio.
- `stat` — large Merriweather numeral + small-caps Work Sans label.
- `link` — forest-deep, underline on hover.
- `badge` — small-caps sector/category tag.

## Motion
- Register **`arrival`** (civic-formal + institutional). Gentle fade/translate
  entrances, ≤3 choreographed moves per page.
- **Signature:** the sycamore-tree video reproduced as an inline, autoplay/muted/
  loop background hero with a static poster fallback and `prefers-reduced-motion`
  still. Never a blocking splash/redirect.

See `DESIGN.json#extensions` for tokens, motion, divergence trace, IA priorities.
