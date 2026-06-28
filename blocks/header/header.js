import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Sony header — loads the /sony/nav fragment (brand logo link + nav links)
 * and builds a sticky header with a JS mobile hamburger.
 * @param {Element} block
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/sony/nav';
  const fragment = await loadFragment(navPath);
  block.textContent = '';
  if (!fragment) return;

  const links = [...fragment.querySelectorAll('a')];
  const brandLink = links.find((a) => a.querySelector('img')) || links[0];
  const navLinks = links.filter((a) => a !== brandLink);

  const header = document.createElement('div');
  header.className = 'header-bar';

  if (brandLink) {
    brandLink.classList.add('header-brand');
    brandLink.setAttribute('aria-label', 'Sony — home');
    header.append(brandLink);
  }

  const burger = document.createElement('button');
  burger.type = 'button';
  burger.className = 'header-burger';
  burger.setAttribute('aria-label', 'Toggle menu');
  burger.setAttribute('aria-expanded', 'false');
  burger.innerHTML = '<span></span><span></span><span></span>';

  const nav = document.createElement('nav');
  nav.className = 'header-nav';
  nav.setAttribute('aria-label', 'Primary');
  const ul = document.createElement('ul');
  navLinks.forEach((a) => {
    const li = document.createElement('li');
    li.append(a);
    ul.append(li);
  });
  nav.append(ul);

  burger.addEventListener('click', () => {
    const open = block.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  header.append(burger, nav);
  block.append(header);
}
