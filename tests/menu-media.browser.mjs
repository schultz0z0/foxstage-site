import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const {default:{chromium}}=await import(pathToFileURL(process.env.FOXSTAGE_PLAYWRIGHT_MODULE || 'C:/Users/rapha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js').href);
const base=process.env.FOXSTAGE_QA_URL || 'http://127.0.0.1:3005';
const browser=await chromium.launch({headless:true});
try {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto(base);
  const summary=page.locator('.route-disclosure > summary');
  await summary.click();
  assert.equal(await summary.evaluate(e=>e.matches(':focus-visible')),false,'Pointer click must not leave a keyboard focus ring');
  const links=page.locator('.route-submenu a');
  for(const link of await links.all()) {
    const geometry=await link.evaluate(e=>{
      const p=e.parentElement;const style=getComputedStyle(p);
      return {width:e.getBoundingClientRect().width,expected:p.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight),radius:parseFloat(getComputedStyle(e).borderRadius)};
    });
    assert.ok(Math.abs(geometry.width-geometry.expected)<1,`Hover target must span its entire row: ${JSON.stringify(geometry)}`);
    assert.ok(geometry.radius>0,'Highlight follows a rounded row');
    await link.hover();
    await page.waitForFunction(()=>[...document.querySelectorAll('.route-submenu a')].some(e=>e.matches(':hover')&&getComputedStyle(e).backgroundColor==='rgb(243, 239, 232)'));
    const right=await link.boundingBox();await page.mouse.move(right.x+right.width-5,right.y+right.height/2);
    assert.ok(await link.evaluate(e=>e.matches(':hover')),'Right side of the row must be clickable and highlighted');
  }
  await page.mouse.click(10,950);
  await summary.focus();await page.keyboard.press('Enter');await page.keyboard.press('Tab');
  assert.ok(await links.first().evaluate(e=>e===document.activeElement&&e.matches(':focus-visible')),'Keyboard focus is preserved');
  await page.keyboard.press('Escape');assert.equal(await page.locator('.route-disclosure').getAttribute('open'),null);
  await summary.click();await links.first().hover();
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('.route-submenu a')).backgroundColor==='rgb(243, 239, 232)');
  fs.mkdirSync('work',{recursive:true});await page.screenshot({path:'work/foxstage-menu-fixed.png'});
  for(const route of ['/','/cursos/ingles-em-grupo','/cursos/ingles-individual','/a-foxstage','/english-day','/contato']) {
    const response=await page.goto(base+route);assert.equal(response.status(),200);
    assert.ok(!/ilustrativ|gerad[ao] por ia|fictíci/i.test(await page.locator('body').innerText()),'No media disclaimers in public copy: '+route);
    for(const alt of await page.locator('img').evaluateAll(images=>images.map(i=>i.alt)))assert.ok(!/ilustrativ|gerad[ao] por ia|fictíci/i.test(alt),'Image alt remains descriptive: '+alt);
  }
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:1000}});const np=await nojs.newPage();await np.goto(base);await np.locator('.route-disclosure > summary').click();assert.equal(await np.locator('.route-submenu a').count(),2);await nojs.close();
  console.log('Menu full-row hover, keyboard, no-JavaScript navigation and public media copy passed.');
}finally{await browser.close();}
