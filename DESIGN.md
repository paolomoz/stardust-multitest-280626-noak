---
colors:
  background: "#ffffff"
  surface: "#f6f6f9"
  text: "#141417"
  primary: "#5a23b9"
  secondary: "#6138f5"
  accent: "#bda7e3"
  muted: "#5a5a63"
  onPrimary: "#ffffff"
typography:
  heading: "'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif"
  body: "'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif"
  baseSize: "16px"
  scaleRatio: 1.25
rounded: "16px"
spacing:
  base: "8px"
  sectionPadding:
    desktop: "64px"
    tablet: "48px"
    mobile: "32px"
components: ["button-primary", "button-secondary", "card", "input", "badge", "link"]
---

# DESIGN — Xfinity (target, faithful redesign modernized)

Brand-faithful (Mode A) refresh of https://www.xfinity.com/. Palette and type pinned to the captured brand surface; execution modernized.

## Color
Near-black ink **#141417** on white **#ffffff**, with a light-grey surface **#f6f6f9** for alternating bands. **Xfinity purple #5a23b9** is the signature accent (CTAs, eyebrows, emphasis); brighter violet **#6138f5** for hovers/links; lavender **#bda7e3** for soft tints. Purple #5a23b9 on white ≈ 7:1 (AA pass). Avoid pure-black floods; theme reads warm-neutral.

## Typography
Headlines and body in **DM Sans** (the captured body face; XSans is the proprietary display face — substituted by DM Sans bold for fidelity without licensing). Base 16px, 1.25 modular scale; display sizes up to ~64px hero. Strong weight contrast (700/800 headings, 400/500 body).

## Shape & Depth
Rounded **16px** cards (8px on chips/inputs), **pill** CTAs (radius 999px). Subtle low-contrast shadows: `0 4px 8px -4px rgba(140,140,140,0.5)`. No glassmorphism, no side stripes.

## Layout
Responsive modular grids of rounded offer/feature cards (2–3 up, degrading to one column), a product-pillar row, big price callouts, icon-led benefit rows, alternating white/#f6f6f9 bands. Section padding 64/48/32 (desktop/tablet/mobile) — brand-register balanced, multi-audience hard floor 64px.

## Motion
Gentle, purposeful: card hover-lift, fade/slide section entrances, reduced-motion honored. No background video on home (faithful — source heroes are static). Register: **kinetic-grid** (modular catalogue/commerce).

## Components
`button-primary` (purple #5a23b9 pill, white text), `button-secondary` (outlined ink pill), `card` (white, 16px radius, subtle shadow), `input` (8px radius, #f6f6f9), `badge` (lavender pill), `link` (violet #6138f5, underline on hover).
