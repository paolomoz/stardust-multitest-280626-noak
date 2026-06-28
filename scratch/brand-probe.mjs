import { chromium } from 'playwright';
const b = await chromium.launch({ headless:false, channel:'chrome' });
const ctx = await b.newContext({ userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
const p = await ctx.newPage();
await p.setViewportSize({width:1440,height:900});
await p.goto('https://www.xfinity.com/', { waitUntil:'domcontentloaded', timeout:45000 });
await p.waitForTimeout(3500);
for (let y=0;y<=1;y+=0.34){ await p.evaluate(f=>scrollTo(0,document.body.scrollHeight*f),y); await p.waitForTimeout(400);} 
await p.evaluate(()=>scrollTo(0,0));
const data = await p.evaluate(()=>{
  const norm=c=>{const m=c.match(/rgba?\(([^)]+)\)/);if(!m)return null;const[r,g,bl,a]=m[1].split(',').map(s=>parseFloat(s));if(a===0)return null;return `rgb(${r},${g},${bl})`;};
  const colors={},fonts={},sizes={},radii={},shadows={};
  const all=[...document.querySelectorAll('body *')].slice(0,4000);
  for(const el of all){const cs=getComputedStyle(el);const r=el.getBoundingClientRect();if(r.width<4||r.height<4)continue;
    const bg=norm(cs.backgroundColor);if(bg)colors[bg]=(colors[bg]||0)+1;
    const col=norm(cs.color);if(col)colors['T:'+col]=(colors['T:'+col]||0)+1;
    const ff=cs.fontFamily.split(',')[0].replace(/["']/g,'');if(ff)fonts[ff]=(fonts[ff]||0)+1;
    const fs=cs.fontSize;if(fs)sizes[fs]=(sizes[fs]||0)+1;
    if(cs.borderRadius&&cs.borderRadius!=='0px')radii[cs.borderRadius]=(radii[cs.borderRadius]||0)+1;
    if(cs.boxShadow&&cs.boxShadow!=='none')shadows[cs.boxShadow]=(shadows[cs.boxShadow]||0)+1;
  }
  const top=(o,n=12)=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,n);
  // logo
  const logoSel=document.querySelector('header img, [class*=logo] img, a[href="/"] img, svg[class*=logo]');
  let logo=null; if(logoSel){logo=logoSel.tagName==='IMG'?(logoSel.currentSrc||logoSel.src):'inline-svg';}
  const favicon=document.querySelector('link[rel~="icon"]')?.href||null;
  const appleIcon=document.querySelector('link[rel="apple-touch-icon"]')?.href||null;
  const themeColor=document.querySelector('meta[name="theme-color"]')?.content||null;
  // hero candidates
  const heroImgs=[...document.querySelectorAll('img')].map(i=>({src:i.currentSrc||i.src,w:i.naturalWidth,h:i.naturalHeight,alt:i.alt})).filter(i=>i.w>=400).slice(0,8);
  const video=[...document.querySelectorAll('video')].map(v=>({src:v.currentSrc||v.src||(v.querySelector('source')?.src),poster:v.poster}));
  const canvas=document.querySelectorAll('canvas').length;
  return {colors:top(colors,16),fonts:top(fonts),sizes:top(sizes),radii:top(radii),shadows:top(shadows,5),logo,favicon,appleIcon,themeColor,heroImgs,video,canvas};
});
console.log(JSON.stringify(data,null,1));
await b.close();
