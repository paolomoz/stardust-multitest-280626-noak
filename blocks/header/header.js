import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const SAMSUNG_LOGO = '<svg viewBox="0 0 130 29" fill="currentColor" aria-hidden="true"><g transform="translate(-250 -7)"><path d="M0,13.835V12.482H4.609V14.2a1.558,1.558,0,0,0,1.724,1.6A1.509,1.509,0,0,0,8,14.6a2.237,2.237,0,0,0-.03-1.322C7.076,10.976.981,9.931.208,6.333a6.531,6.531,0,0,1-.029-2.4C.654,1.045,3.122,0,6.241,0,9.005,0,11.3.921,11.3,4.181V5.385H7.018V4.331a1.4,1.4,0,0,0-1.547-1.5,1.39,1.39,0,0,0-1.518,1.2,1.875,1.875,0,0,0,.015,1.053c.625,2.179,6.6,3.224,7.372,6.7a7.668,7.668,0,0,1,.029,2.875c-.42,2.95-3.036,4.025-6.27,4.025C2.379,18.687,0,17.5,0,14.391Z" transform="translate(294.6 9.823)"/></g></svg>';

const ICON = {
  search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  account: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  cart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M6 6 5 3H2"/></svg>',
  burger: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
};

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/samsung/nav';
  const fragment = await loadFragment(navPath);

  let links = [];
  if (fragment) {
    const list = fragment.querySelector('ul');
    const src = list ? [...list.querySelectorAll('a')] : [...fragment.querySelectorAll('a')];
    links = src.map((a) => ({ href: a.getAttribute('href'), label: a.textContent.trim() }));
  }
  if (!links.length) {
    links = [
      ['Mobile', '/samsung/us/smartphones/all-smartphones'],
      ['TV & AV', '/samsung/us/tvs/all-tvs'],
      ['Appliances', '/samsung/us/home-appliances'],
      ['Computers & Monitors', '/samsung/us/monitors'],
      ['Explore', '/samsung/us/explore'],
      ['Support', '/samsung/us/support'],
      ['Offers', '/samsung/us/offers'],
    ].map(([label, href]) => ({ label, href }));
  }

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.className = 'nav';
  nav.setAttribute('aria-label', 'Main navigation');

  const logo = document.createElement('a');
  logo.className = 'nav-logo';
  logo.href = '/samsung/';
  logo.setAttribute('aria-label', 'Samsung');
  logo.innerHTML = SAMSUNG_LOGO;

  const ul = document.createElement('ul');
  ul.className = 'nav-links';
  links.forEach(({ href, label }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href || '#';
    a.textContent = label;
    li.append(a);
    ul.append(li);
  });

  const util = document.createElement('div');
  util.className = 'nav-util';
  util.innerHTML = `
    <a href="/samsung/us/search" aria-label="Search">${ICON.search}</a>
    <a href="/samsung/us/support/account" aria-label="Account">${ICON.account}</a>
    <a href="https://shop.samsung.com/us/cart" aria-label="Cart">${ICON.cart}</a>`;

  const burger = document.createElement('button');
  burger.className = 'nav-burger';
  burger.type = 'button';
  burger.setAttribute('aria-label', 'Menu');
  burger.setAttribute('aria-expanded', 'false');
  burger.innerHTML = ICON.burger;
  burger.addEventListener('click', () => {
    const open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    burger.setAttribute('aria-expanded', String(!open));
  });

  nav.append(logo, ul, util, burger);
  block.append(nav);
}
