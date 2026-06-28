---
colors:
  navy: "#012169"        # primary / hero ground / headings
  navyDeep: "#001C64"    # darker navy for gradients
  blue: "#0070E0"        # action / primary CTA
  blueBright: "#009CDE"  # links / secondary accent
  sky: "#60CDFF"         # bright accent (large text / shapes only)
  gold: "#FFC439"        # PayPal checkout gold (sparingly)
  ink: "#2C2E2F"         # body text
  muted: "#686A6D"       # secondary text
  surface: "#FFFFFF"
  surfaceAlt: "#F5F7FA"  # mist banding
typography:
  display: '"PayPal Pro", "Helvetica Neue", Arial, sans-serif'
  body: '"Plain", "Helvetica Neue", Arial, sans-serif'
  displayWeight: 800
  scaleRatio: 1.333
rounded: "999px (pills) / 16px (cards) / 24px (media)"
spacing:
  base: "4pt"
  sectionPadding: { desktop: "64px", tablet: "48px", mobile: "32px" }
components: [button-primary, button-secondary, card, hero, feature-grid, fee-table, badge, link]
---

# DESIGN — PayPal (target system)

A faithful, modernized execution of the PayPal brand for Edge Delivery.

## 1. North star
Confident, trustworthy payments brand: bold navy hero, bright-blue action,
sky accents, real photography, generous-but-balanced rhythm.

## 2. Color
Ground is white with **mist (#F5F7FA)** alternating bands. **Navy #012169**
anchors heroes and headings; **blue #0070E0** is the single action color (pill
CTAs, AA on white at 4.5:1). **Bright blue #009CDE** for links. **Sky #60CDFF**
is decorative/large-text only (fails AA as small body on white). **Gold
#FFC439** used sparingly to echo the PayPal checkout button. Ink #2C2E2F body,
muted #686A6D secondary.

## 3. Typography
Display in PayPal Pro (→ Helvetica Neue/Arial fallback) at weight **800**,
ratio **1.333** for strong hierarchy. Body in Plain (→ Helvetica Neue/Arial).
No external font load — faithful to the brand's own fallback stack, fast LCP.
Mixed-case headlines (modernization over the source's frequent all-caps eyebrows).

## 4. Spacing & layout
4pt base. Section padding **64 / 48 / 32** (balanced; multi-audience hard floor).
12-column feel via CSS grid; max content width ~1200px. Cards in responsive grids.

## 5. Components
- **button-primary**: pill (999px), blue #0070E0 bg, white text, weight 700.
- **button-secondary**: pill, navy outline, navy text, transparent bg.
- **card**: white, 16px radius, soft shadow `0 8px 24px rgba(1,33,105,.10)`.
- **hero**: navy ground or full-bleed photo with navy scrim; left-anchored
  display headline + deck + one primary CTA.
- **feature-grid**: 2–4 responsive columns of cards with icon/image + heading + copy.
- **fee-table**: zebra rows, navy header, readable on mobile (stacked).
- **badge / link**: sky/gold badges; links in bright blue, underlined on hover.

## 6. Motion
Restrained: gentle entrance fades + small translate on section reveal; pill CTA
hover lift. Honor `prefers-reduced-motion`. No signature background video in
source — heroes stay image-led (no flattening of motion required).
