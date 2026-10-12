import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
const pw=await import(pathToFileURL(process.env.FOXSTAGE_PLAYWRIGHT_MODULE || 'C:/Users/rapha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js').href);
const browser=await (pw.default || pw).chromium.launch({headless:true});
const base=process.env.FOXSTAGE_QA_URL || 'http://127.0.0.1:3001';
const result={testedAt:new Date().toISOString(),widths:[],errors:[]};
fs.mkdirSync('.impeccable/review/evolucao',{recursive:true});
try {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',error=>result.errors.push(error.message));
  await page.goto(base+'/english-day');
  assert.equal(await page.locator('#english-day .english-day-phone, #english-day .english-day-artwork').count(),0,'Only the video belongs in the new section');
  assert.equal(await page.locator('#english-day .day-reel video').count(),1);
  const video=page.locator('#english-day video');
  assert.equal(await video.getAttribute('controls'),''); assert.equal(await video.getAttribute('playsinline'),''); assert.equal(await video.getAttribute('loop'),null);
  for(const width of [320,390,768,1024,1440,1920]) {
    await page.setViewportSize({width,height:1000});
    const measurements=await page.evaluate(()=>{
      const v=document.querySelector('#english-day video').getBoundingClientRect(),copy=document.querySelector('.day-reel-copy').getBoundingClientRect();
      return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,videoWidth:v.width,videoHeight:v.height,copyRight:copy.right,videoLeft:v.left,copyTop:copy.top,videoTop:v.top};
    });
    assert.ok(measurements.scrollWidth<=width,JSON.stringify(measurements));
    assert.ok(Math.abs(measurements.videoWidth/measurements.videoHeight-464/816)<.01,'Keep the full vertical video');
    if(width>=768) assert.ok(measurements.copyRight<measurements.videoLeft,'Copy sits beside the video');
    else assert.ok(measurements.copyTop<measurements.videoTop,'Copy precedes video on mobile');
    result.widths.push(measurements);
  }
  await page.setViewportSize({width:1440,height:1000});
  await video.evaluate(v=>v.scrollIntoView({behavior:'instant',block:'center'}));
  await page.waitForFunction(()=>{const v=document.querySelector('#english-day video');return v.muted&&!v.paused&&v.currentTime>0;});
  const start=await video.evaluate(v=>v.currentTime); const box=await video.boundingBox();
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2); await page.waitForTimeout(300);
  assert.ok(await video.evaluate((v,time)=>v.currentTime>time,start),'Hover never pauses playback');
  await video.evaluate(v=>v.pause()); await page.waitForTimeout(100);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'})); await page.waitForTimeout(100);
  await video.evaluate(v=>v.scrollIntoView({behavior:'instant',block:'center'})); await page.waitForTimeout(200);
  assert.ok(await video.evaluate(v=>v.paused),'Manual pause remains respected');
  for(const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});
    await page.locator('#english-day').evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));
    await page.locator('#english-day').screenshot({path:`.impeccable/review/evolucao/english-day-reel-${width}.png`});
  }
  const reduced=await browser.newContext({reducedMotion:'reduce'}); const rp=await reduced.newPage();
  await rp.goto(base+'/english-day'); await rp.locator('#english-day video').evaluate(v=>v.scrollIntoView({behavior:'instant'}));
  await rp.waitForTimeout(350); assert.ok(await rp.locator('#english-day video').evaluate(v=>v.paused),'Reduced motion disables autoplay');
  await rp.locator('#english-day video').evaluate(v=>v.play());
  assert.ok(await rp.locator('#english-day video').evaluate(v=>!v.paused),'Manual playback is available with reduced motion');
  const nojs=await browser.newContext({javaScriptEnabled:false}); const np=await nojs.newPage(); await np.goto(base+'/english-day');
  assert.equal(await np.locator('#english-day video[controls]').count(),1); assert.equal(await np.locator('#english-day a[href="https://www.instagram.com/foxstage_/"]').count(),1);
  assert.deepEqual(result.errors,[]); result.result='pass';
  fs.writeFileSync('docs/english-day-reel-qa.json',JSON.stringify(result,null,2)+'\n');
  console.log('English Day Reel QA passed');
} finally {await browser.close();}
