/**
 * hero — Xfinity lead block.
 * Tolerant of DA's flattened shape: queries content rather than hard-indexing rows.
 * Content nodes (any order): optional eyebrow <p>, <h1> headline, optional sub <p>,
 * lead <p>, a link-bearing <p> (CTAs → button-container), and an optional <picture>/<img>.
 */
function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      out.push(p);
    }
  });
  return out.length ? out : [...block.children];
}

export default function decorate(block) {
  const nodes = collectNodes(block);
  const copy = document.createElement('div');
  copy.className = 'hero-copy';
  const media = document.createElement('div');
  media.className = 'hero-media';

  const heading = nodes.find((n) => /^H[1-3]$/.test(n.tagName));
  let seenHeading = false;
  nodes.forEach((n) => {
    if (n.matches && n.matches('picture, img')) { media.append(n); return; }
    if (n === heading) { seenHeading = true; copy.append(n); return; }
    if (/^H[1-6]$/.test(n.tagName)) { copy.append(n); return; }
    if (n.querySelector && n.querySelector('a')) {
      n.classList.add('button-container');
      copy.append(n);
      return;
    }
    if (!seenHeading && heading && n.textContent.trim().length < 40) n.classList.add('eyebrow');
    copy.append(n);
  });

  const wrap = document.createElement('div');
  wrap.className = 'hero-inner';
  wrap.append(copy);
  if (media.querySelector('picture, img')) wrap.append(media);
  block.replaceChildren(wrap);

  const img = block.querySelector('img');
  if (img) { img.setAttribute('loading', 'eager'); img.setAttribute('fetchpriority', 'high'); }
}
