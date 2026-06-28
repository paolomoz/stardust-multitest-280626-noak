/**
 * people — team roster. Authoring: one row per person.
 *   cell1 = name, cell2 = title/role (optional), cell3 = optional photo.
 * Tolerates the flattened single-cell shape (name + role on separate lines).
 */
export default function decorate(block) {
  const grid = document.createElement('div');
  grid.className = 'people-grid';
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (!cells.length) return;
    const card = document.createElement('div');
    card.className = 'person';
    const img = row.querySelector('img, picture');
    if (img) {
      const media = document.createElement('div');
      media.className = 'person-photo';
      media.append(img.cloneNode(true));
      card.append(media);
    }
    const name = document.createElement('div');
    name.className = 'person-name';
    name.textContent = cells[0].textContent.trim();
    card.append(name);
    if (cells[1] && cells[1].textContent.trim()) {
      const role = document.createElement('div');
      role.className = 'person-role';
      role.textContent = cells[1].textContent.trim();
      card.append(role);
    }
    grid.append(card);
  });
  block.textContent = '';
  block.append(grid);
}
