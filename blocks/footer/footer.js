import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Paramount footer — parses the /paramount/footer fragment into columns.
 * Each heading (h2/h3) + the list/links that follow it become one column.
 * A trailing paragraph (copyright / legal links) renders as the legal bar.
 */
export default async function decorate(block) {
  block.textContent = '';
  const path = getMetadata('footer') || '/paramount/footer';
  const frag = await loadFragment(path);
  const inner = document.createElement('div');
  inner.className = 'footer-inner';
  const cols = document.createElement('div');
  cols.className = 'footer-cols';

  if (frag) {
    const nodes = [...frag.querySelectorAll('h2, h3, ul, p')];
    let current = null;
    nodes.forEach((n) => {
      const tag = n.tagName.toLowerCase();
      if (tag === 'h2' || tag === 'h3') {
        current = document.createElement('div');
        current.className = 'footer-col';
        const h = document.createElement('h3');
        h.textContent = n.textContent.trim();
        current.append(h);
        cols.append(current);
      } else if (tag === 'ul' && current) {
        current.append(n.cloneNode(true));
      } else if (tag === 'p') {
        const legal = document.createElement('div');
        legal.className = 'footer-legal';
        legal.append(...[...n.childNodes].map((c) => c.cloneNode(true)));
        inner.dataset.hasLegal = 'true';
        inner.append(cols, legal);
      }
    });
  }
  if (!inner.dataset.hasLegal) inner.append(cols);
  block.append(inner);
}
