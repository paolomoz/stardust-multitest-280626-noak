/**
 * cards — product / feature / value tile grid. Variants (block class):
 *   - cards products  (default): product tile = image + h3 + Buy CTA
 *   - cards features  (dark image tiles): image + h3 + text link
 *   - cards values    (text+link, no image): h3 + body + link
 * Authoring: optional leading head row (single cell with an h2 [+ a "more" link]);
 * then ONE row per card. Cells classified by content (image / heading / text / link).
 */
function collectCells(row) {
  return [...row.children];
}

export default async function decorate(block) {
  const variant = ['features', 'values'].find((v) => block.classList.contains(v)) || 'products';
  const rows = [...block.children];

  // detect head row: a row whose single cell has a heading and no image
  let head = null;
  if (rows.length) {
    const first = rows[0];
    const cell = first.firstElementChild;
    const isCardish = first.children.length > 1 || cell?.querySelector('picture, img');
    if (cell && cell.querySelector('h1, h2, h3') && !cell.querySelector('picture, img') && !isCardish) {
      head = first;
    }
  }
  const cardRows = rows.filter((r) => r !== head);

  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  cardRows.forEach((row) => {
    const cells = collectCells(row);
    const card = document.createElement('article');
    card.className = 'card';

    const pic = row.querySelector('picture, img');
    const heading = row.querySelector('h1, h2, h3, h4');
    const link = row.querySelector('a');
    const texts = cells
      .map((c) => c)
      .flatMap((c) => [...c.querySelectorAll('p')])
      .filter((p) => p.textContent.trim() && !p.querySelector('a'));

    if (pic && variant !== 'values') {
      const media = document.createElement('div');
      media.className = 'card-media';
      media.append(pic.closest('picture') || pic);
      card.append(media);
    }
    const body = document.createElement('div');
    body.className = 'card-body';
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      body.append(h);
    }
    texts.forEach((p) => { p.className = 'card-text'; body.append(p); });
    if (link) {
      const act = document.createElement('p');
      act.className = 'card-act';
      act.append(link);
      body.append(act);
    }
    card.append(body);
    grid.append(card);
  });

  block.textContent = '';
  if (head) {
    const h = document.createElement('div');
    h.className = 'cards-head';
    while (head.firstElementChild) {
      const cell = head.firstElementChild;
      while (cell.firstElementChild) h.append(cell.firstElementChild);
      cell.remove();
    }
    block.append(h);
  }
  block.append(grid);
}
