/**
 * steps — numbered how-it-works grid (e.g. Rewards).
 *
 * Authoring: one row per step. Each row's cell holds a heading + paragraph.
 * The step number is generated automatically from row order.
 */
export default function decorate(block) {
  const grid = document.createElement('div');
  grid.className = 'steps-grid';
  [...block.children].forEach((row, i) => {
    const step = document.createElement('div');
    step.className = 'step';
    const num = document.createElement('div');
    num.className = 'step-num';
    num.textContent = String(i + 1);
    step.append(num);
    const cell = row.querySelector(':scope > div') || row;
    while (cell.firstChild) step.append(cell.firstChild);
    grid.append(step);
  });
  block.replaceChildren(grid);
}
