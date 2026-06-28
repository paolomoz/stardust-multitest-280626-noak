/**
 * hero — page hero. Variant `video` adds a film-montage background.
 * Rows (tolerant, classified by content):
 *   - cell with heading (h1/h2)      -> headline
 *   - text cell before heading       -> eyebrow
 *   - text cell after heading        -> lead/sub
 *   - cell with link(s)              -> CTAs (cloned; decorateButtons styled)
 *   - cell text ending .mp4 (+poster)-> video source (video variant)
 */
function cellText(cell) { return cell ? cell.textContent.trim() : ''; }

export default async function decorate(block) {
  const rows = [...block.children];
  const wrap = document.createElement('div');
  wrap.className = 'hero-content';
  let videoSrc = '';
  let poster = '';
  let heading = null;
  let eyebrow = null;
  let lead = null;
  let actions = null;

  rows.forEach((row) => {
    const cell = row.firstElementChild;
    if (!cell) return;
    const h = cell.querySelector('h1, h2, h3');
    const link = cell.querySelector('a');
    const txt = cellText(cell);
    if (/\.mp4(\?|$)/i.test(txt) || /\.mp4/i.test(txt)) {
      videoSrc = txt;
      const second = row.children[1];
      if (second) poster = cellText(second);
    } else if (h) {
      heading = h;
    } else if (link) {
      actions = document.createElement('div');
      actions.className = 'hero-actions button-container';
      [...cell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    } else if (txt) {
      if (!heading) { eyebrow = document.createElement('p'); eyebrow.className = 'eyebrow'; eyebrow.textContent = txt; }
      else { lead = document.createElement('p'); lead.className = 'hero-lead'; lead.textContent = txt; }
    }
  });

  if (eyebrow) wrap.append(eyebrow);
  if (heading) { heading.classList.add('display'); wrap.append(heading); }
  if (lead) wrap.append(lead);
  if (actions) wrap.append(actions);

  block.textContent = '';
  if (block.classList.contains('video') && videoSrc) {
    const v = document.createElement('video');
    v.autoplay = true; v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('aria-hidden', 'true');
    if (poster) v.poster = poster;
    const src = document.createElement('source');
    src.src = videoSrc; src.type = 'video/mp4';
    v.append(src);
    block.append(v);
    if (poster) {
      const still = document.createElement('img');
      still.className = 'hero-still'; still.src = poster; still.alt = ''; still.setAttribute('aria-hidden', 'true');
      block.append(still);
    }
  } else if (poster) {
    const still = document.createElement('img');
    still.className = 'hero-still'; still.src = poster; still.alt = '';
    block.append(still);
  }
  const scrim = document.createElement('div');
  scrim.className = 'hero-scrim';
  block.append(scrim, wrap);
}
