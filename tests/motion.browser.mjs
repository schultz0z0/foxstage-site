import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
let playwright;
try { playwright = await import(process.env.FOXSTAGE_PLAYWRIGHT_MODULE ? pathToFileURL(process.env.FOXSTAGE_PLAYWRIGHT_MODULE).href : 'playwright'); }
catch { playwright = await import(pathToFileURL('C:/Users/rapha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js').href); }
const { chromium } = playwright.default || playwright;
const base = process.env.FOXSTAGE_QA_URL || 'http://127.0.0.1:3001';
const finalFrame = JSON.parse(fs.readFileSync('design.json','utf8')).behavior.motion.signature.finalFrame;
const browser = await chromium.launch({headless:true});
try {
  fs.mkdirSync('.impeccable/review',{recursive:true});
  const errors=[], chunks=[], directLoads=[], widthReport=[];
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',r=>{if(r.url().includes('/_next/static/')&&r.url().includes('.js'))chunks.push(r.url());});
  await page.goto(base,{waitUntil:'networkidle'});
  assert.equal(await page.locator('.signature-player').count(),0,'Player is deferred below the fold');
  const firstFoldChunks=[...chunks];
  const contact=page.locator('#contato');
  const frame=()=>page.locator('[data-signature-frame]').getAttribute('data-signature-frame');
  const waitStatus=(target,status)=>target.waitForFunction(s=>document.querySelector('[data-motion-status]')?.getAttribute('data-motion-status')===s,status,{timeout:12000});
  // Scripted scroll never grants click/key activation to unlock autoplay.
  await contact.scrollIntoViewIfNeeded();
  await waitStatus(page,'playing');
  await page.waitForFunction(()=>Number(document.querySelector('[data-signature-frame]')?.getAttribute('data-signature-frame'))>3);
  assert.equal(await page.locator('.signature-motion button').count(),0);
  assert.equal(await page.locator('.signature-motion [tabindex="0"]').count(),0);
  const progress=await page.evaluate(async()=>{
    const samples=[];
    for(let i=0;i<18;i++) {
      samples.push({time:performance.now(),frame:Number(document.querySelector('[data-signature-frame]')?.getAttribute('data-signature-frame')),translations:[...document.querySelector('.signature-player .signature-artwork').children].map(e=>getComputedStyle(e).translate)});
      await new Promise(resolve=>setTimeout(resolve,200));
    }
    return samples;
  });
  assert.ok(progress.at(-1).frame>progress[0].frame+100,'Frames advance without interaction');
  for(let i=1;i<progress.length;i++) if(progress[i-1].frame<240) {
    assert.ok(progress[i].frame>progress[i-1].frame,'No stalled intermediate frame');
    assert.notDeepEqual(progress[i].translations,progress[i-1].translations,'Continuous translations');
  }
  await waitStatus(page,'ended');
  assert.equal(Number(await frame()),finalFrame);
  await page.waitForTimeout(500); assert.equal(Number(await frame()),finalFrame,'Final hold');
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await contact.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300); assert.equal(Number(await frame()),finalFrame,'No replay on return');
  for(const width of [1440,390]) {
    const fresh=await browser.newContext({viewport:{width,height:1000}});
    const direct=await fresh.newPage();
    await direct.goto(base+'/#contato',{waitUntil:'networkidle'});
    await direct.waitForFunction(()=>Number(document.querySelector('[data-signature-frame]')?.getAttribute('data-signature-frame'))>10);
    const initialFrame=Number(await direct.locator('[data-signature-frame]').getAttribute('data-signature-frame'));
    assert.ok(initialFrame<finalFrame,'Cold anchor autoplays without interaction');
    assert.equal(await direct.locator('.signature-motion button').count(),0);
    await direct.screenshot({path:`.impeccable/review/autoplay-moving-${width}.png`});
    // Headless browser: simulate the hidden-document event explicitly.
    await direct.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
    await waitStatus(direct,'paused');
    const hidden=await direct.locator('[data-signature-frame]').getAttribute('data-signature-frame');
    await direct.waitForTimeout(300);
    assert.equal(await direct.locator('[data-signature-frame]').getAttribute('data-signature-frame'),hidden);
    await direct.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
    await waitStatus(direct,'playing');
    await direct.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await waitStatus(direct,'paused');
    const offscreen=await direct.locator('[data-signature-frame]').getAttribute('data-signature-frame');
    await direct.waitForTimeout(300);
    assert.equal(await direct.locator('[data-signature-frame]').getAttribute('data-signature-frame'),offscreen);
    await direct.locator('#contato').scrollIntoViewIfNeeded();
    await waitStatus(direct,'ended');
    assert.equal(Number(await direct.locator('[data-signature-frame]').getAttribute('data-signature-frame')),finalFrame);
    directLoads.push({width,initialFrame,endedFrame:finalFrame,interactionRequired:false});
    await fresh.close();
  }
  for(const width of [320,360,390,430,768,1024,1440,1920]) {
    await page.setViewportSize({width,height:1000});
    const result=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,clipped:[...document.querySelectorAll('h1,h2,h3,p,a,button,summary')].filter(e=>!e.classList.contains('sr-only')&&e.clientWidth&&e.scrollWidth>e.clientWidth+1).map(e=>e.textContent.trim().slice(0,60))}));
    assert.ok(result.scrollWidth<=width,JSON.stringify(result));assert.deepEqual(result.clipped,[],JSON.stringify(result));widthReport.push(result);
  }
  for(const [width,height,label] of [[1440,1000,'desktop'],[390,844,'mobile']]) {
    await page.setViewportSize({width,height});await contact.scrollIntoViewIfNeeded();
    await contact.screenshot({path:`.impeccable/review/contact-autoplay-${label}.png`});
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('.signature-player').waitFor({state:'detached'});
  assert.equal(await page.locator('.signature-player').count(),0);
  assert.ok(await contact.getByText('Aprenda',{exact:true}).isVisible());
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(500);
  assert.notEqual(await page.locator('.signature-enhancement').getAttribute('data-motion-status'),'playing');
  const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}});
  const rp=await reduced.newPage();await rp.goto(base,{waitUntil:'networkidle'});await rp.locator('#contato').scrollIntoViewIfNeeded();
  await rp.waitForTimeout(300);assert.equal(await rp.locator('.signature-player').count(),0);
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const fallback=await nojs.newPage();await fallback.goto(base);await fallback.locator('#contato').scrollIntoViewIfNeeded();
  assert.equal(await fallback.locator('.signature-poster').count(),1);
  assert.equal(await fallback.locator('#contato a[href^="https://wa.me/"]').count(),1);
  const blocked=await browser.newContext({viewport:{width:1440,height:1000}});
  const bp=await blocked.newPage();await bp.goto(base,{waitUntil:'networkidle'});
  await bp.route('**/_next/static/**/*.js',r=>r.abort());await bp.locator('#contato').scrollIntoViewIfNeeded();await bp.waitForTimeout(800);
  assert.ok(await bp.locator('.signature-poster').isVisible());assert.ok(await bp.locator('#contato a[href^="https://wa.me/"]').isVisible());
  assert.deepEqual(errors,[]);
  fs.writeFileSync('docs/motion-qa.json',JSON.stringify({base,testedAt:new Date().toISOString(),result:'pass',checks:['autoplay without interaction on scroll and cold anchor desktop/mobile','no motion controls or tab stops','continuous overlapping translations','offscreen pause/resume','simulated hidden-document pause/resume','final frame 299 holds without replay','eight responsive widths','reduced motion and preference changes','no-JavaScript and blocked chunk fallbacks'],widthReport,directLoads,progress,errors,firstFoldChunks,additionalChunks:chunks.filter(x=>!firstFoldChunks.includes(x))},null,2)+'\n');
  console.log('Motion QA passed: autoplay without input, continuous motion, no controls, final hold and responsive fallbacks.');
} finally {await browser.close();}
