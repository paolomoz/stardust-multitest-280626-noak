import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * cards — generic card grid with variants (pillars, deals, brands).
 * Each row = one card. Cells flatten into the card body.
 * - A card whose body is a single anchor becomes fully clickable (pillars).
 * - A leading <strong>/<em>-only paragraph renders as a .badge.
 * - <picture> cell renders as .cards-card-image.
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });

    const body = li.querySelector('.cards-card-body');
    if (body) {
      const first = body.firstElementChild;
      if (first && first.tagName === 'P' && first.children.length === 1
        && /^(STRONG|EM)$/.test(first.firstElementChild.tagName)
        && first.textContent.trim() === first.firstElementChild.textContent.trim()) {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = first.textContent.trim();
        first.replaceWith(badge);
      }
      const links = body.querySelectorAll('a');
      if (links.length === 1 && block.classList.contains('pillars')) {
        li.classList.add('card-link');
        const a = document.createElement('a');
        a.className = 'card-link-overlay';
        a.href = links[0].getAttribute('href');
        a.setAttribute('aria-label', links[0].textContent.trim());
        li.append(a);
      }
    }
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture')
    .replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}
