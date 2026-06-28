import { readFileSync, writeFileSync } from 'node:fs';
const files = process.argv.slice(2);
for (const f of files) {
  let s = readFileSync(f, 'utf8');
  // Match single-line rule blocks: prefix{ ... } on one line with >=2 ';'
  s = s.replace(/^([ \t]*)([^\n{}]+)\{([^\n{}]+)\}[ \t]*$/gm, (m, ind, sel, body) => {
    const decls = body.split(';').map((d) => d.trim()).filter(Boolean);
    if (decls.length < 2) return m;
    const inner = decls.map((d) => `${ind}  ${d};`).join('\n');
    return `${ind}${sel.trim()} {\n${inner}\n${ind}}`;
  });
  writeFileSync(f, s);
}
console.log('formatted', files.length, 'files');
