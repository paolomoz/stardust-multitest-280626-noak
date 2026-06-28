import { chromium } from 'playwright';
const b = await chromium.launch({ headless:true });
const p = await (await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1})).newPage();
const errs=[];
p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
const file='file://'+process.cwd()+'/stardust/prototypes/us-home-proposed.html';
await p.goto(file,{waitUntil:'networkidle',timeout:30000});
const info=await p.evaluate(()=>{
  const imgs=[...document.images].map(i=>({src:i.currentSrc||i.src,ok:i.complete&&i.naturalWidth>0,w:i.naturalWidth}));
  return {sections:document.querySelectorAll('[data-section]').length, h1:document.querySelectorAll('h1').length,
    imgs, title:document.title};
});
console.log('title:',info.title);
console.log('sections:',info.sections,'h1:',info.h1);
console.log('pageerrors:',errs.length, errs.slice(0,3));
console.log('images:'); info.imgs.forEach(i=>console.log(' ',i.ok?'OK ':'BROKEN',i.w,i.src.slice(0,80)));
await p.screenshot({path:process.env.SHOT,fullPage:true});
await b.close();
