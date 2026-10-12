import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const modulePath=process.env.FOXSTAGE_PLAYWRIGHT_MODULE || 'C:/Users/rapha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js';
const pw=await import(pathToFileURL(modulePath).href);
const browser=await (pw.default || pw).chromium.launch({headless:true});
const base=process.env.FOXSTAGE_QA_URL || 'http://127.0.0.1:3001';
const evidence={base,testedAt:new Date().toISOString(),media:[],errors:[],checks:[]};
fs.mkdirSync('.impeccable/review/evolucao',{recursive:true});
try {
  for(const route of ['/','/english-day']) for(const width of [1440,390]) {
    const context=await browser.newContext({viewport:{width,height:1000}}); const page=await context.newPage();
    page.on('pageerror',e=>evidence.errors.push(e.message));
    await page.goto(base+route,{waitUntil:'domcontentloaded'});
    await page.evaluate(()=>document.fonts.ready);
    if(route==='/') assert.equal(await page.locator('.english-day-enhancement').count(),0,'Day Player stays deferred below fold');
    await page.locator('#english-day-title').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>Number(document.querySelector('.english-day-enhancement')?.getAttribute('data-motion-frame'))>10);
    const quietCopy=()=>page.locator(route==='/'?'.english-day-copy':'.day-story-header').evaluate(e=>({transform:getComputedStyle(e).transform,opacity:getComputedStyle(e).opacity,children:[...e.querySelectorAll('h1,h2,p,a')].map(n=>({transform:getComputedStyle(n).transform,opacity:getComputedStyle(n).opacity}))}));
    const initialCopy=await quietCopy(); assert.equal(initialCopy.transform,'none'); assert.equal(initialCopy.opacity,'1');
    const photo=page.locator('.english-day-enhancement svg image');
    assert.equal(await photo.getAttribute('preserveAspectRatio'),'xMidYMid meet');
    assert.equal(await photo.evaluate(e=>getComputedStyle(e.ownerSVGElement).overflow),'visible');
    await page.screenshot({path:`.impeccable/review/evolucao/day-entry-${route==='/'?'home':'internal'}-${width}.png`});
    const video=page.locator('#english-day video');
    // Locator scrolling/hover waits for geometric stability, which is the final
    // frame of this intentional movement. Native scrolling and pointer movement
    // exercise interaction while the phone is actually animating.
    await video.evaluate(v=>v.scrollIntoView({behavior:'instant',block:'center'}));
    await page.waitForFunction(()=>{const v=document.querySelector('#english-day video'); return v && !v.paused && v.muted && v.currentTime>0;});
    const box=await video.boundingBox(); await page.mouse.move(box.x+box.width/2,box.y+box.height/2);
    const sample=()=>page.locator('.english-day-phone').evaluate(e=>({frame:Number(document.querySelector('.english-day-enhancement')?.getAttribute('data-motion-frame')),transform:getComputedStyle(e).transform}));
    const hoverStart=await sample(); await page.waitForTimeout(300); const hoverEnd=await sample();
    assert.ok(hoverEnd.frame>hoverStart.frame,`Hover never stalls the timeline: ${route} ${width}, ${hoverStart.frame} -> ${hoverEnd.frame}`);
    if(hoverEnd.frame<300) assert.notEqual(hoverStart.transform,hoverEnd.transform,'Native phone moves under the pointer');
    await video.focus(); const focusStart=await sample(); await page.waitForTimeout(300); const focusEnd=await sample();
    assert.ok(focusEnd.frame>focusStart.frame,'Focus never stalls the timeline');
    assert.deepEqual(await quietCopy(),initialCopy,'Copy stays static during media movement');
    await video.evaluate(v=>v.pause()); await page.waitForTimeout(150); assert.ok(await video.evaluate(v=>v.paused));
    await page.evaluate(()=>scrollTo({top:document.body.scrollHeight,behavior:'instant'}));
    await video.evaluate(v=>v.scrollIntoView({behavior:'instant',block:'center'})); await page.waitForTimeout(300); assert.ok(await video.evaluate(v=>v.paused),'Manual video pause survives leaving and returning');
    await page.waitForFunction(()=>document.querySelector('.english-day-enhancement')?.getAttribute('data-motion-status')==='ended',{},{timeout:12000});
    assert.equal((await sample()).frame,359);
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'})); await video.scrollIntoViewIfNeeded(); await page.waitForTimeout(200); assert.equal((await sample()).frame,359,'Completed media does not replay');
    evidence.media.push({route,width,hoverStart,hoverEnd,focusStart,focusEnd,endedFrame:359,copyStatic:true,manualPausePreserved:true});
    await context.close();
  }
  const context=await browser.newContext({viewport:{width:1440,height:1000}}); const page=await context.newPage();
  await page.goto(base,{waitUntil:'networkidle'}); await page.mouse.move(0,0);
  await page.waitForFunction(()=>document.querySelector('.hero')?.getAttribute('data-rotation')==='running');
  const first=await page.locator('.hero-dot[aria-pressed="true"]').getAttribute('aria-label');
  await page.waitForTimeout(8500); assert.equal(await page.locator('.hero-dot[aria-pressed="true"]').getAttribute('aria-label'),first,'Hero does not rotate early');
  await page.waitForFunction(()=>document.querySelectorAll('.hero-dot')[1]?.getAttribute('aria-pressed')==='true',{},{timeout:3500});
  await page.locator('.hero-dot').first().click(); assert.equal(await page.locator('.hero-dot').first().getAttribute('aria-pressed'),'true');
  assert.ok(await page.locator('.hero-dot').first().evaluate(e=>e!==document.activeElement),'Pointer click does not leave a focus ring');
  assert.equal(await page.locator('.hero-slide:not([hidden]) a[data-contact-origin]').count(),1);
  evidence.checks.push('home and internal Day playback at 1440/390px','photo overflow remains visible and whole photograph uses meet','copy static throughout movement','phone advances with hover and focus','muted video autoplay and persistent manual pause','one-shot frame 359 and no replay','hero rotation interval and manual selection','one hero CTA and no persistent pointer focus');
  assert.deepEqual(evidence.errors,[]); evidence.result='pass';
  fs.writeFileSync('docs/evolution-motion-qa.json',JSON.stringify(evidence,null,2)+'\n');
  console.log('Institutional motion QA passed.');
} finally {await browser.close();}
