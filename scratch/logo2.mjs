import { chromium } from 'playwright';
const b = await chromium.launch({ headless:false, channel:'chrome' });
const ctx = await b.newContext({ userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
const p = await ctx.newPage();
await p.goto('https://www.xfinity.com/', { waitUntil:'domcontentloaded', timeout:45000 });
await p.waitForTimeout(3000);
const d = await p.evaluate(()=>{
  const out=[];
  const hdr=document.querySelector('xc-header');
  function walk(root,depth){
    root.querySelectorAll('svg').forEach(s=>{const t=(s.textContent||'')+(s.getAttribute('aria-label')||'');out.push({type:'svg',aria:s.getAttribute('aria-label'),vb:s.getAttribute('viewBox'),html:s.outerHTML.slice(0,500)});});
    root.querySelectorAll('img').forEach(i=>out.push({type:'img',src:i.src,alt:i.alt}));
    root.querySelectorAll('prism-icon').forEach(pi=>out.push({type:'prism-icon',name:pi.getAttribute('name')||pi.getAttribute('icon'),attrs:[...pi.attributes].map(a=>a.name+'='+a.value).join(' ').slice(0,150)}));
    root.querySelectorAll('*').forEach(e=>{if(e.shadowRoot&&depth<4)walk(e.shadowRoot,depth+1);});
  }
  if(hdr){if(hdr.shadowRoot)walk(hdr.shadowRoot,0);else walk(hdr,0);}
  return out.slice(0,15);
});
console.log(JSON.stringify(d,null,1));
await b.close();
