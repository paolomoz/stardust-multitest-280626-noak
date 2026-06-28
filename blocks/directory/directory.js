/**
 * directory — dynamic listing driven by the EDS query-index (/xfinity/query-index.json).
 * Renders every published page as a card with live search (?q= hand-off) and
 * category filtering (derived from the page path). Falls back gracefully to any
 * statically-authored content if the index can't be fetched.
 *
 * Authoring: an optional first cell with the index URL (defaults to
 * /xfinity/query-index.json).
 */
const INDEX_DEFAULT = '/xfinity/query-index.json';

const CATS = [
  [/\/learn\/internet|\/gig/, 'Internet'],
  [/\/learn\/mobile/, 'Mobile'],
  [/\/learn\/digital-cable-tv|\/stream/, 'TV & Streaming'],
  [/\/learn\/home-solutions|security/, 'Home Security'],
  [/\/learn\/home-phone/, 'Home Phone'],
  [/\/learn\/deals/, 'Deals'],
  [/\/hub/, 'Hub'],
  [/\/local/, 'Local'],
];
const catOf = (p) => (CATS.find(([re]) => re.test(p)) || [null, 'More'])[1];

function card(item) {
  const a = document.createElement('a');
  a.className = 'directory-card';
  a.href = item.path;
  const h = document.createElement('h3');
  h.textContent = item.title || item.path;
  a.append(h);
  if (item.description) {
    const p = document.createElement('p');
    p.textContent = item.description;
    a.append(p);
  }
  const tag = document.createElement('span');
  tag.className = 'directory-tag';
  tag.textContent = catOf(item.path);
  a.append(tag);
  return a;
}

export default async function decorate(block) {
  const cfg = block.querySelector('a')?.getAttribute('href') || block.textContent.trim() || INDEX_DEFAULT;
  const indexUrl = cfg.startsWith('/') || cfg.startsWith('http') ? cfg : INDEX_DEFAULT;

  let data = [];
  try {
    const res = await fetch(indexUrl);
    if (res.ok) ({ data } = await res.json());
  } catch (e) { /* graceful fallback below */ }

  data = data.filter((it) => it.path && !/\/(nav|footer)$/.test(it.path) && it.path !== '/xfinity/' && it.path !== '/xfinity/index');

  block.replaceChildren();
  if (!data.length) {
    const note = document.createElement('p');
    note.textContent = 'Browse Xfinity products and services from the navigation above.';
    block.append(note);
    return;
  }

  const controls = document.createElement('div');
  controls.className = 'directory-controls';
  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = 'Search Xfinity…';
  search.className = 'directory-search';
  controls.append(search);

  const cats = ['All', ...Array.from(new Set(data.map((it) => catOf(it.path))))];
  const chips = document.createElement('div');
  chips.className = 'directory-chips';
  let activeCat = 'All';
  cats.forEach((c) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = c;
    b.className = c === 'All' ? 'active' : '';
    b.addEventListener('click', () => {
      activeCat = c;
      chips.querySelectorAll('button').forEach((x) => x.classList.toggle('active', x === b));
      // eslint-disable-next-line no-use-before-define
      render();
    });
    chips.append(b);
  });
  controls.append(chips);

  const grid = document.createElement('div');
  grid.className = 'directory-grid';

  function render() {
    const q = search.value.trim().toLowerCase();
    const items = data.filter((it) => {
      const inCat = activeCat === 'All' || catOf(it.path) === activeCat;
      const hay = `${it.title || ''} ${it.description || ''} ${it.path}`.toLowerCase();
      return inCat && (!q || hay.includes(q));
    });
    grid.replaceChildren(...items.map(card));
    if (!items.length) {
      const none = document.createElement('p');
      none.className = 'directory-empty';
      none.textContent = 'No matches. Try another search.';
      grid.append(none);
    }
  }

  search.addEventListener('input', render);

  // ?q= hand-off
  const params = new URLSearchParams(window.location.search);
  if (params.get('q')) search.value = params.get('q');

  block.append(controls, grid);
  render();
}
