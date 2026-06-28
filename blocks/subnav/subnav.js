/**
 * subnav — sticky product-family sub-navigation (PDP).
 * Authoring (one block): first cell = product name; following cells/links = sub-nav links
 * (wrap a Buy link in <strong> to render it as a button).
 */
export default async function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const nameCell = cells.find((c) => !c.querySelector('a'));
  const name = nameCell ? nameCell.textContent.trim() : '';
  const links = [...block.querySelectorAll('a')];

  const row = document.createElement('div');
  row.className = 'subnav-row';

  const pn = document.createElement('span');
  pn.className = 'subnav-name';
  pn.textContent = name;

  const linkWrap = document.createElement('div');
  linkWrap.className = 'subnav-links';
  links.forEach((a) => linkWrap.append(a));

  row.append(pn, linkWrap);
  block.textContent = '';
  block.append(row);

  const section = block.closest('.section');
  if (section) section.classList.add('subnav-container');
}
