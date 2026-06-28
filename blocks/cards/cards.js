/**
 * cards — brand-faithful card grid with variants:
 *   .cards.promo       large 2-up photo cards (image + title + CTA button)
 *   .cards.categories  clickable image cards (image + title, whole card links)
 *   .cards.products    circular product cards (image + name)
 *   .cards.gifts       clickable gift-card catalog (image + label)
 *
 * Authoring: one row per card. Each card row holds a <picture>/<img>, a heading,
 * and (optionally) a link/CTA — order-tolerant, classified by content.
 */
function buildCard(row) {
  const nodes = [...row.querySelectorAll(':scope > div')].flatMap((c) => {
    const kids = [...c.children];
    if (kids.length) return kids;
    return c.textContent.trim() ? [c] : [];
  });
  const isMedia = (n) => n.matches('picture, img') || n.querySelector('picture, img');
  const isHeading = (n) => /^H[1-6]$/.test(n.tagName) || n.querySelector('h1,h2,h3,h4,h5,h6');
  const media = nodes.find(isMedia);
  const heading = nodes.find(isHeading);
  const linkEl = nodes.find((n) => (n.tagName === 'A' || (n.querySelector && n.querySelector('a'))) && n !== heading);

  const card = document.createElement('article');
  card.className = 'card';

  if (media) {
    const mwrap = document.createElement('div');
    mwrap.className = 'card-media';
    const pic = media.matches('picture, img') ? media : media.querySelector('picture, img');
    mwrap.append(pic.closest('picture') || pic);
    card.append(mwrap);
  }

  const body = document.createElement('div');
  body.className = 'card-body';
  if (heading) {
    const h = /^H[1-6]$/.test(heading.tagName) ? heading : heading.querySelector('h1,h2,h3,h4,h5,h6');
    const h3 = document.createElement('h3');
    const inner = h.querySelector('a') || h;
    h3.textContent = inner.textContent.trim();
    body.append(h3);
  }
  if (linkEl && linkEl.querySelector && linkEl.querySelector('a.button')) {
    const actions = document.createElement('div');
    actions.className = 'card-actions';
    actions.append(...linkEl.childNodes);
    body.append(actions);
  }
  card.append(body);

  // whole-card link for non-promo variants (heading wraps a link, or a bare link)
  const headLink = heading && heading.querySelector ? heading.querySelector('a') : null;
  let href = headLink ? headLink.getAttribute('href') : null;
  if (!href && linkEl && linkEl.tagName === 'A') href = linkEl.getAttribute('href');
  if (href && !body.querySelector('a.button')) {
    const a = document.createElement('a');
    a.className = 'card';
    a.href = href;
    a.append(...card.childNodes);
    return a;
  }
  return card;
}

export default function decorate(block) {
  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  [...block.children].forEach((row) => grid.append(buildCard(row)));
  block.replaceChildren(grid);
}
