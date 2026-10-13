import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
let playwright;
try { playwright=await import(process.env.FOXSTAGE_PLAYWRIGHT_MODULE ? pathToFileURL(process.env.FOXSTAGE_PLAYWRIGHT_MODULE).href : 'playwright'); }
catch { playwright=await import(pathToFileURL('C:/Users/rapha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js').href); }
const base=process.env.FOXSTAGE_QA_URL || 'http://127.0.0.1:3001';
const {chromium}=playwright.default || playwright;
const browser=await chromium.launch({headless:true});
const routes=['/','/cursos/ingles-em-grupo','/cursos/ingles-individual','/a-foxstage','/english-day','/contato'];
const expectedBands={
  '/cursos/ingles-em-grupo':['photo','white','cream','black'],
  '/cursos/ingles-individual':['photo','white','cream'],
  '/a-foxstage':['photo','white','cream','white'],
  '/english-day':['photo','white','orange','cream'],
  '/contato':['photo','white'],
};
const evidence={base,mode:process.env.FOXSTAGE_QA_PUBLIC==='true'?'public':'private-preview',testedAt:new Date().toISOString(),pages:[],errors:[],checks:[]};
fs.mkdirSync('.impeccable/review/evolucao',{recursive:true});
try {
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage(); page.on('pageerror',e=>evidence.errors.push(e.message));
  if(evidence.mode==='public') {
    for(const route of routes.slice(1)) {
      const response=await page.goto(base+route); assert.equal(response.status(),200,'Approved route must be accessible in production: '+route);
      assert.equal(await page.locator('main').count(),1); assert.equal(await page.locator('h1').count(),1); assert.equal(await page.locator('header').count(),1); assert.equal(await page.locator('footer').count(),1);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://foxstage.example'+route);
      assert.equal(await page.locator('header a[href="/a-foxstage"]').count(),2);
      assert.equal(await page.locator('header a[href="/english-day"]').count(),2);
      assert.equal(await page.locator('header a[href="/cursos/ingles-em-grupo"]').count(),2);
    }
    const nojs=await browser.newContext({javaScriptEnabled:false}); const np=await nojs.newPage();
    for(const route of routes.slice(1)) {
      const response=await np.goto(base+route); assert.equal(response.status(),200);
      assert.equal(await np.locator('main').count(),1,'Published page must be readable without JavaScript: '+route);
      assert.equal(await np.locator('h1').count(),1); assert.equal(await np.locator('header').count(),1); assert.equal(await np.locator('footer').count(),1);
    }
    await nojs.close();
    await page.goto(base); assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).href,'https://foxstage.example/');
    const sitemap=await (await context.request.get(base+'/sitemap.xml')).text();
    for(const route of routes) assert.ok(sitemap.includes('https://foxstage.example'+route));
    for(const route of ['/conteudos','/privacidade']) {
      assert.equal((await page.goto(base+route)).status(),404);
      assert.ok(!sitemap.includes('https://foxstage.example'+route));
    }
    evidence.checks.push('configured public origin serves all approved pages with complete navigation, canonical URLs and sitemap entries; unimplemented routes remain 404');
  } else {
    for(const route of routes) {
      const response=await page.goto(base+route,{waitUntil:'networkidle'}); assert.equal(response.status(),200,route);
      await page.evaluate(()=>document.fonts.ready);
      await page.locator('.skip-link').focus(); await page.keyboard.press('Enter'); await page.keyboard.press('Tab');
      assert.ok(await page.evaluate(()=>!document.activeElement.closest('header')),'Skip link must bypass navigation: '+route);
      assert.equal(await page.locator('main#conteudo').count(),1,route); assert.equal(await page.locator('h1').count(),1,route); assert.equal(await page.locator('header').count(),1,route); assert.equal(await page.locator('footer').count(),1,route);
      assert.equal(await page.locator('html').getAttribute('lang'),'pt-BR');
      assert.ok((await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'));
      assert.equal(await page.locator('link[rel="canonical"]').count(),0);
      const title=await page.title(); assert.ok(title.includes('Foxstage'));
      if(route!=='/') {
        assert.equal(await page.locator('.hero-shell .hero-page').count(),1,'Internal page keeps the home photographic hero style: '+route);
        assert.equal(await page.locator('.hero-shell header').count(),1,'Menu sits inside the shared hero composition');
        assert.equal(await page.locator('.hero-page .hero-actions a').count(),1,'One CTA per internal banner');
        if(route==='/english-day') assert.ok((await page.locator('.hero-page img.hero-image').getAttribute('src')).includes('english-day-cinema'),'English Day real photo is the banner background');
      }
      const bands=await page.locator('main#conteudo > section').evaluateAll(sections=>sections.map(s=>{
        if(s.querySelector('.hero'))return 'photo';
        const color=getComputedStyle(s).backgroundColor;
        return color==='rgb(16, 19, 20)'?'black':color==='rgb(243, 239, 232)'?'cream':color==='rgb(246, 90, 11)'?'orange':color==='rgb(255, 255, 255)'||color==='rgba(0, 0, 0, 0)'?'white':color;
      }));
      if(expectedBands[route]) assert.deepEqual(bands,expectedBands[route],'Each page follows its own content structure: '+route);
      assert.equal(await page.locator('.footer-base a').getAttribute('href'),'#conteudo','Voltar ao topo stays on the current page');
      const widths=[];
      for(const width of [320,360,390,430,768,1024,1440,1920]) {
        await page.setViewportSize({width,height:1000});
        const metric=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,clipped:[...document.querySelectorAll('h1,h2,h3,p,a,summary')].filter(e=>!e.classList.contains('sr-only')&&e.clientWidth&&e.scrollWidth>e.clientWidth+2).map(e=>e.textContent.trim().slice(0,80))}));
        assert.ok(metric.scrollWidth<=width,route+' '+JSON.stringify(metric)); assert.deepEqual(metric.clipped,[],route+' '+JSON.stringify(metric)); widths.push(metric);
      }
      for(const width of [1440,390]) {
        await page.setViewportSize({width,height:1000});
        await page.locator('img.hero-image').first().evaluate(i=>i.decode());
        assert.ok(await page.locator('img.hero-image').first().evaluate(i=>i.naturalWidth>0),'Banner image is delivered and decoded');
        await page.evaluate(async()=>{
          const images=[...document.querySelectorAll('img')];
          images.forEach(i=>i.loading='eager'); // Full-page captures include below-fold photographs.
          await Promise.all(images.map(i=>i.decode()));
          if(document.activeElement instanceof HTMLElement)document.activeElement.blur();
        });
        await page.screenshot({path:'.impeccable/review/evolucao/'+(route==='/'?'home':route.split('/').at(-1))+'-'+width+'.png',fullPage:true});
      }
      evidence.pages.push({route,title,widths,bands});
    }
    await page.setViewportSize({width:1440,height:1000}); await page.goto(base+'/cursos/ingles-em-grupo');
    const summary=page.locator('.route-navigation summary'); await summary.focus(); await page.keyboard.press('Enter');
    assert.equal(await page.locator('.route-navigation details').getAttribute('open'),'');
    await page.keyboard.press('Tab'); await page.keyboard.press('Escape');
    assert.equal(await page.locator('.route-navigation details').getAttribute('open'),null); assert.ok(await summary.evaluate(e=>e===document.activeElement));
    await summary.click(); await page.locator('.route-navigation a[href="/cursos/ingles-individual"]').click(); await page.waitForURL('**/cursos/ingles-individual');
    assert.equal(await page.locator('.route-navigation a[aria-current="page"]').getAttribute('href'),'/cursos/ingles-individual');
    await page.setViewportSize({width:390,height:844}); await page.goto(base+'/a-foxstage');
    await page.locator('.mobile-menu > summary').click(); await page.locator('.mobile-menu a[href="/contato"]').click(); await page.waitForURL('**/contato');
    assert.equal(await page.locator('.mobile-menu').getAttribute('open'),null);
    for(const origin of ['group','individual','studentSupport']){
      const href=await page.locator('[data-contact-origin="'+origin+'"]').first().getAttribute('href');
      const url=new URL(href); assert.equal(url.pathname,'/5521989848517'); assert.ok(url.searchParams.get('text').includes(origin==='group'?'grupo':origin==='individual'?'individuais':'aluno'));
    }
    await page.goto(base+'/cursos/ingles-individual');
    for(const [goal,phrase] of [['daily','dia a dia'],['travel','viagens'],['work','trabalho']]) {
      await page.locator(`input[value="${goal}"]`).check();
      assert.equal(await page.locator('.goal-answer:visible').count(),1);
      const href=await page.locator(`.goal-answer[data-goal="${goal}"] a`).getAttribute('href');
      const message=new URL(href).searchParams.get('text'); assert.ok(message.includes('aulas individuais')&&message.includes(phrase));
    }
    const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}); const np=await nojs.newPage();
    await np.goto(base+'/cursos/ingles-em-grupo');
    await np.locator('.skip-link').focus(); await np.keyboard.press('Enter'); await np.keyboard.press('Tab');
    assert.ok(await np.evaluate(()=>!document.activeElement.closest('header')),'Skip link works without JavaScript');
    // Test native disclosures by keyboard after the skip-link moved the viewport.
    await np.locator('.mobile-menu > summary').focus(); await np.keyboard.press('Enter');
    await np.locator('.mobile-menu summary').filter({hasText:'Cursos'}).focus(); await np.keyboard.press('Enter');
    await np.locator('.mobile-menu a[href="/cursos/ingles-individual"]').focus(); await np.keyboard.press('Enter');
    await np.waitForURL('**/cursos/ingles-individual');
    assert.ok((await np.locator('h1').textContent()).includes('individual'));
    await np.locator('input[value="travel"]').check();
    assert.equal(await np.locator('.goal-answer:visible').count(),1,'Objective choices work without JavaScript');
    assert.ok((await np.locator('.goal-answer:visible a').getAttribute('href')).includes('viagens'));
    for(const path of ['/conteudos','/conteudos/rascunho','/english-day/edicao-desconhecida','/privacidade','/nao-existe']){
      const r=await page.goto(base+path); assert.equal(r.status(),404,path); assert.equal(await page.locator('main').count(),1); assert.equal(await page.locator('h1').count(),1);
    }
    evidence.checks.push('one shell and H1 per route','eight responsive widths per page','keyboard disclosure and Escape returns focus','route navigation and mobile menu without selector errors','contextual WhatsApp destinations','no-JavaScript course navigation','unimplemented and unknown routes return 404','private preview noindex and no public canonical');
  }
  assert.deepEqual(evidence.errors,[]); evidence.result='pass';
  fs.writeFileSync('docs/evolution-'+evidence.mode+'-qa.json',JSON.stringify(evidence,null,2)+'\n');
  console.log('Institutional navigation QA passed: '+evidence.mode);
} finally {await browser.close();}
