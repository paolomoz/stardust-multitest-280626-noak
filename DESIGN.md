---
colors:
  espresso: "#1E3932"      # deep forest green — dark sections, footer
  houseGreen: "#006241"    # primary — CTAs, links, brand
  pike: "#00754A"          # classic green accent
  acid: "#008248"          # bright green — highlights
  foam: "#F1F8F5"          # pale green tint — alt surfaces
  cream: "#FBF8F2"         # warm off-white surface
  white: "#FFFFFF"
  ink: "#1A1A1A"           # body text (avoid pure black)
  slate: "#4A4A4A"         # muted text
  hairline: "#E4E4E4"
typography:
  heading: "SoDoSans, 'Helvetica Neue', Helvetica, Arial, sans-serif"
  body: "SoDoSans, 'Helvetica Neue', Helvetica, Arial, sans-serif"
  weights: [400, 600, 700]
  scaleRatio: 1.25
rounded: "pill (999px) for CTAs; 12px for cards; 50% for product/Siren badges"
spacing:
  base: 4
  sectionPadding: { desktop: 64px, tablet: 48px, mobile: 32px }   # balanced (multi-audience floor)
components: [button-primary, button-secondary, card, link, badge, input]
---

# DESIGN — Starbucks (target, brand-faithful modernized)

## Overview
A faithful, modernized execution of the Starbucks brand surface. The House Green
family anchors against white, a pale foam tint, and a warm cream for alternating
sections. SoDoSans carries all type at 400/600/700 with a 1.25 modular scale.
Photography leads; the Siren is the persistent mark.

## Color
House Green `#006241` is primary (CTAs, links, brand). Forest `#1E3932` grounds
dark sections and the footer. `#00754A`/`#008248` are accent greens. Surfaces
alternate white / foam `#F1F8F5` / cream `#FBF8F2`. Body text is near-black ink
`#1A1A1A`; muted text `#4A4A4A`. Hairline dividers `#E4E4E4`. Green appears on
white/foam only where it clears AA.

## Typography
SoDoSans everywhere. Display headings 700, section headings 600, body 400. Mixed-
case headlines; uppercase reserved for eyebrow labels and short imperative CTAs.
Modular scale 1.25.

## Spacing & Layout
4pt base. Section padding 64/48/32 (desktop/tablet/mobile) — balanced density for a
multi-audience IA. Full-bleed hero tiles; 12px card radius; comfortable card grids
(3–4 up on desktop).

## Components
- **button-primary**: House Green fill, white text, pill (999px), 600 weight.
- **button-secondary**: House Green outline on transparent, pill.
- **card**: white surface, 12px radius, subtle shadow; circular product image,
  mixed-case title, one-line description.
- **link**: House Green, underline on hover.
- **badge**: foam pill, House Green text, uppercase eyebrow.

## Motion
Gentle: fade/translate-up section entrances honoring `prefers-reduced-motion`. No
flatten of any captured signature motion (none present on source — static hero tiles).

## Voice
DO: warm, sensory, seasonal ("It's a great day for coffee"). DON'T: corporate
jargon, shouting, fabricated claims.
