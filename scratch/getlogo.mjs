import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
const b = await chromium.launch({ headless:false, channel:'chrome' });
const ctx = await b.newContext({ userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
const p = await ctx.newPage();
await p.goto('https://www.xfinity.com/', { waitUntil:'domcontentloaded', timeout:45000 });
await p.waitForTimeout(3000);
const svg = await p.evaluate(()=>{
  function find(root){
    for(const s of root.querySelectorAll('svg')){const vb=s.getAttribute('viewBox');if(vb&&vb.includes('379'))return s.outerHTML;}
    for(const e of root.querySelectorAll('*')){if(e.shadowRoot){const r=find(e.shadowRoot);if(r)return r;}}
    return null;
  }
  return find(document);
});
await mkdir('stardust/current/assets',{recursive:true});
if(svg){await writeFile('stardust/current/assets/logo.svg',svg);console.log('logo saved, len='+svg.length);}
else console.log('LOGO NOT FOUND');
await b.close();
