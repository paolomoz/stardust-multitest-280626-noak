# EDS conversion log — Bank of America

Block-name decisions locked before block code. Rule: one prototype `<section>` = one EDS block. Same-pattern sections collapsed into one block + variant classes. No reserved names (section/default-content/button/wrap).

## Block vocabulary (6 blocks)
| Block | Purpose | Variants used |
|---|---|---|
| `header` | Site-wide chrome: flagscape logo, utility nav, 4-pillar primary nav, Open an account CTA, mobile hamburger | (system component, identical across pages) |
| `footer` | Site-wide chrome: product/company/legal columns, FDIC + Equal Housing trust strip, social, copyright | (system component) |
| `hero` | Page hero: H1 + subcopy + one primary CTA, optional masthead bg image + legibility scrim | default; navy/cool-tint surface variants |
| `cards` | Image/title/blurb/CTA card grid | `products`, `card-offers`, `perks`, `resources`, `contact-topics` |
| `columns` | Multi-column link/content groups (2-3 up) | `news`, `security-app`, `categories`, `compare`, `connect`, `how-to`, `locations-appointment`, `social`, `call-us` |
| `accordion` | Accessible expand/collapse Q&A (native `<details>/<summary>`) | `faq` |

## Per-page block sequence
- index: header · hero · cards[products] · cards[card-offers] · columns[news] · columns[security-app] · footer
- credit-cards: header · hero · cards[card-offers] · columns[categories] · footer
- credit-cards-cash-back-credit-cards: header · hero · cards[card-offers] · columns[compare] · footer
- auto-loans-auto-loan-faq: header · hero · accordion[faq] · columns[connect] · footer
- preferred-rewards: header · hero · columns[how-to] · cards[perks] · accordion[faq] · footer
- about-bank-of-america: header · hero · columns[call-us] · cards[resources] · footer
- customer-service-contact-us: header · hero · cards[contact-topics] · columns[locations-appointment] · columns[social] · footer

## Notes
- `header`/`footer` are EDS fragments (authored at /bankofamerica/nav and /bankofamerica/footer; mapped via header/footer blocks).
- Fonts: Inter (substitute for proprietary Connections) + Roboto (real BoA body face) via Google Fonts.
- All content captured-verbatim; FAQ answers and phone numbers rendered only where present in capture (no fabrication).
