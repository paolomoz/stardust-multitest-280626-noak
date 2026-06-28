/**
 * cards — content cards. Default variant renders authored rows as a grid.
 * Variant `news`: each card = optional tag + title (link) + "Read more".
 *   - Authored: one row per card, cell holds a heading/link (+ optional tag).
 *   - Dynamic (empty block): fetches the news query-index and renders cards
 *     sorted by date desc; optional limit via the section's `data-limit`.
 */
function siteRoot() {
  const seg = window.location.pathname.split('/').filter(Boolean)[0];
  return seg ? `/${seg}` : '';
}

function newsCard(title, href, tag, date) {
  const art = document.createElement('article');
  art.className = 'news-card';
  art.setAttribute('data-anim', '');
  if (tag) {
    const t = document.createElement('span');
    t.className = 'news-tag';
    t.textContent = tag;
    art.append(t);
  }
  const h = document.createElement('h3');
  const a = document.createElement('a');
  a.href = href || '#';
  a.textContent = title;
  h.append(a);
  art.append(h);
  if (date) {
    const d = document.createElement('time');
    d.className = 'news-date';
    d.textContent = date;
    art.append(d);
  }
  const more = document.createElement('a');
  more.className = 'news-more link-arrow';
  more.href = href || '#';
  more.textContent = 'Read more';
  art.append(more);
  return art;
}

async function newsFromIndex(limit) {
  try {
    const res = await fetch(`${siteRoot()}/news-index.json`);
    if (!res.ok) return [];
    const json = await res.json();
    let data = json.data || [];
    data.sort((a, b) => String(b.publishDate || b.PublishDate || '').localeCompare(String(a.publishDate || a.PublishDate || '')));
    if (limit) data = data.slice(0, limit);
    return data.map((row) => newsCard(
      row.title || row.Title,
      row.path || row.Path,
      row.category || row.Category || 'News',
      (row.publishDate || row.PublishDate || '').slice(0, 10),
    ));
  } catch (e) { return []; }
}

export default async function decorate(block) {
  if (block.classList.contains('news')) {
    const rows = [...block.children];
    const grid = document.createElement('div');
    grid.className = 'news-grid';
    const limitAttr = block.closest('.section')?.getAttribute('data-limit');
    const limit = limitAttr ? parseInt(limitAttr, 10) : 0;

    if (rows.length === 0) {
      (await newsFromIndex(limit)).forEach((c) => grid.append(c));
    } else {
      rows.forEach((row) => {
        const link = row.querySelector('a');
        const heading = row.querySelector('h2, h3, h4');
        const cells = [...row.children];
        const tag = cells.length > 1 ? cells[0].textContent.trim() : 'News';
        let title = '';
        if (heading) title = heading.textContent.trim();
        else if (link) title = link.textContent.trim();
        else title = cells[cells.length - 1].textContent.trim();
        grid.append(newsCard(title, link ? link.getAttribute('href') : '#', tag));
      });
    }
    block.textContent = '';
    block.append(grid);
    return;
  }

  // default cards (generic)
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  block.replaceChildren(ul);
}
