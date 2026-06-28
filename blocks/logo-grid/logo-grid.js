/**
 * logo-grid — portfolio companies.
 * Authored: one row per company: cell1 = picture/img, cell2 = link (name + href).
 * Dynamic: an empty block (or first cell a path like /sycamorepartners/investments-index.json)
 *   fetches the EDS query-index and renders tiles from it.
 */
function tile(href, imgSrc, name) {
  const a = document.createElement('a');
  a.className = 'logo-tile';
  a.href = href || '#';
  if (imgSrc) {
    const img = document.createElement('img');
    img.src = imgSrc; img.alt = name || ''; img.loading = 'lazy';
    a.append(img);
  }
  const span = document.createElement('span');
  span.className = 'logo-name';
  span.textContent = name || '';
  a.append(span);
  return a;
}

async function fromIndex(indexPath) {
  try {
    const res = await fetch(indexPath);
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).map((row) => tile(
      row.path || row.Path,
      row.image || row.logo || row.Logo,
      row.company || row.Company || row.title,
    ));
  } catch (e) { return []; }
}

export default async function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'logo-grid-inner';

  // detect a config/index path
  const firstText = rows[0]?.textContent.trim() || '';
  const isDynamic = rows.length === 0 || /index\.json$/.test(firstText);
  const seg = window.location.pathname.split('/').filter(Boolean)[0];
  const root = seg ? `/${seg}` : '';
  let indexPath = null;
  if (isDynamic) {
    indexPath = /index\.json$/.test(firstText) ? firstText : `${root}/investments-index.json`;
  }

  if (isDynamic) {
    const tiles = await fromIndex(indexPath);
    tiles.forEach((t) => grid.append(t));
  } else {
    rows.forEach((row) => {
      const cells = [...row.children];
      const img = cells[0]?.querySelector('img, picture');
      const link = row.querySelector('a');
      let imgEl = null;
      if (img) imgEl = img.matches('img') ? img : img.querySelector('img');
      grid.append(tile(
        link ? link.getAttribute('href') : '#',
        imgEl ? imgEl.getAttribute('src') : '',
        link ? link.textContent.trim() : (cells[1]?.textContent.trim() || ''),
      ));
    });
  }

  block.textContent = '';
  block.append(grid);
}
