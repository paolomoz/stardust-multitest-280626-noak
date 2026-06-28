/**
 * cta — closing call-to-action band (electric-blue).
 * Cells (tolerant): heading | sub text | CTA link(s).
 */
export default async function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const inner = document.createElement('div');
  inner.className = 'cta-inner';
  const textCol = document.createElement('div');
  let actions = null;
  cells.forEach((cell) => {
    const h = cell.querySelector('h1, h2, h3');
    const link = cell.querySelector('a');
    if (link) {
      actions = document.createElement('div');
      actions.className = 'cta-actions button-container';
      [...cell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    } else if (h) {
      h.classList.add('display');
      textCol.append(h.cloneNode(true));
    } else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      textCol.append(p);
    }
  });
  inner.append(textCol);
  if (actions) inner.append(actions);
  block.textContent = '';
  block.append(inner);
}
