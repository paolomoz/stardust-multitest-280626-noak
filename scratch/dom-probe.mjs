import { chromium } from 'playwright';
const b = await chromium.launch({ headless:false, channel:'chrome' });
const ctx = await b.newContext({ userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
const p = await ctx.newPage();
await p.goto('https://www.xfinity.com/', { waitUntil:'domcontentloaded', timeout:45000 });
await p.waitForTimeout(3500);
const d = await p.evaluate(()=>{
  // custom elements
  const customEls=[...new Set([...document.querySelectorAll('*')].map(e=>e.tagName.toLowerCase()).filter(t=>t.includes('-')))];
  // all links including shadow roots
  function deepLinks(root,acc){
    root.querySelectorAll('a[href]').forEach(a=>acc.push({t:a.textContent.trim().replace(/\s+/g,' ').slice(0,28),h:a.getAttribute('href')}));
    root.querySelectorAll('*').forEach(e=>{if(e.shadowRoot)deepLinks(e.shadowRoot,acc);});
  }
  const acc=[];deepLinks(document,acc);
  const seen=new Set();const links=acc.filter(l=>l.t&&l.h&&!seen.has(l.t+l.h)&&seen.add(l.t+l.h));
  // logo: search shadow roots for svg/img with xfinity
  function deepLogo(root){
    let f=null;
    root.querySelectorAll('svg,img').forEach(e=>{const c=(e.getAttribute('class')||'')+(e.getAttribute('aria-label')||'')+(e.alt||'');if(/logo|xfinity/i.test(c)&&!f)f={tag:e.tagName,cls:e.getAttribute('class'),src:e.src||null,html:e.outerHTML.slice(0,300)};});
    root.querySelectorAll('*').forEach(e=>{if(e.shadowRoot&&!f)f=deepLogo(e.shadowRoot);});
    return f;
  }
  return {customEls,linkCount:links.length,links:links.slice(0,70),logo:deepLogo(document)};
});
console.log(JSON.stringify(d,null,1));
await b.close();
