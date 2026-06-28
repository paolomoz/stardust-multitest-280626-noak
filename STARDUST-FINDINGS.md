# STARDUST Plugin Findings — paramount.com run (2026-06-28)

Log of issues/friction that generalize to the stardust PLUGIN itself (skills/flow),
not site-specific content notes. Each entry: skill/phase · what happened · suggested fix.

## Findings

### F1 · extract / Setup · bundled crawler can't run in-place (ESM resolution)
`skills/extract/scripts/crawl.mjs` does `import { chromium } from 'playwright'`.
Run as `node <skilldir>/crawl.mjs` it throws `ERR_MODULE_NOT_FOUND` even with
playwright installed in the *project*, because ESM resolves the bare specifier
relative to the **script file's** directory, not cwd. You must copy crawl.mjs
into the project to run it. Fix: document "copy crawl.mjs into the project first",
or have it resolve playwright via `createRequire(process.cwd())`, or ship it pre-placed.

### F2 · extract / Phases 3-6 · crawler does only the CORE; ~40% of extract is hand-built
`crawl.mjs` implements Phase 1-2 capture only, and even there omits per-section
computed styles (palette/type), logo extraction, hero/heroMedium elevation,
screenshots, media-file download. It writes NOTHING for Phase 3 (`_brand-extraction.json`),
Phase 4 (`PRODUCT.md`/`DESIGN.md`/`DESIGN.json`), Phase 5 (`brand-review.html`),
or Phase 6 (`state.json`). The skill says "extend capture()", but in practice the
operator hand-writes the entire brand surface + descriptive files + state. The
crawler and the skill's own Phase 3-6 are disconnected. Fix: ship a companion
`brand-surface.mjs` (palette/type/logo/hero aggregation) and a `state-writer.mjs`,
or have crawl.mjs emit the aggregation so `extract` is runnable end-to-end.

### F3 · extract / bot-management fallback keys only on thrown errors
The headed-Chrome fallback in crawl.mjs fires only when `goto()` THROWS a
H2/QUIC protocol error. An Akamai-fronted origin (paramount.com) returns a 403
Access-Denied *body* to plain curl while passing fine under headless chromium —
so here it was a non-issue, but a soft-403 (deny HTML at 200/403 status) would
slip through and be captured as a real page. Fix: also inspect response status +
known deny-page body signatures in the probe and fall back on those.

### F4 · extract / consent CTAs leak into capture
OneTrust "Accept All / Reject All / Manage Cookies" appeared in the home page's
captured `ctas[]` despite the consent pre-flight. The dismissal prunes the banner
by selector but the CTA harvest still picked them up. Fix: exclude consent-container
descendants from the `ctas[]`/`links[]` harvest, not just from headings/body.

### F5 · extract / detail-page H1 missed
news/press detail captures have `H1: undefined` — the article/release title sits
outside the in-main heading scan. body text captured fine. Fix: fall back to
`document.title`/`og:title` (minus site suffix) as the headline when no in-main h1.

### F6 · prototype / impeccable setup path doesn't resolve in plugin installs
`impeccable craft` Setup step 1 says run `node .claude/skills/impeccable/scripts/context.mjs`.
In a plugin install the scripts live at
`~/.claude/plugins/cache/impeccable/impeccable/<ver>/skills/impeccable/scripts/`,
not `.claude/skills/impeccable/`. The documented relative path doesn't exist, so
the operator must locate the plugin cache dir manually. Fix: resolve the script
path via the plugin manifest, or document the plugin-cache location.

### F7 · prototype / no "apply canon to sibling templates" in discovery mode
For a 10-template migration, invoking `impeccable craft` + the 4 gate phases
(critique/audit/adapt/motion) once per template is enormous. The canon-reuse model
(home establishes tokens + header/footer + section patterns; siblings deploy them)
is exactly what's needed, but it only exists in `prototype --prep` (canon write-back).
In plain discovery mode there's no mechanic to render template N reusing the
approved home canon, so the operator hand-drives canon reuse. Fix: expose the
canon write-back / "fork from approved archetype" path in non-prep prototype, or
have the master orchestrator default to --prep for multi-template migrations.

### F8 · prototype / detector design-system-color noise on Mode A tonal ramps
Brand-faithful (Mode A) renders need tonal shades of the pinned palette (a darker
navy footer #00072b, a card-hover #0d1a5e, a gradient end #0042c8) that aren't
among the 9 named DESIGN.json colors. The detector flags each as
`design-system-color` (advisory). Not wrong, but every Mode A page trips it. Fix:
auto-accept shades within a small ΔL/ΔC of a documented brand color as tonal-ramp
members rather than drift.
