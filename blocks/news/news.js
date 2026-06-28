/**
 * news — dynamic listing. Reads the EDS query-index, filters to news pages,
 * sorts by PublishDate desc, renders date + title cards. Falls back to
 * authored rows (date | title-with-link) when the index is unavailable.
 *
 * Config (optional first row): key/value rows
 *   index   | /sony/news-index.json
 *   limit   | 12
 *   filter  | /sony/sonyinfo/news/press/   (path prefix to include)
 */
function fmtDate(v) {
  if (!v) return '';
  let d;
  if (/^\d+$/.test(v)) {
    const n = Number(v);
    d = new Date(n < 10 ** 12 ? n * 1000 : n); // excel serial vs ms — best effort
    if (n > 20000 && n < 90000) d = new Date(Date.UTC(1899, 11, 30) + n * 86400000);
  } else { d = new Date(v); }
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function card(href, date, title) {
  const a = document.createElement('a');
  a.className = 'news-item';
  a.href = href;
  a.innerHTML = `<div class="news-date">${date || ''}</div><div class="news-title">${title}</div>`;
  return a;
}

export default async function decorate(block) {
  const cfg = {};
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 2 && !cells[0].querySelector('a, img')) {
      cfg[cells[0].textContent.trim().toLowerCase()] = cells[1].textContent.trim();
    }
  });

  const indexUrl = cfg.index || '/sony/news-index.json';
  const limit = parseInt(cfg.limit, 10) || 24;
  const prefix = cfg.filter || '/sony/sonyinfo/news/press/';

  // authored fallback nodes (rows that contain a link)
  const fallback = [];
  [...block.children].forEach((row) => {
    const a = row.querySelector('a');
    if (!a) return;
    const texts = [...row.children].map((c) => c.textContent.trim());
    const date = texts.find((t) => t && !a.textContent.includes(t)) || '';
    fallback.push(card(a.getAttribute('href'), date, a.textContent.trim()));
  });

  const grid = document.createElement('div');
  grid.className = 'news-grid';

  let rendered = 0;
  try {
    const resp = await fetch(indexUrl);
    if (resp.ok) {
      const json = await resp.json();
      const data = (json.data || [])
        .filter((r) => (r.path || '').startsWith(prefix) && !(r.path || '').endsWith('/press'))
        .sort((a, b) => String(b.publishDate || b.lastModified || '').localeCompare(String(a.publishDate || a.lastModified || '')))
        .slice(0, limit);
      data.forEach((r) => {
        grid.append(card(r.path, fmtDate(r.publishDate || r.lastModified), r.title || r.path));
        rendered += 1;
      });
    }
  } catch (e) { /* fall through to authored */ }

  if (!rendered) fallback.forEach((c) => grid.append(c));

  block.textContent = '';
  block.append(grid);
}
