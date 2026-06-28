# EDS conversion log — Paramount

runtime: aem-boilerplate (vanilla; standard `.button`/`.default-content-wrapper`,
real header/footer blocks, `body.appear` paint gate). NO AuthorKit bootstrap
(per current stardust:deploy runtime-detect; see STARDUST-FINDINGS F9).

## Block inventory (7 + stock fragment)

| Block | Role | Source prototype section |
|---|---|---|
| `header` | chrome: mountain logo + nav + mobile burger; fragment `/paramount/nav` | canon header |
| `footer` | chrome: column nav + legal; fragment `/paramount/footer` | canon footer |
| `hero` | page hero; variant `video` = signature film-montage bg + scrim + reduced-motion still | home video-hero / page-hero |
| `cards` | responsive link-tile grid; variants `brands`, `tiles` | brand-grid / listing-grid |
| `feed` | item list; variant `dynamic` = query-index-first + static fallback | news/press feed |
| `prose` | long-form body on white surface | article/legal/bio/content |
| `cta` | closing call-to-action band | home cta-band |

## Decisions locked
- One prototype section = one block; same-pattern sections collapsed to variants
  (cards brands/tiles; hero / hero.video).
- Chrome via fragments at `/paramount/nav` + `/paramount/footer` (authorable, isolated).
- Fonts: Peak Sans / Paramount Vista Sans are proprietary — NOT redistributed.
  Fallback stack `"Helvetica Neue", Arial` (width-class match). Swap in licensed
  woff2 + @font-face to restore exact faces. (Licensing-safe default for this run.)
- Signature film-montage video reproduced on the home hero (autoplay/muted/loop +
  navy scrim + `prefers-reduced-motion` still fallback).
- Dynamic blocks: news + press feeds read EDS query-index (helix-query.yaml), with
  static fallback rows so the listing is never blank if the index lags.

## Isolation
All content authored under DA `/paramount/...`; fstab maps `/` → DA repo root.
Home = `/paramount/index` (delivered at `/paramount/`). Nothing written outside `/paramount/`.

## Anti-patterns avoided
- No `.block`-suffixed selectors / no AuthorKit `.btn` (vanilla `.button`).
- `img { height:auto }` reset; `main > .section:empty{display:none}` collapses consumed metadata band.
- No JS-gated `opacity:0` hidden content (noscript fallback in prototypes; blocks render visible).
- Internal links extensionless + no trailing slash (76/76 resolve 200).
- header `min-height` reserved to avoid late-load CLS.

## Verify (Phase 9)
- 79/79 delivered pages: 200, exactly one `<h1>`, sections>0, no `about:error`.
- 76/76 internal links resolve 200.
- Headless render (home + 9 templates): `body.appear`, header+footer decorated,
  blocks loaded, 0 broken images, 0 pageerrors.
- Known gap: named query-index not built on the feature branch (only `#simple`);
  feeds serve via static fallback. See STARDUST-FINDINGS F10.
