/**
 * feed — chronological list of items (news / press).
 * Static: each row = item, cells date | title(link) | category.
 * Dynamic (class "dynamic"): FIRST row's first cell holds an index base path; the
 *   block fetches `${path}.json` (EDS query-index, LIVE tree) and renders it,
 *   newest first when a date exists. Remaining rows are a STATIC FALLBACK rendered
 *   when the index is empty/unavailable (so the listing is never blank).
 */
function parseItem(row) {
  const cells = [...row.children];
  const linkCell = cells.find((c) => c.querySelector('a'));
  const a = linkCell ? linkCell.querySelector('a') : null;
  if (!a) return null;
  const dateCell = cells.find((c) => c !== linkCell && /\d{4}/.test(c.textContent));
  const catCell = cells.find((c) => c !== linkCell && c !== dateCell && c.textContent.trim());
  return {
    href: a.getAttribute('href'), title: a.textContent.trim(),
    date: dateCell ? dateCell.textContent.trim() : '', category: catCell ? catCell.textContent.trim() : '',
  };
}

function render(items) {
  const list = document.createElement('div');
  list.className = 'feed-list';
  items.forEach((it) => {
    const item = document.createElement('a');
    item.className = 'feed-item';
    item.href = it.href;
    item.innerHTML = `<time>${it.date || ''}</time><span class="feed-title">${it.title}</span><span class="feed-cat">${it.category || ''}</span>`;
    list.append(item);
  });
  return list;
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (block.classList.contains('dynamic')) {
    const base = (rows[0]?.textContent || '').trim().replace(/\/$/, '');
    const fallback = rows.slice(1).map(parseItem).filter(Boolean);
    block.textContent = '';
    try {
      const res = await fetch(`${base}.json`);
      if (res.ok) {
        const json = await res.json();
        let data = (json.data || []).filter((r) => r.path && r.path !== base);
        data.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
        const items = data.map((r) => ({
          href: r.path, title: r.title || r.path.split('/').pop(), date: r.date || '', category: r.category || '',
        }));
        if (items.length) { block.append(render(items)); return; }
      }
    } catch (e) { /* fall through to static fallback */ }
    if (fallback.length) { block.append(render(fallback)); return; }
    const empty = document.createElement('p');
    empty.className = 'feed-empty';
    empty.textContent = 'No items are available right now.';
    block.append(empty);
    return;
  }
  const items = rows.map(parseItem).filter(Boolean);
  block.textContent = '';
  block.append(render(items));
}
