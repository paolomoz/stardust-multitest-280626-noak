<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-28
  readArtifacts: [stardust/current/_brand-extraction.json, stardust/current/pages/us-home.json]
-->

# Improvements — home (and template floor for all variants)

1. **[dated-pattern]** Source hero is image-led but the headline sits in a
   crowded stack; weight/scale contrast is inconsistent across sections.
   *Fix:* left-anchored display headline (weight 800, ratio 1.333) over a
   navy-scrimmed brand photo; one primary pill CTA.

2. **[ia-clutter]** Home mixes many in-page CTAs/disclosure links of varying
   verbs and weights, fragmenting the funnel.
   *Fix:* one canonical primary CTA per section ("Get the PayPal app" /
   "Sign Up"); demote disclosures to footnote text links.

3. **[contrast]** Sky #60CDFF appears on white/light surfaces; as small text it
   fails WCAG AA.
   *Fix:* reserve sky for large text / decorative shapes; action text uses
   blue #0070E0 (AA on white) and white-on-navy.

4. **[cliché]** All-caps eyebrow labels read as shouting at scale.
   *Fix:* mixed-case headlines; uppercase only for short eyebrows/badges.

5. **[missed-opportunity]** Strong lifestyle photography is rendered in small
   layered cards.
   *Fix:* promote to editorial-scale media (24px radius), 16:9 / 4:5 crops in
   a clean responsive grid.
