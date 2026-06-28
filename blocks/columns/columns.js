/**
 * Bank of America — multi-column content/link groups.
 * Authoring: ONE ROW PER COLUMN (or one row with N cells); each cell holds an
 * <h3> plus links / <p>s / lists. Renders an equal responsive grid (1 col on mobile).
 * Variant classes (news|security-app|categories|compare|connect|how-to|
 * locations-appointment|social|call-us) style the grid.
 * @param {Element} block The columns block element
 */
export default function decorate(block) {
  const grid = document.createElement('div');
  grid.className = 'columns-grid';

  [...block.children].forEach((row) => {
    const cells = row.children.length ? [...row.children] : [row];
    cells.forEach((cell) => {
      const col = document.createElement('div');
      col.className = 'column';
      while (cell.firstChild) col.append(cell.firstChild);
      if (col.querySelector('picture, img') && !col.textContent.trim()) {
        col.classList.add('column-image');
      }
      grid.append(col);
    });
  });

  block.textContent = '';
  block.append(grid);
}
