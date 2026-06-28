/**
 * prose — long-form body copy on a white surface (articles, legal, bios, content).
 * Renders all authored paragraphs / headings / lists from the block cells into a
 * centered max-width reading column. Variant `bio` adds a portrait monogram rail.
 */
export default async function decorate(block) {
  const wrap = document.createElement('div');
  wrap.className = 'prose-wrap';
  // collect content nodes from every cell
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    if (cell.children.length) {
      [...cell.children].forEach((n) => wrap.append(n.cloneNode(true)));
    } else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      wrap.append(p);
    }
  });
  block.textContent = '';
  block.append(wrap);
}
