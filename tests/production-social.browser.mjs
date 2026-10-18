import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const modulePath = process.env.FOXSTAGE_PLAYWRIGHT_MODULE || 'C:/Users/rapha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js';
const { default: { chromium } } = await import(pathToFileURL(modulePath).href);
const base = process.env.FOXSTAGE_QA_URL || 'http://127.0.0.1:3005';
const browser = await chromium.launch({headless:true});
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(base);
  const og = await page.locator('meta[property="og:image"]').first().getAttribute('content');
  const twitter = await page.locator('meta[name="twitter:image"]').first().getAttribute('content');
  assert.ok(og.includes('/opengraph-image/hero-20261017'), 'Sharing must use the versioned photographic hero');
  assert.ok(twitter.includes('/opengraph-image/hero-20261017'), 'Twitter must use the same hero');
  // Fetch the metadata URL's path on this server so the production-domain fixture stays local.
  const response = await context.request.get(base + new URL(og, base).pathname);
  assert.equal(response.status(), 200);
  assert.ok(response.headers()['content-type'].includes('image/png'));
  const png = await response.body();
  assert.equal(png.readUInt32BE(16),1200); assert.equal(png.readUInt32BE(20),630);
  const data = 'data:image/png;base64,' + png.toString('base64');
  const sample = await page.evaluate(async source => {
    const image = new Image(); image.src=source; await image.decode();
    const canvas=document.createElement('canvas'); canvas.width=1200; canvas.height=630;
    const ctx=canvas.getContext('2d'); ctx.drawImage(image,0,0);
    const colors=new Set();
    for(let y=100;y<550;y+=15) for(let x=700;x<1150;x+=15) colors.add([...ctx.getImageData(x,y,1,1).data].slice(0,3).join(','));
    return colors.size;
  },data);
  assert.ok(sample>400, 'The right half must contain the hero photograph, rather than a flat background');
  const health = await context.request.get(base+'/api/health');
  assert.equal(health.status(),200); assert.deepEqual(await health.json(),{status:'ok'});
  assert.ok(health.headers()['cache-control'].includes('no-store'));
  fs.mkdirSync('work',{recursive:true}); fs.writeFileSync('work/foxstage-social-preview.png',png);
  console.log('Production healthcheck and photographic Open Graph/Twitter preview passed (1200×630).');
} finally { await browser.close(); }
