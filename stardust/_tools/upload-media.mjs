import { readFileSync } from 'node:fs';
import path from 'node:path';

const ORG = 'paolomoz';
const REPO = 'stardust-multitest-280626-noak';
const TOKEN = process.env.DA_TOKEN;
if (!TOKEN) { console.error('no DA_TOKEN'); process.exit(1); }

const used = JSON.parse(readFileSync('stardust/current/_used-images.json', 'utf8'));
const CT = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif',
};

let ok = 0; let fail = 0;
for (const [base, repoPath] of Object.entries(used)) {
  const ext = path.extname(base).toLowerCase();
  const ct = CT[ext] || 'application/octet-stream';
  const buf = readFileSync(repoPath);
  const fd = new FormData();
  fd.append('data', new Blob([buf], { type: ct }), base);
  const url = `https://admin.da.live/source/${ORG}/${REPO}/sony/media/${base}`;
  let status = 0;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const r = await fetch(url, { method: 'PUT', headers: { Authorization: `Bearer ${TOKEN}` }, body: fd });
      status = r.status;
      if (r.ok) break;
      if ([429, 500, 502, 503].includes(r.status)) { await new Promise((s) => setTimeout(s, 600 * (attempt + 1))); continue; }
      break;
    } catch (e) { status = -1; await new Promise((s) => setTimeout(s, 600 * (attempt + 1))); }
  }
  if (status >= 200 && status < 300) { ok += 1; console.log(`OK  ${status} ${base}`); }
  else { fail += 1; console.log(`FAIL ${status} ${base}`); }
}
console.log(`\nmedia upload: ${ok} ok, ${fail} fail`);
process.exit(fail ? 1 : 0);
