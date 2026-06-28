/**
 * cards — responsive grid of link tiles. Variants: `brands`, `tiles`.
 * Each row = one card. Cells (tolerant):
 *   - cell with <a> (or first cell)  -> card title + destination (whole card links)
 *   - following text cell            -> description
 * A leading row whose only content is a heading is treated as the section head.
 */
const SPARKS = ['var(--spark-cyan)', 'var(--spark-yellow)', 'var(--spark-magenta)', 'var(--signal)'];

export default async function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  let i = 0;
  rows.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find((c) => c.querySelector('a')) || cells[0];
    if (!linkCell) return;
    const a = linkCell.querySelector('a');
    const title = (a ? a.textContent : linkCell.textContent).trim();
    if (!title) return;
    const href = a ? a.getAttribute('href') : null;
    const descCell = cells.find((c) => c !== linkCell && c.textContent.trim());
    const card = document.createElement(href ? 'a' : 'div');
    card.className = 'card';
    card.style.setProperty('--spark', SPARKS[i % SPARKS.length]);
    if (href) card.href = href;
    const name = document.createElement('span');
    name.className = 'card-name';
    name.textContent = title;
    card.append(name);
    if (descCell) {
      const p = document.createElement('p');
      p.textContent = descCell.textContent.trim();
      card.append(p);
    }
    if (href) {
      const more = document.createElement('span');
      more.className = 'card-more';
      more.textContent = 'Explore →';
      card.append(more);
    }
    grid.append(card);
    i += 1;
  });
  block.textContent = '';
  block.append(grid);
}
