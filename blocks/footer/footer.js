import { loadFragment } from '../fragment/fragment.js';

function siteRoot() {
  const seg = window.location.pathname.split('/').filter(Boolean)[0];
  return seg ? `/${seg}` : '';
}

export default async function decorate(block) {
  const root = siteRoot();
  const fragment = await loadFragment(`${root}/footer`);
  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'footer-inner';
  if (fragment) while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  block.append(footer);
}
