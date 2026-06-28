/**
 * feed — chronological list of items (news / press).
 * Each row = item. Cells: date | title(link) | category.
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const list = document.createElement('div');
  list.className = 'feed-list';
  rows.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find((c) => c.querySelector('a'));
    const a = linkCell ? linkCell.querySelector('a') : null;
    if (!a) return;
    const dateCell = cells.find((c) => c !== linkCell && /\d{4}/.test(c.textContent));
    const catCell = cells.find((c) => c !== linkCell && c !== dateCell && c.textContent.trim());
    const item = document.createElement('a');
    item.className = 'feed-item';
    item.href = a.getAttribute('href');
    item.innerHTML = `${dateCell ? `<time>${dateCell.textContent.trim()}</time>` : '<time></time>'}<span class="feed-title">${a.textContent.trim()}</span><span class="feed-cat">${catCell ? catCell.textContent.trim() : ''}</span>`;
    list.append(item);
  });
  block.textContent = '';
  block.append(list);
}
