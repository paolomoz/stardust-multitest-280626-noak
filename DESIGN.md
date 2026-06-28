---
colors:
  background: "#ffffff"
  ink: "#0a0a0a"
  surface: "#f4f4f4"
  surfaceAlt: "#fafafa"
  text: "#1a1a1a"
  textMuted: "#5f5f5f"
  border: "#e2e2e2"
  accent: "#005bb0"
  accentDeep: "#01498e"
  onInk: "#ffffff"
typography:
  headingFamily: "Inter, 'Helvetica Neue', Arial, sans-serif"
  bodyFamily: "Inter, 'Helvetica Neue', Arial, sans-serif"
  scaleRatio: 1.25
  weights: [400, 600, 700]
rounded: "2px (minimal); pills for chips/eyebrows"
spacing:
  base: "4pt"
  sectionPadding:
    desktop: "64px"
    tablet: "48px"
    mobile: "32px"
components: [button-primary, button-secondary, card, link, badge, input]
---

# DESIGN — Sony Group Portal (target)

> Brand-faithful (Mode A). Palette and type pinned to the captured Sony surface, modernized. Single canonical direction.

## North Star
A modern, editorial corporate portal that feels unmistakably Sony: near-monochrome, image-forward, quiet, and confident. Reproduce the brand's restraint and its one signature flourish — the auto-rotating hero — at a 2026 execution level.

## Palette
Near-monochrome. Near-black ink (`#0a0a0a`) for the wordmark and primary actions; white (`#ffffff`) backgrounds; light grey surfaces (`#f4f4f4` / `#fafafa`); mid-grey muted text (`#5f5f5f`). Color enters through photography. One restrained functional accent — corporate blue (`#005bb0`, deep `#01498e`) for links and secondary emphasis. (Pure black/white softened to near-black/near-white per impeccable; this is the modernization inversion of Sony's literal #000/#fff.)

## Typography
Inter as a faithful, freely-licensed substitute for Sony's proprietary **SST** (a humanist grotesque). Helvetica Neue / Arial fallback — Sony's own fallback stack. Two-to-three weights (400 / 600 / 700). Mixed-case headings on a 1.25 modular scale. Neutral, legible, unobtrusive — the type never competes with imagery.

## Motifs
- Full-bleed image hero; on home an **auto-rotating cross-fade carousel** (signature motion; reduced-motion holds first slide).
- Card grid: image + short label, used across section-landing pages.
- Month-grouped dated news list for press releases.
- Story / gallery grid for Design and Brand.
- Minimal radii (2px), subtle card shadows only, generous whitespace, quiet chrome.

## Components
- **button-primary** — solid near-black (`#0a0a0a`) fill, white text, 2px radius, no shadow.
- **button-secondary** — outline (1px `#0a0a0a`) on transparent, ink text.
- **card** — white surface, 1px `#e2e2e2` border, 2px radius, image-top + label; subtle hover lift.
- **link** — accent blue (`#005bb0`), underline on hover.
- **badge / eyebrow** — pill, uppercase micro-label, muted grey.
- **input** — 1px border, 2px radius, ink text (rare; corporate forms only).

## Motion
Register: **editorial** — slow, restrained, content-respecting. Entrance fades and gentle reveals; the hero carousel cross-fades on an ~6s cadence. No parallax theatrics. `prefers-reduced-motion: reduce` disables all autoplay and transitions.
