<!--
_provenance:
  writtenBy: stardust:prototype (Phase 1)
  writtenAt: 2026-06-28T00:00:00Z
  readArtifacts: [stardust/current/pages/index.json, stardust/current/_brand-extraction.json, DESIGN.md, DESIGN.json, stardust/direction.md]
  surprise: low
  capturedSourceLineage: see ## Sections
  signatureElements: []   # source home heroes are static (no video/canvas/Lottie)
  copyCadenceBypass: { rules: [em-dash-overuse, marketing-buzzword], basis: captured-verbatim brand copy under Mode A }
-->

# Shape brief — index (home)

**Page:** Xfinity home. **Register:** brand. **Mode:** A (brand-faithful). **Surprise:** low. **IA fidelity:** verbatim-leaning.
**H1 (once):** "Get online in minutes with same-day WiFi"

## Sections (each = one EDS block candidate)

1. **header** — site-wide system component (`_brand-extraction.json#systemComponents.header`). Logo (xfinity SVG) + pillar nav (Internet/Mobile/TV & Streaming/Home Security/Deals) + Sign In / Bill utility. → block `header` (chrome fragment).
2. **hero** — captured `pages/index.json` hero. Headline "Get online in minutes with same-day WiFi" + subhead "Or get 300 Mbps WiFi, $40/mo for 1 year" + body "Pick up in-store and self-install your WiFi in less than 15 minutes." + CTA "Shop internet" → plan-builder. Layout: left-anchored type, right product image (880×1236 captured tile). → block `hero`.
3. **pillars** — captured pillar CTAs (Internet, Mobile, TV & Streaming, Home Security, Build your plan). Improvement #5: promote pillar row near top. Layout: 4–5 rounded cards, purple icons. → block `cards` variant `pillars`.
4. **moving** — captured "New home, same great service. Make your move with Xfinity." + body + CTA "Start your move" → /learn/moving. Layout: split image/text band on #f6f6f9. → block `feature` (media-text).
5. **streaming** — captured "Streaming, simplified. Streaming apps plus Gig WiFi all in one." → block `feature` variant reversed.
6. **mobile-promo** — captured "Cut your mobile bill in half. Plus, try free for a year. No commitment." CTA Shop plans. → block `feature`.
7. **device-deals** — consolidates captured iPhone 17 / Samsung Galaxy S26 / Google Pixel 10 offers (improvement #2: one grid, one disclaimer). → block `cards` variant `deals`.
8. **protection** — captured "Only Xfinity includes device protection for life" → block `feature`.
9. **cta-band** — direction-authorized (cta-band role). Purple full-width "Build your plan" conversion band. justified by improvements #3 (lean into purple) + commercial-conversion iaPriority. → block `cta`.
10. **footer** — site-wide system component (`_brand-extraction.json#systemComponents.footer`). Shop/Account/Company/Resources columns + legal. → block `footer`.

## anti-template pass
- hero: default reflex = centered-stack + dual CTA. Picked = left-anchored type + right product image (captured tiles are portrait product shots). rationale: brand uses portrait product imagery, not centered stock.
- pillars: default reflex = 5-up icon grid (the AI category-nav cliché). Picked = rounded labeled cards with purple accent — kept because audience-routing is a real brand IA priority; cards carry the brand's rounded-16px signature.
- device-deals: default = three separate banner rows (captured). Picked = one consolidated card grid (improvement #2).

## voiceClassification
All headlines/body = captured-verbatim (from pages/index.json). CTA labels = captured-verbatim. Fine-print ("Offer ends 7/21…") = captured-verbatim, rendered as caption (improvement #1). cta-band copy "Build your plan" = captured-verbatim CTA.

## substrateTransitions
default: white. exceptions (≤2): #f6f6f9 alternating bands on moving/streaming; purple cta-band. = 2 named transitions.

## unsourcedContent
none — all copy/CTAs/images sourced from capture.
