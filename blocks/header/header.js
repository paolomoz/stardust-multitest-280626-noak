import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Paramount header — mountain logo + primary nav + mobile burger.
 * Sources nav links from the /paramount/nav fragment (authorable in DA).
 * Block JS runs in the lazy phase, so the burger is a real listener.
 */
export default async function decorate(block) {
  block.textContent = '';
  const navPath = getMetadata('nav') || '/paramount/nav';
  const frag = await loadFragment(navPath);
  const links = frag ? [...frag.querySelectorAll('a')] : [];

  const inner = document.createElement('div');
  inner.className = 'header-inner';

  const brand = document.createElement('a');
  brand.className = 'header-brand';
  brand.href = '/paramount/';
  brand.setAttribute('aria-label', 'Paramount home');
  brand.innerHTML = '<img src="/icons/paramount-logo-white.svg" alt="Paramount" width="42" height="34"><span>Paramount</span>';

  const nav = document.createElement('nav');
  nav.className = 'header-nav';
  nav.id = 'paramount-nav';
  links.forEach((a) => {
    const link = document.createElement('a');
    link.href = a.getAttribute('href');
    link.textContent = a.textContent.trim();
    nav.append(link);
  });

  const burger = document.createElement('button');
  burger.className = 'header-burger';
  burger.type = 'button';
  burger.setAttribute('aria-label', 'Menu');
  burger.setAttribute('aria-expanded', 'false');
  burger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  burger.addEventListener('click', () => {
    const open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    burger.setAttribute('aria-expanded', String(!open));
  });

  inner.append(brand, burger, nav);
  block.append(inner);
}
