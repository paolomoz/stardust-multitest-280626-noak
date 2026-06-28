/**
 * columns — alternating image + text feature rows (editorial / stores / about).
 *
 * Authoring: one row per feature. Each row has a media cell (picture/img)
 * and a text cell (heading + paragraph[s], optional CTA). Rows alternate
 * media-left / media-right automatically.
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('feature-row');
    [...row.children].forEach((col) => {
      if (col.querySelector('picture, img')) col.classList.add('fr-media');
      else col.classList.add('fr-text');
    });
  });
}
