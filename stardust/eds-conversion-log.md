# EDS conversion log — block name decisions

Rule: one prototype `<section>` = one EDS block. Reserved names avoided
(`section`, `default-content`, `button`, `wrap`). AuthorKit/vanilla EDS: block CSS
scoped as `.<name>` (this repo is vanilla aem-boilerplate, so `.block` IS added by
`decorateBlock`; standard EDS conventions apply here — confirmed via scripts/aem.js).

## Blocks (from home archetype + template archetypes)

| Block | Source section | Variants | Used by templates |
|---|---|---|---|
| `header` | site header/nav (fragment) | — | all (nav fragment) |
| `footer` | site footer (fragment) | — | all (footer fragment) |
| `hero` | home hero (video) | `hero` (video), `hero page` (title-only) | home; page-hero on all inner pages |
| `stats` | home stat band | — | home, approach |
| `columns` | overview two-column | `columns` | home overview, approach, contact |
| `cards` | news card pair | `cards news` | home news, news listing |
| `logo-grid` | investments grid | `logo-grid` (dynamic) | home, investments listing |
| `prose` | article body | — | news-article, investment-info, approach, terms |
| `people` | team grid | — | team |
| `contact` | contact info | — | contact |

## Dynamic blocks (read query-index, see stardust/dynamic-blocks-map.md)
- `cards news` on /news → reads news index (PublishDate, Title, Path).
- `logo-grid` on /investments → reads investments index (Company, Logo, Path, Sector).

## Notes
- Home rendered via impeccable craft (stardust:prototype Phase 2). Remaining template
  archetypes reuse the home `:root` tokens + chrome per stardust:prototype "reuse the
  chosen design identity" — authored against the same design system.
