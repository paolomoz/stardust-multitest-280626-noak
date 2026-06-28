---
_provenance: descriptive (extracted from https://www.paramount.com/ 2026-06-28)
colors:
  background: "#000A3C"   # deep navy (dominant canvas)
  surface: "#FFFFFF"
  text: "#FFFFFF"         # on navy
  text-ink: "#000A3C"     # on white
  primary: "#0064FF"      # electric blue
  accent-yellow: "#FFD400"
  accent-magenta: "#D63384"
  accent-cyan: "#03D1E5"
  muted: "#8386A0"
typography:
  heading: "Paramount Vista Sans, Peak Sans, Arial, sans-serif"
  body: "Peak Sans, Arial, Helvetica, sans-serif"
rounded: small        # mostly squared; modest radii on chips/cards
spacing: comfortable
components: [header, hero, brand-grid, card-grid, leadership-grid, news-feed, footer, cta-band, video-hero]
---

# Paramount — Design System (current-state, descriptive)

## Palette
- **#000A3C** deep navy — dominant background/canvas (by far the most frequent color).
- **#0064FF** electric blue — primary accent (links, CTAs, highlights).
- **#FFFFFF** white — primary text on navy, surface.
- **#FFD400** yellow, **#D63384** magenta, **#03D1E5** cyan — vivid secondary accents
  (brand-portfolio energy; used sparingly as pops).
- **#8386A0** muted slate — secondary/meta text.

Source: `_brand-extraction.json § palette` (cross-page computed-color frequency).

## Typography
- **Paramount Vista Sans** — proprietary brand display face (headlines / wordmark).
- **Peak Sans** — dominant UI/body face across the site (2600+ element hits).
- Arial/Helvetica fallback.
- Headlines are frequently **ALL-CAPS**, large, tight — declarative statements
  ("SHAPE THE FUTURE", "WE ARE").

Source: `_brand-extraction.json § fonts`.

## Motifs
- **Paramount mountain + 22 stars** emblem (inline SVG logo) — the signature mark.
- Deep-navy full-bleed sections with high-contrast white type.
- Imagery mosaics of show/title key-art (SpongeBob, NCIS, Star Trek, RuPaul…).
- **Signature film-montage video** (background/feature) on About/brand surfaces —
  must be reproduced as motion, not flattened.
- Squared-to-slightly-rounded cards; minimal shadow; flat, bold, cinematic.

## Components (observed system)
- Persistent **header** (mountain logo + About / News / Careers / Investors nav,
  mobile sub-menu drill-down).
- **Hero** — title statement over image mosaic / video.
- **Brand grid** — portfolio of brand logos/cards linking to brand detail pages.
- **Card grid / news feed** — news & press listings.
- **Leadership grid** — executive headshots → bio detail pages.
- **CTA band** — "Join Us" / careers prompts.
- **Footer** — secondary nav, legal, social.
