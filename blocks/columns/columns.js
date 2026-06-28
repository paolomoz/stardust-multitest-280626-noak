/**
 * columns — split feature: one row, two cells (media | copy) or (copy | media).
 * variant "reverse" puts media on the right via CSS order.
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture, img')) cell.classList.add('col-media');
      else cell.classList.add('col-copy');
    });
  });
}
