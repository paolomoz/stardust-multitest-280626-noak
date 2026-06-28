/**
 * prose — long-form article / detail body. Renders authored default content
 * (headings, paragraphs, lists, links, images) at a readable measure.
 * The block is a thin wrapper; content is the authored cells, flattened.
 */
export default function decorate(block) {
  const wrap = document.createElement('div');
  wrap.className = 'prose-inner';
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    while (cell.firstChild) wrap.append(cell.firstChild);
  });
  block.textContent = '';
  block.append(wrap);
}
