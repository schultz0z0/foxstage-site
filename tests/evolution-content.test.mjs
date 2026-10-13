import assert from 'node:assert/strict';
import test from 'node:test';
import { getInstitutionalNavigation } from '../src/content/evolution/navigation.ts';
import { deriveAvailability, getPublishedPathnames, canAccessPage, getVisibleAvailability, pageAvailability, implementedPages, pagePaths } from '../src/content/evolution/availability.ts';
import { coursePages } from '../src/content/evolution/courses.ts';

const draft = {group:'draft',individual:'draft',school:'draft',englishDay:'draft',contact:'draft',content:'draft',privacy:'draft'};
test('approvedInstitutionalReleaseIsAccessibleInProductionAndInNavigation', () => {
  for (const environment of [
    { NODE_ENV: 'production' },
    { NODE_ENV: 'production', SITE_URL: 'https://foxstage-site.vercel.app' },
  ]) {
    for (const key of implementedPages) {
      assert.equal(pageAvailability[key], 'published', key);
      assert.equal(canAccessPage(pageAvailability[key], environment), true, key);
    }
    const entries = getInstitutionalNavigation(getVisibleAvailability(pageAvailability, environment));
    const links = entries.flatMap(entry => entry.kind === 'group' ? entry.children : [entry]);
    assert.deepEqual(links.map(entry => entry.href), implementedPages.map(key => pagePaths[key]));
  }
  assert.deepEqual(getPublishedPathnames(pageAvailability), ['/', ...implementedPages.map(key => pagePaths[key])]);
  assert.equal(pageAvailability.content, 'draft');
  assert.equal(pageAvailability.privacy, 'draft');
});
test('publishedNavigationOmitsDraftAndEmptyGroups', () => {
  assert.deepEqual(getInstitutionalNavigation(draft),[]);
  assert.deepEqual(getInstitutionalNavigation({...draft,group:'published'}),[{kind:'link',label:'Cursos',href:'/cursos/ingles-em-grupo'}]);
  const [group] = getInstitutionalNavigation({...draft,group:'published',individual:'published'});
  assert.equal(group.kind,'group');
  assert.deepEqual(group.children.map(c=>c.href),['/cursos/ingles-em-grupo','/cursos/ingles-individual']);
});
test('availabilityUsesContentStateAndApproval', () => {
  const records={group:{status:'published',review:{factsConfirmed:true,copyApproved:false,mediaApproved:true}},contact:{status:'draft',review:{factsConfirmed:true,copyApproved:true,mediaApproved:true}}};
  assert.equal(deriveAvailability(records).group,'draft');
  assert.equal(deriveAvailability(records).contact,'draft');
  records.group.review.copyApproved=true;
  assert.equal(deriveAvailability(records).group,'published');
});
test('publicBuildCannotExposeDraftsEvenWhenIndexationIsOff', () => {
  assert.equal(canAccessPage('draft',{NODE_ENV:'production',SITE_URL:'https://foxstage.example',SITE_INDEXABLE:'false',SITE_PREVIEW_DRAFTS:'true'}),false);
  assert.equal(canAccessPage('draft',{NODE_ENV:'production'}),false);
  assert.equal(canAccessPage('draft',{NODE_ENV:'production',SITE_PREVIEW_DRAFTS:'true'}),true);
  assert.equal(canAccessPage('published',{NODE_ENV:'production'}),true);
  const visible=getVisibleAvailability(draft,{NODE_ENV:'production',SITE_URL:'https://foxstage.example'},['group','individual']);
  assert.deepEqual(visible,draft);
});
test('privatePreviewDoesNotInventArticleOrPrivacyDestinations', () => {
  const visible=getVisibleAvailability(draft,{NODE_ENV:'development'},['group','individual','school','englishDay','contact']);
  assert.equal(visible.group,'published');
  assert.equal(visible.content,'draft');
  assert.equal(visible.privacy,'draft');
  assert.deepEqual(getPublishedPathnames({...draft,group:'published',contact:'published'}),['/','/cursos/ingles-em-grupo','/contato']);
});
test('offersKeepDistinctFactsAndBrazilianSlugs', () => {
  assert.equal(coursePages.group.seo.pathname,'/cursos/ingles-em-grupo');
  assert.equal(coursePages.individual.seo.pathname,'/cursos/ingles-individual');
  assert.notEqual(coursePages.group.introduction,coursePages.individual.introduction);
  assert.equal(coursePages.group.practicalFacts.find(f=>f.label==='Formato').value,'Em grupo');
  assert.equal(coursePages.individual.practicalFacts.find(f=>f.label==='Formato').value,'Individual');
  assert.ok(!coursePages.group.sections.some(s=>s.paragraphs.some(p=>/turma pequena|professor nativo|fluência garantida/i.test(p))));
});
