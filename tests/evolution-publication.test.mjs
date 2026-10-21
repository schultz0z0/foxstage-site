import assert from 'node:assert/strict';
import test from 'node:test';
import { buildPageMetadata } from '../src/lib/page-metadata.ts';
import { getPublicationConfig } from '../src/lib/publication.ts';
import { buildStructuredData, serializeStructuredData } from '../src/lib/structured-data.ts';
const seo={title:'Inglês online em grupo',description:'Aulas online ao vivo, com foco em conversação.',pathname:'/cursos/ingles-em-grupo'};

test('productionSharingUsesVersionedHeroAndPreservesSpecificPageImage',()=>{
  const publication=getPublicationConfig({SITE_URL:'https://foxstage.com.br',SITE_INDEXABLE:'true'});
  const home=buildPageMetadata({...seo,pathname:'/'},publication);
  assert.equal(home.openGraph.images[0].url,'https://foxstage.com.br/opengraph-image/hero-20261020-brand-v11');
  assert.equal(home.twitter.images[0],'https://foxstage.com.br/opengraph-image/hero-20261020-brand-v11');
  const day=buildPageMetadata({...seo,pathname:'/english-day',image:'/images/foxstage/english-day-cinema.webp'},publication);
  assert.equal(day.twitter.images[0],'https://foxstage.com.br/images/foxstage/english-day-cinema.webp');
});
test('previewNeverIndexesOrInventsCanonicalOrigin',()=>{
  const meta=buildPageMetadata(seo,getPublicationConfig({}));
  assert.equal(meta.robots.index,false);
  assert.equal(meta.alternates.canonical,undefined);
});
test('canonicalMatchesEveryInternalRoute',()=>{
  const publication=getPublicationConfig({SITE_URL:'https://foxstage.example',SITE_INDEXABLE:'true'});
  for(const pathname of ['/cursos/ingles-em-grupo','/cursos/ingles-individual','/a-foxstage','/english-day','/contato']){
    const m=buildPageMetadata({...seo,pathname},publication);
    assert.equal(m.alternates.canonical,'https://foxstage.example'+pathname);
    assert.equal(m.openGraph.url,m.alternates.canonical);
    assert.equal(m.openGraph.locale,'pt_BR');
  }
});
test('structuredDataUsesConfirmedLocalityWithoutInventingPhysicalBusiness',()=>{
  const graph=buildStructuredData(seo,{url:new URL('https://foxstage.example'),indexable:true},{name:'Foxstage',instagram:'https://www.instagram.com/foxstage_/',logo:'/images/foxstage/brand/foxstage-horizontal-color.svg',phone:'+55 (21) 98984-8517',description:'Inglês online ao vivo.'});
  const organization=graph['@graph'].find(n=>n['@type']==='EducationalOrganization');
  assert.equal(organization.location.name,'Rio de Janeiro');
  assert.equal(organization.areaServed.name,'Brasil');
  assert.equal(organization.address,undefined);
  assert.equal(organization.geo,undefined);
  assert.equal(organization.aggregateRating,undefined);
  const breadcrumb=graph['@graph'].find(n=>n['@type']==='BreadcrumbList');
  assert.equal(breadcrumb.itemListElement.at(-1).item,'https://foxstage.example/cursos/ingles-em-grupo');
  assert.ok(!graph['@graph'].some(n=>n['@type']==='Event'));
});
test('structuredDataSerializationCannotCloseScriptTag',()=>{
  const encoded=serializeStructuredData({name:'</script><script>alert(1)</script>'});
  assert.ok(!encoded.includes('<'));
  assert.equal(JSON.parse(encoded).name,'</script><script>alert(1)</script>');
});
test('courseSchemaDescribesTeachingWithoutInventingCommercialOffers',()=>{
  const graph=buildStructuredData(seo,{url:new URL('https://foxstage.example'),indexable:true},{name:'Foxstage',instagram:'https://www.instagram.com/foxstage_/',logo:'/images/foxstage/brand/foxstage-horizontal-color.svg',phone:'+55 (21) 98984-8517',description:'Inglês online ao vivo.'});
  const course=graph['@graph'].find(n=>n['@type']==='Course');
  assert.ok(course);
  assert.equal(course.name,seo.title);
  assert.equal(course.provider['@id'],'https://foxstage.example/#escola');
  assert.equal(course.offers,undefined);
  assert.equal(course.hasCourseInstance,undefined);
});
