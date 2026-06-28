---
colors:
  background: "#ffffff"
  surface: "#f5f5f7"
  surface-dark: "#0a0a0a"
  ink: "#101010"
  muted: "#6b6b6f"
  primary: "#1428a0"      # Samsung Blue (signature)
  accent: "#006bea"       # interactive blue
  accent-bright: "#2189ff"
  border: "#e2e2e6"
typography:
  display: "'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  body: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  scaleRatio: 1.25
  weights: [400, 600, 700]
rounded: "20px"
spacing:
  base: "4pt"
  sectionPadding:
    desktop: "64px"
    tablet: "48px"
    mobile: "32px"
components: [button-primary, button-secondary, card, input, badge, link]
---

# DESIGN — Samsung US (target)

## North star
A calm, premium, photography-led canvas where Samsung Blue is a deliberate signature. Faithful
to Samsung's monochrome restraint, modernized with mixed-case headlines, tighter type, and one
decisive CTA per section.

## Color
White ground (`#ffffff`), `#f5f5f7` light bands, near-black `#0a0a0a` for dark hero/feature
sections. Text is near-black `#101010` (a brand-faithful nudge off pure `#000` for screen
comfort; recorded as an inversion). **Samsung Blue `#1428a0`** is the brand signature; the
interactive blues `#006bea` / `#2189ff` carry links and secondary affordances. `#6b6b6f`
secondary text, `#e2e2e6` hairlines. No gradients, no glass.

## Typography
Geometric-grotesque display ('Hanken Grotesk', a non-generic stand-in for SamsungSharpSans)
paired with a humanist system sans for body (stands in for SamsungOne; chosen for zero webfont
cost / EDS performance). Weights 400/600/700. Modular scale 1.25. Headlines mixed-case and
tight (`letter-spacing: -0.02em`); body at a comfortable 1.5–1.6 line-height.

## Shape & depth
Signature **20px** radius on cards and media tiles; 12px on inputs; pill (`999px`) buttons and
chips. Soft shadows only (`0 4px 16px rgba(0,0,0,.08)`, `0 8px 30px rgba(0,0,0,.12)`). Flat,
photographic, never heavy.

## Layout & spacing
Full-bleed KV heroes; modular section stacks; responsive product grids (2-up mobile → 3/4-up
desktop) and horizontal rails; sticky product-family sub-nav on detail pages. 4pt spacing base;
section padding 64/48/32 (desktop/tablet/mobile). Mobile-first; breakpoints 600/900/1200.

## Components
- **button-primary** — solid `#101010` (or Samsung Blue on light promo surfaces), white text,
  pill, 14px/24px padding, 600 weight.
- **button-secondary** — outline `#101010`, transparent fill, pill.
- **link** — `#006bea`, 600 weight, no underline until hover.
- **card** — white, 20px radius, soft shadow, 16:9 or 4:5 media on top.
- **input** — 12px radius, `#e2e2e6` border, focus ring Samsung Blue.
- **badge** — pill, `#f5f5f7` bg, `#101010` text; offer badges use Samsung Blue.

## Motion
Restrained: section fades on scroll, gentle rail slides, hover lifts on cards. Honor
`prefers-reduced-motion`. No signature background video on captured archetypes (heroMedium
null) — KV heroes are still images.

## System components
Global mega-nav header (Samsung wordmark logo + categories + utility) and multi-column footer
(categories, support, account, about, social, legal, country) appear identically on every page.
