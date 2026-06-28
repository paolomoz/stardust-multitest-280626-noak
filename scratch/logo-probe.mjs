import { chromium } from 'playwright';
const b = await chromium.launch({ headless:false, channel:'chrome' });
const ctx = await b.newContext({ userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
const p = await ctx.newPage();
await p.goto('https://www.xfinity.com/', { waitUntil:'domcontentloaded', timeout:45000 });
await p.waitForTimeout(3000);
const d = await p.evaluate(()=>{
  const header=document.querySelector('header')||document.body;
  const imgs=[...header.querySelectorAll('img')].map(i=>({src:i.currentSrc||i.src,alt:i.alt,w:i.naturalWidth,h:i.naturalHeight,cls:i.className}));
  const svgs=[...header.querySelectorAll('svg')].slice(0,3).map(s=>({cls:s.getAttribute('class'),html:s.outerHTML.slice(0,400)}));
  // nav links in header
  const navLinks=[...header.querySelectorAll('a[href]')].map(a=>({t:a.textContent.trim().replace(/\s+/g,' ').slice(0,30),h:a.getAttribute('href')})).filter(a=>a.t).slice(0,40);
  // footer links
  const footer=document.querySelector('footer');
  const footLinks=footer?[...footer.querySelectorAll('a[href]')].map(a=>({t:a.textContent.trim().replace(/\s+/g,' ').slice(0,30),h:a.getAttribute('href')})).filter(a=>a.t).slice(0,60):[];
  return {imgs,svgs,navLinks,footLinks};
});
console.log(JSON.stringify(d,null,1));
await b.close();
