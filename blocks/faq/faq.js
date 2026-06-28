/**
 * faq — accordion. One row per Q/A: cell1 = question, cell2 = answer.
 */
export default function decorate(block) {
  const list = document.createElement('div');
  list.className = 'faq-list';
  [...block.children].forEach((row, i) => {
    const cells = [...row.children];
    if (cells.length < 1) return;
    const q = cells[0].textContent.trim();
    const a = cells[1] ? cells[1].innerHTML : '';
    if (!q) return;
    const d = document.createElement('details');
    if (i === 0) d.open = true;
    const s = document.createElement('summary');
    s.textContent = q;
    const p = document.createElement('div');
    p.className = 'faq-answer';
    p.innerHTML = a;
    d.append(s, p);
    list.append(d);
  });
  block.replaceChildren(list);
}
