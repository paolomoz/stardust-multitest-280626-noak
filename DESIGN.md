---
colors:
  navy: "#012169"
  actionBlue: "#0053C2"
  red: "#E31837"
  ink: "#1A1A1A"
  slate: "#5A5A5A"
  background: "#FFFFFF"
  surface: "#F5F6F8"
  surfaceCool: "#EEF3FC"
typography:
  heading: "Inter (humanist substitute for Connections), Arial, sans-serif"
  body: "Roboto, Arial, Helvetica, sans-serif"
  base: "16px"
  ratio: "1.25"
rounded:
  button: "24px"
  card: "14px"
  chip: "4px"
spacing:
  base: "8px"
  sectionPadding:
    desktop: "64px"
    tablet: "48px"
    mobile: "32px"
components:
  - button-primary
  - button-secondary
  - card
  - input
  - badge
  - link
---

# DESIGN — Bank of America (target, modernized faithful)

## North star
A calmer, more confident Bank of America: the same flagscape identity and IA, executed with one consistent card system, one ask per section, and a deliberate trust band — recognizably BoA, minus the 2018 carousel clutter.

## Palette
Navy `#012169` anchors brand surfaces and headings. Action blue `#0053C2` carries links and primary actions. Flagscape red `#E31837` is the accent (reserved for brand marks and emphasis, not body text on tinted surfaces). Neutrals: near-ink `#1A1A1A` text on white, `#5A5A5A` for meta, with `#F5F6F8` warm-neutral and `#EEF3FC` cool-tint section surfaces.

## Typography
Headings in **Inter** (a humanist sans standing in for BoA's proprietary Connections); body in **Roboto** (BoA's actual body face, freely available). Modular scale ratio 1.25 from 16px base (16 / 20 / 25 / 31 / 39 / 49). Weights 400 / 500 / 700.

## Spacing & layout
8px base rhythm. Section padding 64px desktop / 48px tablet / 32px mobile (balanced; multi-audience hard floor honored at ≤64px). 12-column max-1200px content.

## Components
- **button-primary**: pill 24px, action-blue fill, white text; hover navy.
- **button-secondary**: pill 24px, navy 1.5px outline, navy text; hover navy fill white.
- **card**: 14px radius, soft shadow `0 2px 20px rgba(0,0,0,0.12)`, image-led.
- **input**: 8px radius, 1px slate border, navy focus ring.
- **badge**: 4px radius chip for offers / FDIC.
- **link**: action blue, underline on hover.

## Motion
Register `arrival` (civic-formal + institutional). Gentle entrance fades/translates on scroll; no auto carousel. `prefers-reduced-motion` collapses to static.
