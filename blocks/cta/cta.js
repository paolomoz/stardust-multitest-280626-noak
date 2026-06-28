/**
 * cta — full-width purple conversion band. Heading + CTA button(s).
 * Authoring: a heading cell and a cell with the CTA link(s) (<strong><a> primary).
 */
export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')].filter((c) => c.textContent.trim() || c.querySelector('a'));
  const inner = document.createElement('div');
  inner.className = 'cta-inner';
  cells.forEach((cell) => {
    if (cell.querySelector('a')) {
      const actions = document.createElement('div');
      actions.className = 'button-container';
      while (cell.firstChild) actions.append(cell.firstChild);
      inner.append(actions);
    } else {
      const copy = document.createElement('div');
      copy.className = 'cta-copy';
      while (cell.firstChild) copy.append(cell.firstChild);
      inner.append(copy);
    }
  });
  block.replaceChildren(inner);
}
