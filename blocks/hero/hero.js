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
      if (img.tagName === 'IMG' && i === 0) { img.loading = 'eager'; img.setAttribute('fetchpriority', 'high'); }
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
  }
  function start() { if (reduce || slides.length < 2) return; stop(); timer = setInterval(() => show(idx + 1), 6000); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  dotBtns.forEach((d, k) => d.addEventListener('click', () => { show(k); start(); }));
  block.addEventListener('mouseenter', stop);
  block.addEventListener('mouseleave', start);
  block.addEventListener('focusin', stop);
  block.addEventListener('focusout', start);
  start();
}
