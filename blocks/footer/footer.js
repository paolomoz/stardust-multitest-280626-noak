import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const SAMSUNG_LOGO = '<svg viewBox="0 0 130 29" fill="currentColor" aria-hidden="true"><g transform="translate(-250 -7)"><path d="M0,13.835V12.482H4.609V14.2a1.558,1.558,0,0,0,1.724,1.6A1.509,1.509,0,0,0,8,14.6a2.237,2.237,0,0,0-.03-1.322C7.076,10.976.981,9.931.208,6.333a6.531,6.531,0,0,1-.029-2.4C.654,1.045,3.122,0,6.241,0,9.005,0,11.3.921,11.3,4.181V5.385H7.018V4.331a1.4,1.4,0,0,0-1.547-1.5,1.39,1.39,0,0,0-1.518,1.2,1.875,1.875,0,0,0,.015,1.053c.625,2.179,6.6,3.224,7.372,6.7a7.668,7.668,0,0,1,.029,2.875c-.42,2.95-3.036,4.025-6.27,4.025C2.379,18.687,0,17.5,0,14.391Z" transform="translate(294.6 9.823)"/></g></svg>';

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/samsung/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const inner = document.createElement('div');
  inner.className = 'footer-inner';

  const cols = document.createElement('div');
  cols.className = 'footer-cols';
  if (fragment) {
    while (fragment.firstElementChild) cols.append(fragment.firstElementChild);
  }
  inner.append(cols);

  const bar = document.createElement('div');
  bar.className = 'footer-bar';
  bar.innerHTML = `<a class="footer-logo" href="/samsung/" aria-label="Samsung">${SAMSUNG_LOGO}</a>
    <span>© 2026 Samsung Electronics America. All rights reserved.</span>`;
  inner.append(bar);

  block.append(inner);
}
