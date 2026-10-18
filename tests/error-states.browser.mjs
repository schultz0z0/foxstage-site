import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const {default:{chromium}}=await import(pathToFileURL(process.env.FOXSTAGE_PLAYWRIGHT_MODULE || 'C:/Users/rapha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js').href);
const base='http://127.0.0.1:3007';
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage();
 await page.goto(base+'/check?mode=error');
 await page.getByRole('heading',{name:'Não foi possível abrir esta página.'}).waitFor();
 assert.ok(!(await page.locator('body').innerText()).includes('PRIVATE_ROUTE_ERROR_SENTINEL'));
 await page.getByRole('button',{name:'Tentar novamente',exact:true}).click();
 await page.getByRole('heading',{name:'Não foi possível abrir esta página.'}).waitFor();
 await page.getByRole('link',{name:'Voltar ao início',exact:true}).click();await page.getByRole('heading',{name:'Fixture inicial'}).waitFor();
 await page.goto(base+'/check?mode=loading',{waitUntil:'commit'});
 await page.getByRole('status').waitFor();assert.ok(await page.getByRole('status').isVisible());
 await page.getByRole('heading',{name:'Página carregada'}).waitFor();
 const root=await browser.newPage({extraHTTPHeaders:{'x-qa-root-failure':'yes'}});
 await root.goto(base);await root.getByRole('heading',{name:'Precisamos de um instante.'}).waitFor();
 assert.ok(!(await root.locator('body').innerText()).includes('PRIVATE_ROOT_ERROR_SENTINEL'));
 assert.equal(await root.locator('html').getAttribute('lang'),'pt-BR');
 assert.ok((await root.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'));
 console.log('Real Next production fixture: route error, retry, hard-navigation recovery, loading status and independent root-error document passed; no raw error message exposed in UI. HTTP status may already be 200 when a streamed response has started.');
}finally{await browser.close();}
