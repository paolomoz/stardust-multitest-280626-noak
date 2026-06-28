---
colors:
  background: "#ffffff"
  surface: "#f6f6f9"
  text: "#141417"
  primary: "#5a23b9"
  secondary: "#6138f5"
  accent: "#bda7e3"
  muted: "#555555"
typography:
  heading: "XSans, system-ui, -apple-system, 'Segoe UI', sans-serif"
  body: "DMSans, system-ui, -apple-system, 'Segoe UI', sans-serif"
  baseSize: "16px"
rounded: "16px"
spacing: "8px grid"
components: ["offer-card", "hover-tile", "price-callout", "pill-cta", "benefit-row", "comparison-table", "faq"]
---

# DESIGN — Xfinity (current state, descriptive)

Visual system observed on https://www.xfinity.com/.

## Color
Near-black ink (#141417) on white with a light-grey surface (#f6f6f9). Xfinity purple (#5A23B9) is the signature brand color; a brighter violet (#6138F5) appears as an interactive/accent tone; lavender (#BDA7E3) for soft tints. Theme-color meta is #000000.

## Typography
Display/headlines in **XSans** (proprietary); body in **DM Sans**. Base 16px, modular-ish scale up to a ~92px editorial hero. Generous weight contrast between headline and body.

## Shape & Depth
Rounded 16px cards (8px on smaller elements), pill CTAs. Shadows are subtle and low-contrast (e.g. `rgba(140,140,140,0.51) 0 4px 8px -4px`).

## Layout
Modular tile grids of product/offer cards, portrait hover-imagery tiles (440×618 / 880×1236), big price callouts, icon-led benefit rows, dense comparison tables on `/compare`.

## Motion
Static heroes (no video/canvas/Lottie on home). Hover-reveal imagery on tiles is the signature interaction.
