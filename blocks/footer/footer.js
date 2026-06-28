import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Sony footer — loads the /sony/footer fragment (logo, column lists, legal row).
 * @param {Element} block
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/sony/footer';
  const fragment = await loadFragment(footerPath);
  block.textContent = '';
  if (!fragment) return;
  const footer = document.createElement('div');
  footer.className = 'footer-inner';
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  block.append(footer);
}
