/**
 * Bank of America — page hero.
 * Authoring: one row / one cell containing (in order) optional eyebrow <p>,
 * <h1>/<h2>, lede <p>, a CTA <p> (strong>a), and an optional <img>/<picture> bg.
 * Variants: `hero` (photo + scrim) / `hero plain` (cool-tint, no photo).
 * @param {Element} block The hero block element
 */
export default async function decorate(block) {
  const heading = block.querySelector('h1, h2');
  const picture = block.querySelector('picture');
  const img = block.querySelector('img');
  const allP = [...block.querySelectorAll('p')];

  // a CTA paragraph is one that carries a link; text paragraphs do not
  const ctaParas = allP.filter((p) => p.querySelector('a'));
  const textParas = allP.filter((p) => !p.querySelector('a'));

  let eyebrow = null;
  let lede = null;
  textParas.forEach((p) => {
    const before = heading
      // eslint-disable-next-line no-bitwise
      && (p.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING);
    if (before && !eyebrow) eyebrow = p;
    else if (!lede) lede = p;
  });

  const hasPhoto = !!(picture || img);
  if (!hasPhoto) block.classList.add('plain');

  // build background layer
  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  bg.setAttribute('aria-hidden', 'true');
  if (picture) bg.append(picture);
  else if (img) bg.append(img);

  // build content
  const content = document.createElement('div');
  content.className = 'hero-content';

  if (eyebrow) {
    const span = document.createElement('span');
    span.className = 'hero-eyebrow';
    span.textContent = eyebrow.textContent.trim();
    content.append(span);
  }
  if (heading) content.append(heading);
  if (lede) {
    lede.classList.add('hero-lede');
    content.append(lede);
  }
  if (ctaParas.length) {
    const actions = document.createElement('div');
    actions.className = 'hero-actions';
    ctaParas.forEach((p) => actions.append(...p.querySelectorAll('a')));
    content.append(actions);
  }

  block.textContent = '';
  if (hasPhoto) block.append(bg);
  block.append(content);
}
