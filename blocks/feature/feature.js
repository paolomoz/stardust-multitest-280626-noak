/**
 * feature — alternating image + copy row (PDP feature highlight).
 * Authoring (one block): a media cell (<picture>/<img>) and a copy cell (<h2> + <p>).
 * Variant: `feature reverse` (media on the right at desktop).
 */
export default async function decorate(block) {
  const pic = block.querySelector('picture, img');
  const heading = block.querySelector('h1, h2, h3');
  const copy = [...block.querySelectorAll('p')].find((p) => p.textContent.trim() && !p.querySelector('img'));

  const row = document.createElement('div');
  row.className = 'feature-row';

  const media = document.createElement('div');
  media.className = 'feature-media';
  if (pic) media.append(pic.closest('picture') || pic);

  const text = document.createElement('div');
  text.className = 'feature-copy';
  if (heading) { const h = document.createElement('h2'); h.textContent = heading.textContent.trim(); text.append(h); }
  if (copy) text.append(copy);

  row.append(media, text);
  block.textContent = '';
  block.append(row);

  if (block.classList.contains('reverse')) {
    const section = block.closest('.section');
    if (section) section.classList.add('surface');
  }
}
