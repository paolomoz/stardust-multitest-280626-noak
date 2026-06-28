/**
 * stats — credibility numerals. Authoring: one row per stat (cell1 = number, cell2 = label).
 * A trailing single-cell row with long text becomes the disclaimer.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'stats-grid';
  let disclaimer = null;

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const stat = document.createElement('div');
      stat.className = 'stat';
      const num = document.createElement('div');
      num.className = 'stat-num';
      num.textContent = cells[0].textContent.trim();
      const label = document.createElement('div');
      label.className = 'stat-label';
      label.textContent = cells[1].textContent.trim();
      stat.append(num, label);
      grid.append(stat);
    } else if (cells.length === 1 && cells[0].textContent.trim().length > 80) {
      disclaimer = document.createElement('p');
      disclaimer.className = 'stats-disclaimer';
      disclaimer.textContent = cells[0].textContent.trim();
    }
  });

  block.textContent = '';
  block.append(grid);
  if (disclaimer) block.append(disclaimer);
}
