/**
 * filter — chip row above a product grid (listing). Chips are presentational
 * category markers (the grid is authored statically). The first chip is active.
 * Authoring (one block): one cell with a list (<ul><li>) or comma text of chip labels.
 */
export default async function decorate(block) {
  let labels = [...block.querySelectorAll('li')].map((li) => li.textContent.trim()).filter(Boolean);
  if (!labels.length) {
    const txt = block.textContent.trim();
    labels = txt.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
  }

  const row = document.createElement('div');
  row.className = 'filter-chips';
  row.setAttribute('role', 'group');
  row.setAttribute('aria-label', 'Filter');

  labels.forEach((label, i) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.textContent = label;
    chip.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    chip.addEventListener('click', () => {
      row.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', 'true');
    });
    row.append(chip);
  });

  block.textContent = '';
  block.append(row);
}
