/**
 * Bank of America — self-contained site footer.
 * Content authors leave <footer></footer> empty; this block builds all chrome.
 * Internal links use /bankofamerica/... where a local page exists; otherwise
 * captured absolute bankofamerica.com URLs.
 * @param {Element} block The footer block element
 */

const COLUMNS = [
  ['Products', [
    ['Checking', 'https://www.bankofamerica.com/deposits/checking/advantage-banking/'],
    ['Savings', 'https://www.bankofamerica.com/deposits/savings/savings-accounts/'],
    ['Credit cards', '/bankofamerica/credit-cards'],
    ['Home loans', 'https://www.bankofamerica.com/mortgage/home-mortgage/'],
    ['Auto loans', 'https://www.bankofamerica.com/auto-loans/'],
    ['Investing', 'https://www.merrilledge.com/'],
  ]],
  ['About Bank of America', [
    ['About Bank of America', '/bankofamerica/customer-service/contact-us/about-bank-of-america'],
    ['Careers', 'https://careers.bankofamerica.com/'],
    ['Newsroom', 'https://newsroom.bankofamerica.com/'],
    ['Investor relations', 'https://investor.bankofamerica.com/'],
  ]],
  ['Legal & Privacy', [
    ['Privacy', 'https://www.bankofamerica.com/security-center/privacy-overview/'],
    ['Security', 'https://www.bankofamerica.com/security-center/overview/'],
    ['Online banking service agreement', 'https://www.bankofamerica.com/online-banking/service-agreement.go'],
    ['Accessibility', 'https://www.bankofamerica.com/accessible-banking/overview'],
  ]],
];

const SOCIAL = [
  ['Facebook', 'https://www.facebook.com/BankofAmerica',
    '<path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.5c0-.3.2-.5.5-.5z"/>'],
  ['Instagram', 'https://instagram.com/bankofamerica/',
    '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>'
    + '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/>'
    + '<circle cx="17.5" cy="6.5" r="1.2"/>'],
  ['X', 'https://x.com/BankofAmerica',
    '<path d="M17.5 3h3l-6.6 7.5L21.5 21h-5.7l-4.2-5.5L6.5 21h-3l7-8L2.5 3h5.8l3.8 5z"/>'],
];

const SHIELD_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="1.8" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>`;

const HOUSE_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="1.8" aria-hidden="true"><path d="M3 11l9-7 9 7"/><path d="M5 10v9h14v-9"/>
  <rect x="10" y="13" width="4" height="6"/></svg>`;

function renderColumns() {
  return COLUMNS.map(([heading, links]) => `
    <div class="footer-col">
      <h4>${heading}</h4>
      <ul>${links.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul>
    </div>`).join('');
}

function renderSocial() {
  return SOCIAL.map(([label, href, svg]) => `
    <a href="${href}" aria-label="${label}">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${svg}</svg>
    </a>`).join('');
}

export default async function decorate(block) {
  block.textContent = '';

  block.innerHTML = `
    <div class="trust">
      <div class="trust-inner">
        <div class="trust-item">
          ${SHIELD_SVG}
          <span>FDIC-Insured &mdash; Backed by the full faith and credit of the U.S. Government</span>
        </div>
        <div class="trust-item">
          ${HOUSE_SVG}
          <a href="https://www.bankofamerica.com/help/equalhousing-popup/">Equal Housing Lender</a>
        </div>
      </div>
    </div>
    <div class="footer-main">
      <div class="footer-inner">
        <h2>Connect with us</h2>
        <div class="footer-social" aria-label="Social media">${renderSocial()}</div>
        <div class="footer-cols">${renderColumns()}</div>
        <div class="footer-legal">
          <p>&copy; 2026 Bank of America Corporation.</p>
          <p>Banking products are provided by Bank of America, N.A. and affiliated banks,
            Members FDIC and wholly owned subsidiaries of Bank of America Corporation.</p>
        </div>
      </div>
    </div>`;
}
