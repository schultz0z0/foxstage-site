import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
const {default:{chromium}}=await import(pathToFileURL(process.env.FOXSTAGE_PLAYWRIGHT_MODULE || 'C:/Users/rapha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js').href);
const base=process.env.FOXSTAGE_QA_URL || 'http://127.0.0.1:3005';
const configured=process.env.FOXSTAGE_QA_TAGS!=='false';
const canonical=process.env.FOXSTAGE_QA_CANONICAL || 'https://foxstage.com.br';
const routes=['/','/cursos/ingles-em-grupo','/cursos/ingles-individual','/a-foxstage','/english-day','/contato','/privacidade','/politica-de-cookies'];
const browser=await chromium.launch({headless:true});
const report={date:new Date().toISOString(),base,configured,physicalDevice:false,routes:[],checks:[],errors:[]};
try {
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const requests=[];
  await context.route(/https:\/\/(?:www\.googletagmanager\.com|connect\.facebook\.net|www\.google-analytics\.com|www\.facebook\.com|googleads\.g\.doubleclick\.net)\//,async route=>{
    requests.push(route.request().url());await route.fulfill({status:200,contentType:'application/javascript',body:'/* intercepted QA fixture; no provider contacted */'});
  });
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto(base);await page.locator('.cookie-banner').waitFor();
  const firstVisitBanner=page.getByRole('complementary',{name:'Privacidade e cookies'});
  const frame=await firstVisitBanner.boundingBox();
  assert.equal(frame.x,0);assert.equal(frame.width,1440);assert.ok(Math.abs(frame.y+frame.height-1000)<1,'Banner is attached to the bottom edge');assert.ok(frame.height<=90,'Desktop banner stays compact');
  assert.deepEqual(await firstVisitBanner.getByRole('button').allTextContents(),['Rejeitar','Gerenciar','Aceitar']);
  for(const width of [320,390,768]){
    await page.setViewportSize({width,height:844});
    const frame=await firstVisitBanner.boundingBox();assert.equal(frame.width,width);assert.ok(frame.y>=0);assert.ok(frame.height<220);
    assert.ok(await firstVisitBanner.evaluate(e=>e.scrollWidth<=e.clientWidth),'Cookie banner does not overflow on mobile');
  }
  await page.setViewportSize({width:1440,height:1000});
  assert.equal(requests.length,0,'No third party before consent');
  await page.getByRole('button',{name:'Gerenciar',exact:true}).click();
  const dialog=page.getByRole('dialog');await dialog.waitFor();
  assert.equal(await dialog.getByRole('checkbox').count(),2);
  for(const checkbox of await dialog.getByRole('checkbox').all())assert.equal(await checkbox.isChecked(),false);
  await page.keyboard.press('Escape');assert.equal(await dialog.isVisible(),false);
  assert.equal(await page.getByRole('button',{name:'Gerenciar',exact:true}).evaluate(e=>e===document.activeElement),true,'Escape restores focus');
  await firstVisitBanner.getByRole('button',{name:'Rejeitar',exact:true}).click();
  assert.equal(await page.locator('.cookie-banner').count(),0);await page.reload();
  assert.equal(await page.locator('.cookie-banner').count(),0);assert.equal(requests.length,0);
  report.checks.push('default deny, unchecked categories, Escape/focus, rejection persists');

  await page.getByRole('button',{name:'Preferências de cookies',exact:true}).click();
  await dialog.getByRole('checkbox',{name:/Análise de visitas/}).check();
  await dialog.getByRole('button',{name:'Salvar escolha',exact:true}).click();
  if(configured)await page.waitForFunction(()=>!!document.getElementById('foxstage-google-tag'));
  else await page.waitForTimeout(300);
  assert.equal(requests.some(url=>url.includes('facebook')),false,'Analysis is not advertising');
  assert.equal(requests.some(url=>url.includes('gtag/js')),configured);
  if(configured)assert.equal(await page.evaluate(()=>(window.dataLayer??[]).filter(args=>args[0]==='event'&&args[1]==='page_view').length),1);
  await page.getByRole('button',{name:'Preferências de cookies',exact:true}).click();
  await dialog.getByRole('checkbox',{name:/Publicidade/}).check();
  await dialog.getByRole('button',{name:'Salvar escolha',exact:true}).click();
  if(configured)await page.waitForFunction(()=>!!document.getElementById('foxstage-meta-pixel'));
  if(configured)assert.equal(await page.evaluate(()=>(window.dataLayer??[]).filter(args=>args[0]==='event'&&args[1]==='page_view').length),1,'Changing advertising consent does not duplicate analytics pageviews');
  const queryPage=await context.newPage();await queryPage.goto(base+'/?email=PRIVATE_QUERY_SENTINEL');
  if(configured)await queryPage.waitForFunction(()=>!!document.getElementById('foxstage-google-tag'));
  assert.equal(await queryPage.locator('#foxstage-meta-pixel').count(),0);
  assert.ok(!(await queryPage.evaluate(()=>JSON.stringify(window.dataLayer??[]))).includes('PRIVATE_QUERY_SENTINEL'));
  await queryPage.close();
  const otherTab=await context.newPage();await otherTab.goto(base);
  if(configured)await otherTab.waitForFunction(()=>!!document.getElementById('foxstage-meta-pixel'));
  await page.bringToFront();
  const beforeRevoke=requests.length;
  // Known first-party tracker cookie must be cleared on revocation.
  await context.addCookies([{name:'_ga',value:'fixture',url:base}]);
  await page.getByRole('button',{name:'Preferências de cookies',exact:true}).click();
  await Promise.all([page.waitForEvent('load'),otherTab.waitForEvent('load'),dialog.getByRole('button',{name:'Recusar opcionais',exact:true}).click()]);
  assert.equal(await page.locator('#foxstage-google-tag, #foxstage-meta-pixel').count(),0);
  assert.equal((await context.cookies()).some(c=>c.name==='_ga'),false);
  assert.equal(requests.length,beforeRevoke,'No tags restart after revocation');
  assert.equal(await otherTab.locator('#foxstage-google-tag, #foxstage-meta-pixel').count(),0,'Other tabs respect revocation');await otherTab.close();
  report.checks.push('separate purposes; no IDs means inert; revocation clears known cookies and reloads');

  const titles=new Set();const descriptions=new Set();
  for(const pathname of routes){
    const response=await page.goto(base+pathname);assert.equal(response.status(),200,pathname);
    const title=await page.title();assert.ok(title.includes('Foxstage'));assert.ok(!titles.has(title),'Unique title');titles.add(title);
    const description=await page.locator('meta[name="description"]').getAttribute('content');assert.ok(description);assert.ok(!descriptions.has(description));descriptions.add(description);
    assert.equal(await page.locator('html').getAttribute('lang'),'pt-BR');assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('main').count(),1);assert.equal(await page.locator('footer').count(),1);
    assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).href,new URL(pathname,canonical).href);
    assert.equal(new URL(await page.locator('meta[property="og:url"]').getAttribute('content')).href,new URL(pathname,canonical).href);
    assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute('content'),'summary_large_image');
    const robots=await page.locator('meta[name="robots"]').evaluateAll(nodes=>nodes.map(n=>n.content));assert.ok(!robots.some(r=>r.includes('noindex')));
    const image=await page.locator('meta[property="og:image"]').first().getAttribute('content');
    assert.ok(image.startsWith(canonical));const img=await context.request.get(base+new URL(image).pathname);assert.equal(img.status(),200);assert.ok(img.headers()['content-type'].startsWith('image/'));
    const graphs=await page.locator('script[type="application/ld+json"]').allTextContents();assert.equal(graphs.length,1);
    const graph=JSON.parse(graphs[0])['@graph'];assert.ok(graph.find(node=>node['@type']==='EducationalOrganization'));assert.ok(graph.find(node=>node['@type']==='BreadcrumbList'));
    const html=await response.text();assert.ok(!html.includes('FOXSTAGE_SERVER_ONLY_SENTINEL_829164'));
    for(const width of [320,360,390,430,768,1024,1440,1920]){
      await page.setViewportSize({width,height:900});
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow ${pathname} ${width}`);
    }
    report.routes.push({pathname,title,image,widths:[320,360,390,430,768,1024,1440,1920]});
  }
  const missing=await page.goto(base+'/pagina-que-nao-existe-auditoria');
  assert.equal(missing.status(),404,'Missing URL has actual HTTP 404');
  assert.ok((await page.locator('meta[name="robots"]').evaluateAll(nodes=>nodes.map(n=>n.content))).some(v=>v.includes('noindex')));
  for(const path of ['/.env','/.env.production','/.git/config','/server.js','/package.json','/src/content/site.ts'])assert.equal((await context.request.get(base+path)).status(),404,'Private source is not served: '+path);
  await page.getByRole('link',{name:/Voltar ao início/}).first().click();await page.waitForURL(base+'/');
  await page.locator('h1').waitFor();
  await context.route('**/contato**',async route=>{await new Promise(resolve=>setTimeout(resolve,1000));await route.continue();});
  const loadingPage=await context.newPage();await loadingPage.goto(base);
  await loadingPage.locator('.route-navigation a[href="/contato"]').click();
  await loadingPage.getByRole('status').filter({hasText:'Carregando a página'}).waitFor();
  await loadingPage.waitForURL(base+'/contato');await loadingPage.locator('h1').waitFor();
  assert.equal(await loadingPage.locator('.navigation-loading').count(),0);await loadingPage.close();
  await context.unroute('**/contato**');
  const robots=await (await context.request.get(base+'/robots.txt')).text();assert.ok(robots.includes('Allow: /'));assert.ok(robots.includes(canonical+'/sitemap.xml'));
  const sitemap=await (await context.request.get(base+'/sitemap.xml')).text();for(const route of routes)assert.ok(sitemap.includes(new URL(route,canonical).href));assert.ok(!sitemap.includes('/conteudos'));
  const llms=await context.request.get(base+'/llms.txt');assert.equal(llms.status(),200);assert.ok(llms.headers()['content-type'].includes('text/plain'));assert.ok((await llms.text()).includes('Rio de Janeiro/RJ'));
  report.checks.push('8 routes: unique metadata, canonical, OG images, JSON-LD, 8 widths, real 404/noindex, discovery files');
  const nojs=await browser.newContext({javaScriptEnabled:false});const np=await nojs.newPage();
  for(const path of routes){assert.equal((await np.goto(base+path)).status(),200);assert.equal(await np.locator('h1').count(),1);assert.equal(await np.locator('h1').isVisible(),true,'SSR content is visible without JavaScript: '+path);assert.equal(await np.locator('script[src*="googletagmanager"],script[src*="facebook.net"]').count(),0);}
  await nojs.close();
  assert.deepEqual(report.errors,[]);
  fs.mkdirSync('work',{recursive:true});await page.screenshot({path:'work/publication-desktop.png'});
  fs.writeFileSync('work/publication-readiness-qa.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
} finally {await browser.close();}
