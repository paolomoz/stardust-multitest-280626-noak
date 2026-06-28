/**
 * Bank of America — card grid.
 * Authoring: ONE ROW PER CARD; each card cell holds optional <img>, <h3>,
 * one or more <p> (blurb / offer line), and a CTA (strong>a or plain <a>).
 * Also tolerates a DA-flattened single cell by segmenting on <h3> boundaries.
 * Variant classes (products|card-offers|perks|resources|contact-topics) style the grid.
 * @param {Element} block The cards block element
 */

function isImageOnly(node) {
  const pic = node.matches?.('picture, img') ? node : node.querySelector?.('picture, img');
  return pic && !node.textContent.trim();
}

function getImage(node) {
  const pic = node.matches?.('picture, img') ? node : node.querySelector?.('picture, img');
  if (!pic) return null;
  return (pic.tagName === 'IMG' && pic.closest('picture')) ? pic.closest('picture') : pic;
}

function buildCard(nodes) {
  const card = document.createElement('article');
  card.className = 'card';
  const body = document.createElement('div');
  body.className = 'card-body';
  let imageWrap = null;

  nodes.forEach((n) => {
    if (isImageOnly(n)) {
      if (!imageWrap) {
        imageWrap = document.createElement('div');
        imageWrap.className = 'card-image';
      }
      imageWrap.append(getImage(n));
    } else {
      body.append(n);
    }
  });

  if (imageWrap) card.append(imageWrap);
  card.append(body);
  return card;
}

function rowNodes(row) {
  const cells = [...row.children];
  if (!cells.length) return [row];
  const nodes = [];
  cells.forEach((c) => {
    if (c.children.length) nodes.push(...c.children);
    else nodes.push(c);
  });
  return nodes;
}

// segment a flat node list into per-card groups on <h3> boundaries
function segmentByH3(nodes) {
  const groups = [];
  let pending = [];
  nodes.forEach((n) => {
    if (n.tagName === 'H3') {
      const group = pending;
      pending = [];
      group.push(n);
      groups.push(group);
    } else if (isImageOnly(n)) {
      pending.push(n); // image belongs to the next card
    } else if (groups.length) {
      groups[groups.length - 1].push(n);
    } else {
      pending.push(n);
    }
  });
  return groups;
}

export default function decorate(block) {
  const rows = [...block.children];
  const totalH3 = block.querySelectorAll('h3').length;

  let groups;
  if (rows.length <= 1 && totalH3 > 1) {
    const cell = rows[0] && rows[0].children.length === 1
      ? rows[0].firstElementChild : rows[0];
    groups = segmentByH3([...(cell ? cell.children : block.children)]);
  } else {
    groups = rows.map(rowNodes);
  }

  const grid = document.createElement('div');
  grid.className = 'cards-list';
  groups.forEach((nodes) => {
    if (nodes.length) grid.append(buildCard(nodes));
  });

  block.textContent = '';
  block.append(grid);
}
