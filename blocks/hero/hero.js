/**
 * hero — full-bleed key-visual hero with legibility scrim.
 * Authoring (one block, cells in any order; classified by content):
 *   - a <picture>/<img>            → background key visual
 *   - eyebrow: a <p><em>…</em></p> → small label above the headline (optional)
 *   - <h1>                         → the page headline (single h1)
 *   - a link-free <p>              → subhead (optional)
 *   - a link-bearing <p>           → CTAs (<strong><a>=primary, <em><a>=secondary)
 * Variant: `hero article` — editorial hero (bottom-anchored, no subhead emphasis).
 */
export default async function decorate(block) {
  const isArticle = block.classList.contains('article');
  const pic = block.querySelector('picture, img');
  const heading = block.querySelector('h1, h2');
  const paras = [...block.querySelectorAll('p')];
  const eyebrow = paras.find((p) => p.querySelector('em') && !p.querySelector('a'));
  const ctaP = paras.find((p) => p.querySelector('a'));
  const subhead = paras.find((p) => p !== eyebrow && p !== ctaP && p.textContent.trim());

  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  if (pic) {
    bg.append(pic.closest('picture') || pic);
    // The hero is the LCP element but lives in the second section, so the
    // boilerplate's waitForFirstImage (which only eager-loads the first
    // section's first image — here a metadata-only section with no image)
    // misses it and the hero ships loading="lazy". Force it eager + high
    // priority so the LCP fetch isn't deprioritised.
    const heroImg = bg.querySelector('img');
    if (heroImg) {
      heroImg.setAttribute('loading', 'eager');
      heroImg.setAttribute('fetchpriority', 'high');
    }
  }

  const inner = document.createElement('div');
  inner.className = 'hero-inner';
  const wrap = document.createElement('div');
  wrap.className = 'hero-wrap';

  if (eyebrow) { eyebrow.className = 'hero-eyebrow'; wrap.append(eyebrow); }
  if (heading) wrap.append(heading);
  if (subhead) { subhead.className = 'hero-sub'; wrap.append(subhead); }
  if (ctaP) { ctaP.classList.add('hero-cta'); wrap.append(ctaP); }
  inner.append(wrap);

  block.textContent = '';
  block.append(bg, inner);

  const section = block.closest('.section');
  if (section) section.classList.add('hero-container', 'full-bleed');
  if (isArticle) block.classList.add('hero-article');
}
