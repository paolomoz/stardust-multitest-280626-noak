<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-28T00:00:00Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/index.json
  stardustVersion: 0.13.1
-->

# Improvements — index (and site-wide)

1. **[cliché]** Pricing fine-print is rendered as `<h2>` headings ("Qualifying trade-in, new Mobile Plus line, and device payment plan req…") repeated under every device offer. This wrecks heading hierarchy and SEO and reads as shouting.
   *Fix:* Demote all legal/fine-print to small caption text; reserve headings for real section titles.

2. **[ia-clutter]** Home has three near-identical device-offer rows ("Get iPhone 17 on us", "Get Samsung Galaxy S26 on us", "Get Google Pixel 10 on us"), each with the same disclaimer, fragmenting the page.
   *Fix:* Consolidate into one "Latest phone deals" card grid (one disclaimer, three device cards).

3. **[missed-opportunity]** The signature Xfinity purple (#5a23b9) is barely used on the home page — it's nearly all black-on-white. The brand's most recognizable asset is underplayed.
   *Fix:* Lean purple into primary CTAs, section eyebrows, and one accent band so the page reads unmistakably Xfinity.

4. **[dated-pattern]** Offer tiles depend on portrait hover-imagery (440×618) that collapses awkwardly to stacked cards on smaller viewports.
   *Fix:* Use a consistent responsive card grid (2/3-up) with rounded 16px cards that degrade gracefully to a single column.

5. **[ia-clutter]** Primary pillars (Internet, Mobile, TV & Streaming, Home Security) are buried below promotional tiles.
   *Fix:* Add a clear product-pillar row near the top so each audience finds its track immediately.
