<!--
_provenance:
  writtenBy: stardust:prototype
  writtenAt: 2026-06-28
  slug: en
  againstDirection: stardust/direction.md (Active 2026-06-28)
  readArtifacts:
    - stardust/current/pages/en.json
    - stardust/current/_brand-extraction.json
    - DESIGN.md
    - DESIGN.json
  surprise: low
  fidelity: refined
  capturedSourceLineage:
    - "header: site-wide system-component (_brand-extraction.json#systemComponents.header)"
    - "hero-carousel: pages/en.json hero slides (4 brand-film images) + voice.heroMedium signature"
    - "section-grid: pages/en.json global nav (6 primary sections)"
    - "news-rail: pages/en.json ctas filtered to News/Press/<date> + Latest News heading"
    - "footer: site-wide system-component (_brand-extraction.json#systemComponents.footer)"
  signatureElements:
    - kind: image-carousel
      capturedSource: "_brand-extraction.json#voice.heroMedium"
      mechanism: "auto-advancing cross-fade slideshow, ~6s, 4 slides"
      fallback: "hold first slide under prefers-reduced-motion"
  voiceClassification:
    - { section: hero, classification: captured-verbatim, source: "pages/en.json body[0]" }
    - { section: news-rail, classification: captured-verbatim, source: "pages/en.json ctas" }
  antiTemplatePass:
    - { pattern: hero, defaultReflex: "centered-stack hero + dual CTA", picked: "full-bleed carousel + left-anchored headline + scrim", rationale: "reproduces captured signature carousel; avoids SaaS silhouette" }
    - { pattern: section-nav, defaultReflex: "5-up icon card grid", picked: "image-led card grid reusing captured section imagery", rationale: "brand is image-forward; icons would be off-register" }
  substrateTransitions: { default: "white", exceptions: [ { substrate: "ink (#0a0a0a)", purpose: "footer anchor" } ] }
-->

# Shape brief — en (home)

**Register:** brand. **Density:** balanced (64px sections). **Surprise:** low (brand-faithful + improvements). **IA fidelity:** verbatim.

## Sections (in order)
1. **header** (system-component) — Sony wordmark (black) + global mega-nav: Businesses & Products, About Sony Group, Technology, Sustainability, Design, Careers, Investor Relations. Sticky. Mobile: hamburger.
2. **hero-carousel** — full-bleed auto-rotating slideshow of the 4 captured brand films (Spider-Man: Brand New Day, BRAVIA Short Film, Legacy of Sound, 1000X BTS). Left-anchored mixed-case headline over a bottom-left gradient scrim; slide caption + one "Read More" link. Auto-advance ~6s cross-fade; dots; `prefers-reduced-motion` holds slide 1. (Improvements #1, #3.)
3. **explore-grid** — "Explore Sony" card grid of the 6 primary sections, each an image + label card reusing captured section imagery. (Improvements #2.)
4. **news-rail** — "Latest News" as date+headline cards from captured press releases (Jun 23 Director Appointments; Jun 19 UNHCR partnership), link to all News Releases. (Improvements #5.)
5. **footer** (system-component) — ink (#0a0a0a) multi-column corporate footer + legal row (Terms, Privacy). White Sony wordmark.

## Layout strategy
- Hero: full-bleed 16:9 (min 78vh), headline two-column overlay bottom-left.
- Explore grid: 3-col desktop / 2-col tablet / 1-col mobile.
- News: 2-col cards desktop / stack mobile.

## Key states
- Carousel: autoplay, pause on hover/focus, dot nav, reduced-motion static.
- Cards: subtle hover lift + image zoom.

## Data attributes
Each `<section>` carries `data-section` and a `data-block` name (header, hero, explore, news, footer).

## Unsourced content
- None — all copy and imagery captured-verbatim. (Section card labels are the captured nav labels.)
