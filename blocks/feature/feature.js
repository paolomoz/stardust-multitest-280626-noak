/**
 * feature — media + text band. Variants via block class (surface, reverse).
 * Authoring: one cell with a <picture>/<img> (optional) and one cell with the
 * eyebrow / heading / body / CTA prose. When no image is authored, a branded
 * placeholder built from the heading text stands in.
 */
export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const mediaCell = cells.find((c) => c.querySelector('picture, img'));
  const copyCell = cells.find((c) => c !== mediaCell && c.textContent.trim());

  const media = document.createElement('div');
  media.className = 'feature-media';
  const copy = document.createElement('div');
  copy.className = 'feature-copy';

  if (copyCell) {
    while (copyCell.firstChild) copy.append(copyCell.firstChild);
    // the first child, when a short link-free <p>, is the eyebrow label
    const firstP = copy.firstElementChild;
    if (firstP && firstP.tagName === 'P' && !firstP.querySelector('a')
      && firstP.textContent.trim().length < 40) {
      firstP.classList.add('eyebrow');
    }
    // CTA paragraph(s)
    copy.querySelectorAll('p').forEach((p) => {
      if (p.querySelector('a')) p.classList.add('button-container');
    });
  }

  if (mediaCell) {
    while (mediaCell.firstChild) media.append(mediaCell.firstChild);
  } else {
    const ph = document.createElement('div');
    ph.className = 'feature-placeholder';
    const h = copy.querySelector('h1, h2, h3');
    ph.textContent = h ? h.textContent.trim() : '';
    media.append(ph);
  }

  const wrap = document.createElement('div');
  wrap.className = 'feature-inner';
  wrap.append(media, copy);
  block.replaceChildren(wrap);
}
