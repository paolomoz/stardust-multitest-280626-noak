# STARDUST Plugin Findings — sycamorepartners run

Log of generalizable issues with the stardust PLUGIN (skills/flow) — bugs, friction, improvement ideas. Site-specific content notes are intentionally excluded.

Format: [phase/skill] observation — suggested fix.

---

## Phase 0 — Setup
- (2026-06-28) Repo arrived as vanilla `aem-boilerplate` (head.html loads `aem.js`/`scripts.js`, no `ak.js`/`postlcp.js`/`lazy.js`). The prompt anticipates this and routes to the `stardust:deploy` Runtime bootstrap, but the *extract/direct/prototype* skills run fine before that — bootstrap is only needed at deploy. Noting the ordering held up.
- (2026-06-28) `.gitignore` in the boilerplate did NOT exclude `.env*`, `qa/`, or `samples/` (only `.hlx`, `coverage`, `logs`, `node_modules`). Phase 0 requires these excluded. Suggest the deploy bootstrap (or a scaffold step) enforce these `.gitignore` entries automatically.
- (2026-06-28) DA token smoke-test: `GET /source/{org}/{repo}/` and `/source/{org}/{repo}` both return 404 on an empty repo folder, which is ambiguous vs auth failure. `GET /list/{org}/{repo}` returns 200 and is the reliable auth smoke-test. Suggest skills document `/list/` as the canonical token smoke-test endpoint.

## Phase 1 — Extract
- (2026-06-28) The bundled crawler `skills/extract/scripts/crawl.mjs` does `import { chromium } from 'playwright'`, but it lives in the skill directory. When playwright is installed in the TARGET project's `node_modules` (per the skill's own setup guidance), ESM module resolution walks up from the *script's* location (the skill dir), NOT the project, so the crawler throws `ERR_MODULE_NOT_FOUND` even though playwright is correctly installed in the project. Had to copy `crawl.mjs` into the project (`qa/crawl.mjs`) and run it there. Suggest: skill should instruct copying the crawler into the project root before running, or resolve playwright via an absolute path / the project's node_modules explicitly.
- (2026-06-28) `npm i -D playwright` fails with ERESOLVE on the stock aem-boilerplate `package.json` (peer-dep conflict among the boilerplate's lint/test devDeps). Needed `--legacy-peer-deps`. Suggest the extract setup note mention `--legacy-peer-deps` for aem-boilerplate targets.
