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
