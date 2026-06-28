/**
 * hero — full-bleed photo hero with overlaid eyebrow + H1 + CTA.
 *
 * Authoring (query-based, order-tolerant):
 *   - a <picture>/<img>        → background image
 *   - link-free short <p>      → eyebrow
 *   - the heading              → H1 (page lead)
 *   - link-bearing <p>         → CTA(s) (primary <strong>, secondary <em>)
 */
export default function decorate(block) {
  const media = block.querySelector('picture, img');
  const heading = block.querySelector('h1, h2, h3');
  const ps = [...block.querySelectorAll('p')];
  const ctaP = ps.find((p) => p.querySelector('a'));
  const eyebrow = ps.find((p) => !p.querySelector('a') && p !== ctaP);

  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  if (media) bg.append(media.closest('picture') || media);

  const inner = document.createElement('div');
  inner.className = 'hero-inner';
  if (eyebrow) { eyebrow.classList.add('hero-eyebrow'); inner.append(eyebrow); }
  if (heading) {
    let h = heading;
    if (heading.tagName !== 'H1') {
      h = document.createElement('h1');
      h.append(...heading.childNodes);
    }
    inner.append(h);
  }
  if (ctaP && ctaP.querySelector('a')) {
    const actions = document.createElement('div');
    actions.className = 'hero-actions';
    actions.append(...ctaP.childNodes);
    inner.append(actions);
  }

  block.replaceChildren(bg, inner);
}
