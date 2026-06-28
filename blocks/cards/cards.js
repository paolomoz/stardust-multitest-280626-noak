/**
 * cards — image + label card grid. Whole card is a link.
 * Variants: `cards` (explore, 3-up), `cards story` (editorial story grid).
 * Authoring: one row per card; cells: image | label(+link) [| description].
 *   <div class="cards"><div><div><img></div><div><a href>Label</a></div></div>...</div>
 */
function pick(cell, sel) {
  if (!cell) return null;
  return cell.matches?.(sel) ? cell : cell.querySelector(sel);
}

export default async function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  rows.forEach((row) => {
    const cells = [...row.children];
    let img = null; let link = null; let labelText = ''; let desc = '';
    cells.forEach((c) => {
      const p = pick(c, 'picture, img');
      const a = pick(c, 'a');
      if (p && !img) img = p;
      if (a && !link) link = a;
      const t = c.textContent.trim();
      if (t && !p) { if (!labelText) labelText = t; else if (!desc) desc = t; }
    });
    const href = link ? link.getAttribute('href') : '#';
    const label = (link && link.textContent.trim()) || labelText || '';
    const card = document.createElement('a');
    card.className = 'card';
    card.href = href;

    const media = document.createElement('div');
    media.className = 'card-media';
    if (img) media.append(img.closest('picture') || img);
    card.append(media);

    const body = document.createElement('div');
    body.className = 'card-label';
    const span = document.createElement('span');
    span.className = 'card-title';
    span.textContent = label;
    body.append(span);
    if (desc) {
      const d = document.createElement('span');
      d.className = 'card-desc';
      d.textContent = desc;
      body.append(d);
    } else {
      const arrow = document.createElement('span');
      arrow.className = 'card-arrow';
      arrow.textContent = '→';
      body.append(arrow);
    }
    card.append(body);
    grid.append(card);
  });

  block.textContent = '';
  block.append(grid);
}
