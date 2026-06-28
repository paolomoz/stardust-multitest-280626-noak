/**
 * Bank of America — accessible FAQ accordion.
 * Authoring: ONE ROW PER Q&A — cell 1 = question, cell 2 = answer (<p>s).
 * Builds native <details>/<summary> (keyboard + ARIA for free). If a question
 * has no answer cell, only the summary is rendered (never invent an answer).
 * @param {Element} block The accordion block element
 */

const CHEVRON_SVG = `<svg class="accordion-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M6 9l6 6 6-6"/></svg>`;

export default function decorate(block) {
  const list = document.createElement('div');
  list.className = 'accordion-list';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const questionCell = cells[0];
    const answerCell = cells[1];
    if (!questionCell || !questionCell.textContent.trim()) return;

    const item = document.createElement('details');
    item.className = 'accordion-item';

    const summary = document.createElement('summary');
    summary.className = 'accordion-q';
    const qText = document.createElement('span');
    qText.className = 'accordion-q-text';
    while (questionCell.firstChild) qText.append(questionCell.firstChild);
    summary.append(qText);
    summary.insertAdjacentHTML('beforeend', CHEVRON_SVG);
    item.append(summary);

    if (answerCell && answerCell.textContent.trim()) {
      const answer = document.createElement('div');
      answer.className = 'accordion-a';
      while (answerCell.firstChild) answer.append(answerCell.firstChild);
      item.append(answer);
    }

    list.append(item);
  });

  block.textContent = '';
  block.append(list);
}
