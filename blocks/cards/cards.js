/**
 * cards — responsive card grid. One row per card.
 * Card cell may hold: optional <picture>/<img>, a heading, body <p>, and a link.
 * A leading icon glyph cell (short, no heading) renders as the .ico badge.
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('card');
    const cells = [...row.children];
    cells.forEach((cell) => {
      if (cell.querySelector('picture, img')) cell.className = 'card-media';
      else cell.className = 'card-body';
    });
    // promote a short text-only first cell with no heading/link to an icon badge
    const first = cells[0];
    if (first && !first.querySelector('h1,h2,h3,h4,a,picture,img') && first.textContent.trim().length <= 3) {
      first.className = 'card-ico';
    }
  });
}
