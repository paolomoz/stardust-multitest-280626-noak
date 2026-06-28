/**
 * fees — fee tables. Authoring: optional leading tab row (links), then each table is
 * a head row (single cell = caption) followed by data rows (2 cells: label | fee).
 * Simpler: author native <table> in content; this block just styles + wraps it.
 */
export default function decorate(block) {
  block.querySelectorAll('table').forEach((t) => t.classList.add('fees-table'));
  // tab row: first row whose cell holds multiple links and no table
  const first = block.firstElementChild;
  if (first && first.querySelector('a') && !first.querySelector('table')) {
    first.classList.add('fees-tabs');
  }
}
