import { chromium } from 'playwright';
async function tryMode(headless, channel){
  const opts = { headless };
  if (channel) opts.channel = channel;
  let b;
  try { b = await chromium.launch(opts); }
  catch(e){ return `launch-fail(${channel||'chromium'}): ${e.message.split('\n')[0]}`; }
  const ctx = await b.newContext({ userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
  const p = await ctx.newPage();
  let out;
  try {
    const r = await p.goto('https://www.xfinity.com/', { waitUntil:'domcontentloaded', timeout:40000 });
    await p.waitForTimeout(2000);
    const title = await p.title();
    const h1 = await p.evaluate(()=>document.querySelector('h1')?.innerText||'(none)');
    out = `status=${r.status()} title="${title.slice(0,60)}" h1="${h1.slice(0,60)}"`;
  } catch(e){ out = `ERR: ${e.message.split('\n')[0]}`; }
  await b.close();
  return out;
}
console.log('headless chromium:', await tryMode(true));
console.log('headed chrome:', await tryMode(false,'chrome'));
