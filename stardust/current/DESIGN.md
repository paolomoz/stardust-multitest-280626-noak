---
colors:
  primary: "#006241"      # Starbucks House Green
  primaryBright: "#008248"
  primaryClassic: "#00754A"
  deep: "#1E3932"         # Forest / dark green sections
  background: "#FFFFFF"
  surface: "#F1F8F5"      # House foam tint
  text: "rgba(0,0,0,0.87)"
  textMuted: "rgba(0,0,0,0.58)"
  border: "rgba(0,0,0,0.12)"
typography:
  heading: "SoDoSans, 'Helvetica Neue', Helvetica, Arial, sans-serif"
  body: "SoDoSans, 'Helvetica Neue', Helvetica, Arial, sans-serif"
  weights: [400, 600, 700]
rounded: "pill (50px) for CTAs, 8px for cards/images"
spacing: "generous; full-bleed hero tiles, comfortable card grids"
components: [hero-tile, product-card-grid, editorial-row, pill-cta, siren-badge, footer-columns]
---

# DESIGN — Starbucks.com (current state, descriptive)

Starbucks runs a photography-forward marketing/commerce surface. The visual system
is anchored by the **House Green (#006241)** family against white and a pale foam
tint (#F1F8F5), with the **Siren badge** as the persistent brand mark. Type is the
proprietary **SoDoSans** at 400/600/700.

Signature patterns:
- **Hero tiles**: full-bleed lifestyle photo with a short overlaid headline + pill CTA.
- **Product card grid**: circular product image, name, one-line description, used on
  every menu category page.
- **Editorial rows**: alternating image/text bands on About, Rewards, Stores pages.
- **Pill CTAs** (50px radius), green primary / outline secondary.
- **Footer**: 5 link columns (About Us, Careers, Social Impact, For Business
  Partners, Order and Pick Up).

No CSS custom properties are exposed on :root; tokens above are aggregated from
computed styles.
