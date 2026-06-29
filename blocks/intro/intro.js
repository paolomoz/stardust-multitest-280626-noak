/**
 * intro — light 2-col band: left = "Since 1912" label + big headline; right = lede.
 * Authoring (one row, two cells): [short label + <h2>] | [lede paragraph].
 * Tolerant of DA flattening — classifies by content (heading / longest <p> = lede /
 * short <p> = the "since" label), not by row/cell index.
 */
export default function decorate(block) {
  const heading = block.querySelector('h1, h2, h3');
  const ps = [...block.querySelectorAll('p')];
  // lede = the longest paragraph; label = a short paragraph that isn't the lede
  const lede = ps.slice().sort((a, b) => b.textContent.length - a.textContent.length)[0] || null;
  const label = ps.find((p) => p !== lede && p.textContent.trim().length < 30) || null;

  const head = document.createElement('div');
  head.className = 'intro-head';
  if (label) {
    const since = document.createElement('span');
    since.className = 'since';
    since.textContent = label.textContent.trim();
    head.append(since);
  }
  if (heading) { heading.classList.add('display'); head.append(heading); }

  const body = document.createElement('div');
  body.className = 'intro-lede';
  if (lede) body.append(lede);

  block.replaceChildren(head, body);
  block.closest('.section')?.classList.add('intro-band');
}
