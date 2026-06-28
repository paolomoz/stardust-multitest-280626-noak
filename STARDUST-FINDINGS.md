# Stardust Plugin Findings — xfinity.com run (2026-06-28)

Findings that generalize to the stardust PLUGIN (skills/flow) — bugs, friction, improvement ideas.
Site-specific content notes are intentionally excluded.

Format: [PHASE/SKILL] — what happened — suggested fix.

---

## Findings

### F1 — [extract / crawl.mjs] Bot-management fallback misses HTTP 403 "Access Denied" soft-blocks
`launchWithFallback()` starts headless and only switches to headed real Chrome when
`isFingerprintBlock(err)` matches `ERR_HTTP2_PROTOCOL_ERROR|ERR_QUIC|ERR_CONNECTION_RESET|net::ERR`.
Akamai (xfinity.com) does NOT reject the TLS/H2 handshake — it serves a **200/403 HTML
"Access Denied" page**. Headless chromium got `status=403 title="Access Denied"`; headed
`channel:chrome` got `200`. Because a 403 throws `HTTPError` (not a fingerprint block), the
crawler never falls back and every page fails. SUGGESTED FIX: extend the fallback trigger to
also catch a 403/`Access Denied`/`Pardon Our Interruption`/`Request unsuccessful` soft-block
on the entry probe (detect by status>=403 on the entry URL OR a title/h1 matching a known
bot-wall pattern), and re-probe in headed Chrome before giving up. Also add a `--headed`/
`--channel` CLI flag so an operator who already knows the origin is bot-walled can skip the
headless probe entirely.

### F2 — [extract] crawl.mjs stops at Phase 2; no helper for Phases 3–6 and no computed-style capture
`crawl.mjs` only writes `pages/<slug>.json` + `_crawl-log.json`. Brand-surface aggregation,
PRODUCT/DESIGN authoring, brand-review.html, and state.json are left to the agent with no
helper, AND the per-page capture records no computed colors / font families / radii / shadows
(only `customProps` = `:root` CSS vars, empty on most modern sites). Every run must hand-roll a
2nd Playwright pass for palette/type. FIX: have `capture()` emit a `computedStyleSummary`
(frequency-sorted colors/fonts/sizes/radii/shadows) and ship a `brand-surface.mjs` aggregator.

### F3 — [extract] Logo locator picks the OneTrust cookie-banner logo; misses shadow-DOM chrome
v1 logo chain resolved to `cdn.cookielaw.org/.../ot_company_logo.png` (OneTrust consent
dialog). The real logo + all nav/footer links lived in `<xc-header>`/`<xc-footer>` web-component
**shadow roots** and were invisible to the light-DOM walk. FIX: (a) exclude consent-vendor
domains (cookielaw.org/onetrust/trustarc/cookiebot) from the logo chain; (b) walk shadow roots
for logo + nav/footer when the light-DOM header is empty (modern enterprise sites render chrome
as shadow-DOM web components).

### F4 — [prototype] craft mandated but per-template gate stack is redundant for single-direction Mode A
craft.md correctly collapses gates 2–4 when the harness lacks native image-gen, but prototype
still wants a full craft+critique+audit+adapt+motion render per template. For a faithful Mode-A
migration where all templates share ONE design system, the canon is set by the home render and
re-running the entire 2.5–2.8 stack per template is largely redundant. FIX: document a
"canon-reuse" fast path so non-canon templates compose from canon without the full gate stack.
