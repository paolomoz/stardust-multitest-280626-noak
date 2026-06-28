import { loadFragment } from '../fragment/fragment.js';

/**
 * Sycamore Partners header — logo + primary nav from a DA fragment.
 * Multi-tenant: site folder is derived from the current path (/sycamorepartners/...).
 */
function siteRoot() {
  const seg = window.location.pathname.split('/').filter(Boolean)[0];
  return seg ? `/${seg}` : '';
}

export default async function decorate(block) {
  const root = siteRoot();
  const fragment = await loadFragment(`${root}/nav`);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Primary');
  nav.id = 'nav';

  const brand = document.createElement('a');
  brand.className = 'nav-brand';
  brand.href = `${root}/`;
  brand.setAttribute('aria-label', 'Sycamore Partners home');
  const logo = document.createElement('img');
  logo.src = '/icons/sycamore-logo.png';
  logo.alt = 'Sycamore Partners';
  logo.width = 290; logo.height = 92;
  brand.append(logo);

  const list = document.createElement('ul');
  list.className = 'nav-links';
  const links = fragment ? [...fragment.querySelectorAll('a')] : [];
  links.forEach((a) => {
    if (a.querySelector('img, picture')) return;
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = a.getAttribute('href');
    link.textContent = a.textContent.trim();
    li.append(link);
    list.append(li);
  });

  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open navigation');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<span></span>';
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.append(brand, toggle, list);
  block.append(nav);
}
