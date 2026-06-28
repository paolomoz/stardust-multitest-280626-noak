---
colors:
  primary: "#012169"   # PayPal Navy
  action: "#0070E0"    # PayPal Blue
  accent: "#60CDFF"    # Sky
  accent2: "#009CDE"   # Bright Blue
  gold: "#FFC439"      # PayPal Gold (checkout)
  ink: "#2C2E2F"
  muted: "#686A6D"
  surface: "#FFFFFF"
  surfaceAlt: "#F5F7FA"
typography:
  display: '"PayPal Pro", "Helvetica Neue", Arial, sans-serif'
  body: '"Plain", "Helvetica Neue", Arial, sans-serif'
  displayWeight: 900
rounded: "999px (pills) / 12px (cards)"
spacing: "generous; large vertical section rhythm"
components: [pill-button, layered-card, hero, feature-grid, fee-table, footer-mega]
---

# DESIGN — PayPal (current-state, descriptive)

PayPal's current US site reads as a confident, modern payments brand. The
visual system is anchored on **PayPal Navy (#012169)** with **PayPal Blue
(#0070E0)** for action and **Sky (#60CDFF)** as a bright accent. Display
typography is large and heavy (weight 900, ~64–99px on the home hero), set in
PayPal's proprietary *PayPal Pro*, with *Plain* for body — both falling back to
Helvetica Neue / Arial.

**Motifs:** fully-rounded pill buttons (radius ~999px), 12–24px card radii,
soft shadows, layered product cards over real lifestyle photography, and a
two-tone PayPal monogram. Sections alternate white and mist (#F5F7FA) banding.

**Imagery:** delivered as optimized `<img>` (paypalobjects.com, webp), not CSS
backgrounds. The hero is image-led (no signature background video / Lottie); a
single decorative `<canvas>` appears but carries no load-bearing motion.

**Voice:** benefit-led, concise, trust-forward ("Pay, send, and save smarter").
CTAs are short and action-oriented ("Get the PayPal app", "Send Money").
