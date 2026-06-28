/**
 * contact — office / contact details. Renders authored content (address, links)
 * in a two-column editorial layout: heading/intro left, details right.
 */
export default function decorate(block) {
  const wrap = document.createElement('div');
  wrap.className = 'contact-inner';
  block.querySelectorAll(':scope > div').forEach((row) => {
    const col = document.createElement('div');
    col.className = 'contact-col';
    [...row.children].forEach((cell) => {
      while (cell.firstChild) col.append(cell.firstChild);
    });
    wrap.append(col);
  });
  block.textContent = '';
  block.append(wrap);
}
