/**
 * hero — page lead. Variants: `hero video` (background video), `hero page` (title band).
 * Authoring rows (flexible, read by query):
 *   - an <a> whose href ends in .mp4 → background video
 *   - h1/h2 → headline (rendered as the page <h1> on the home/lead hero)
 *   - link-free <p> → lede
 *   - link-bearing <p> / buttons → actions
 */
export default async function decorate(block) {
  const nodes = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) nodes.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      nodes.push(p);
    }
  });

  let videoUrl = '';
  const heading = nodes.find((n) => /^H[1-6]$/.test(n.tagName))
    || block.querySelector('h1, h2, h3');
  // find a video link first so we can exclude it from copy/actions
  block.querySelectorAll('a').forEach((a) => {
    if (/\.mp4(\?|$)/i.test(a.href)) { videoUrl = a.href; }
  });
  const isVideoNode = (n) => n.querySelector && n.querySelector('a[href$=".mp4"], a[href*=".mp4?"]');
  const paras = nodes.filter((n) => n.tagName === 'P' && !isVideoNode(n));
  const lede = paras.find((p) => !p.querySelector('a'));
  const actionsP = paras.find((p) => p.querySelector('a'));

  block.textContent = '';

  if (videoUrl) {
    block.classList.add('has-video');
    const v = document.createElement('video');
    v.autoplay = true; v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('aria-hidden', 'true');
    v.poster = '/icons/apple-touch-icon.png';
    const s = document.createElement('source');
    s.src = videoUrl; s.type = 'video/mp4';
    v.append(s);
    const bg = document.createElement('div');
    bg.className = 'hero-bg';
    bg.append(v);
    block.append(bg);
  }

  const content = document.createElement('div');
  content.className = 'hero-content';
  if (heading) {
    const h = heading.cloneNode(true);
    content.append(h);
  }
  if (lede) content.append(lede.cloneNode(true));
  if (actionsP) {
    const actions = document.createElement('p');
    actions.className = 'hero-actions';
    [...actionsP.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    content.append(actions);
  }
  block.append(content);
}
