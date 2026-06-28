/**
 * offer — full-bleed offer/promo band with image + scrim + copy + single CTA.
 * Authoring (one block): a <picture>/<img>, an <h2>, a link-free <p>, a CTA <p>.
 * Variant: `offer dark` (deeper scrim).
 */
export default async function decorate(block) {
  const pic = block.querySelector('picture, img');
  const heading = block.querySelector('h1, h2, h3');
  const paras = [...block.querySelectorAll('p')];
  const ctaP = paras.find((p) => p.querySelector('a'));
  const copy = paras.find((p) => p !== ctaP && p.textContent.trim());

  const band = document.createElement('div');
  band.className = 'offer-band';

  const bg = document.createElement('div');
  bg.className = 'offer-bg';
  if (pic) bg.append(pic.closest('picture') || pic);

  const ocopy = document.createElement('div');
  ocopy.className = 'offer-copy';
  if (heading) { const h = document.createElement('h2'); h.textContent = heading.textContent.trim(); ocopy.append(h); }
  if (copy) ocopy.append(copy);
  if (ctaP) { ctaP.classList.add('offer-cta'); ocopy.append(ctaP); }

  band.append(bg, ocopy);
  block.textContent = '';
  block.append(band);

  const section = block.closest('.section');
  if (section) section.classList.add('offer-container', 'full-bleed');
}
