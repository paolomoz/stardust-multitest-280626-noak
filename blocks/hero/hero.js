/**
 * hero — full-bleed auto-rotating carousel (Sony signature motion).
 * Authoring: one row per slide; cells (any order): image | headline | link.
 * First slide headline is the page <h1>; others <h2>.
 */
function pick(cell, sel) {
  if (!cell) return null;
  return cell.matches?.(sel) ? cell : cell.querySelector(sel);
}

export default async function decorate(block) {
  const rows = [...block.children];
  const viewport = document.createElement('div');
  viewport.className = 'hero-viewport';

  const slides = [];
  const imgEls = [];
  rows.forEach((row, i) => {
    const cells = [...row.children];
    let img = null; let heading = null; let link = null;
    cells.forEach((c) => {
      img = img || pick(c, 'picture, img');
      heading = heading || pick(c, 'h1, h2, h3');
      link = link || pick(c, 'a');
    });
    const slide = document.createElement('article');
    slide.className = 'hero-slide';
    slide.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
    if (img) {
      const m = img.closest('picture') || img;
      // `img` is the <picture> wrapper (content authors <picture><img>), so the
      // inner <img> is what carries loading/fetchpriority. EDS ships slide images
      // loading="lazy"; a hidden/absolute slide never fires its IntersectionObserver,
      // so on a static load every slide (incl. the active one) stays unloaded = black.
      const innerImg = m.tagName === 'IMG' ? m : m.querySelector('img');
      imgEls[i] = innerImg || null;
      if (innerImg && i === 0) { innerImg.loading = 'eager'; innerImg.setAttribute('fetchpriority', 'high'); }
      slide.append(m);
    }
    const scrim = document.createElement('div');
    scrim.className = 'hero-scrim';
    slide.append(scrim);
    const copy = document.createElement('div');
    copy.className = 'hero-copy';
    if (heading) copy.append(heading);
    if (link) { link.classList.add('hero-more'); copy.append(link); }
    slide.append(copy);
    viewport.append(slide);
    slides.push(slide);
  });

  const dots = document.createElement('div');
  dots.className = 'hero-dots';
  dots.setAttribute('role', 'tablist');
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Slide ${i + 1}`);
    b.setAttribute('aria-current', i === 0 ? 'true' : 'false');
    dots.append(b);
  });

  block.textContent = '';
  block.append(viewport);
  if (slides.length > 1) block.append(dots);

  let idx = 0; let timer = null;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dotBtns = [...dots.children];
  function show(n) {
    idx = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.setAttribute('aria-hidden', k === idx ? 'false' : 'true'));
    dotBtns.forEach((d, k) => d.setAttribute('aria-current', k === idx ? 'true' : 'false'));
    // Force-load the current slide and pre-load the next so an auto-advance never
    // crossfades to an unloaded (black) lazy slide.
    [idx, (idx + 1) % slides.length].forEach((k) => {
      const im = imgEls[k];
      if (im && im.getAttribute('loading') !== 'eager') im.setAttribute('loading', 'eager');
    });
  }
  // load slide 1 up front so the first auto-advance is already warm
  if (imgEls[1]) imgEls[1].setAttribute('loading', 'eager');
  function start() { if (reduce || slides.length < 2) return; stop(); timer = setInterval(() => show(idx + 1), 6000); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  dotBtns.forEach((d, k) => d.addEventListener('click', () => { show(k); start(); }));
  block.addEventListener('mouseenter', stop);
  block.addEventListener('mouseleave', start);
  block.addEventListener('focusin', stop);
  block.addEventListener('focusout', start);
  start();
}
