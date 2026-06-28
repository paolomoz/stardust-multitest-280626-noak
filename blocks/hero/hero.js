/**
 * hero — navy full-bleed photo + scrim, eyebrow, h1, lede, CTA.
 * Authoring: row1 = background <picture>/<img>; row2 = content
 *   (eyebrow <p>, <h1>, lede <p>, CTA <p> with <strong><a>/<em><a>).
 * Decodes by querying, tolerant of DA flattening.
 */
export default function decorate(block) {
  const pic = block.querySelector('picture, img');
  const h = block.querySelector('h1, h2');
  const ps = [...block.querySelectorAll('p')].filter((p) => p.textContent.trim() || p.querySelector('a'));
  const eyebrow = ps.find((p) => !p.querySelector('a') && p.textContent.trim().length < 40 && (!h || p.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING));
  const ctaP = ps.find((p) => p.querySelector('a'));
  const lede = ps.find((p) => p !== eyebrow && p !== ctaP && p.textContent.trim());

  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  if (pic) bg.append(pic.closest('picture') || pic);

  const wrap = document.createElement('div');
  wrap.className = 'hero-inner';
  if (eyebrow) { eyebrow.classList.add('eyebrow'); wrap.append(eyebrow); }
  if (h) wrap.append(h);
  if (lede) wrap.append(lede);
  if (ctaP) wrap.append(ctaP);

  block.replaceChildren(bg, wrap);
  block.closest('.section')?.classList.add('flush');
}
