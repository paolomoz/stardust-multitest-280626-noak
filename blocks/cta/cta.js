/**
 * cta — centered conversion band on navy. eyebrow, heading, body, CTA(s), optional QR img.
 */
export default function decorate(block) {
  const wrap = document.createElement('div');
  wrap.className = 'cta-inner';
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => { while (cell.firstChild) wrap.append(cell.firstChild); });
  });
  const eyebrow = [...wrap.querySelectorAll('p')].find((p) => !p.querySelector('a, img') && p.textContent.trim().length < 30);
  if (eyebrow) eyebrow.classList.add('eyebrow');
  block.replaceChildren(wrap);
  block.closest('.section')?.classList.add('navy');
}
