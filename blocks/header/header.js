/**
 * Bank of America — self-contained site header.
 * Content authors leave <header></header> empty; this block builds all chrome.
 * @param {Element} block The header block element
 */

const UTILITY_LINKS = [
  ['Locations', 'https://locators.bankofamerica.com/'],
  ['Contact Us', '/bankofamerica/customer-service/contact-us'],
  ['Help', 'https://www.bankofamerica.com/help/overview/'],
  ['En español', 'https://www.bankofamerica.com/es/'],
  ['Sign in', 'https://secure.bankofamerica.com/login/sign-in/signOnV2Screen.go'],
];

const NAV_LINKS = [
  ['Personal', '/bankofamerica/'],
  ['Wealth Management', 'https://www.ml.com/wealthmanagement.html'],
  ['Business', 'https://www.bankofamerica.com/business'],
  ['Corporations & Institutions', 'https://business.bofa.com/content/boaml/en_us/home.html'],
];

const LOGO_SVG = `
  <svg class="flag" viewBox="0 0 40 40" role="img" aria-hidden="true" focusable="false">
    <rect width="40" height="40" rx="8" fill="#012169"/>
    <path d="M9 26 L20 9 L23.5 14 L14.5 28 Z" fill="#E31837"/>
    <path d="M16.5 28 L25.5 14 L29 19.4 L21 31 Z" fill="#fff"/>
    <path d="M23.5 31 L31 19.6 L33 23 L29 31 Z" fill="#E31837"/>
  </svg>`;

const HAMBURGER_SVG = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>`;

function linkList(items) {
  return items.map(([label, href]) => {
    const esLang = label.includes('español') ? ' lang="es"' : '';
    return `<a href="${href}"${esLang}>${label}</a>`;
  }).join('');
}

export default async function decorate(block) {
  block.textContent = '';

  block.innerHTML = `
    <a class="skip-link" href="#main">Skip to main content</a>
    <div class="util-bar">
      <div class="util-inner">${linkList(UTILITY_LINKS)}</div>
    </div>
    <div class="header-main">
      <div class="header-inner">
        <a class="brand" href="/bankofamerica/" aria-label="Bank of America home">
          ${LOGO_SVG}
          <span class="word">Bank of America<span>What would you like the power to do?</span></span>
        </a>
        <nav class="primary-nav" id="primary-nav" aria-label="Primary">
          ${linkList(NAV_LINKS)}
        </nav>
        <div class="header-cta">
          <a class="button primary" href="https://promo.bankofamerica.com/hp-oaa2/">Open an account</a>
          <button class="nav-toggle" type="button" aria-expanded="false"
            aria-controls="primary-nav" aria-label="Open menu">${HAMBURGER_SVG}</button>
        </div>
      </div>
    </div>
    <div class="nav-scrim" hidden></div>`;

  const toggle = block.querySelector('.nav-toggle');
  const scrim = block.querySelector('.nav-scrim');
  const nav = block.querySelector('.primary-nav');

  const setOpen = (open) => {
    block.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    scrim.hidden = !open;
    document.body.style.overflowY = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setOpen(!block.classList.contains('nav-open')));
  scrim.addEventListener('click', () => setOpen(false));
  nav.addEventListener('click', (e) => { if (e.target.tagName === 'A') setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
}
