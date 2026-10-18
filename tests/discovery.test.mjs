import test from 'node:test';
import assert from 'node:assert/strict';
import {buildLlmsText} from '../src/lib/llms.ts';
import {getPublishedPathnames,pageAvailability} from '../src/content/evolution/availability.ts';
test('public discovery is factual, Brazilian and limited to real pages',()=>{
  const origin=new URL('https://foxstage.com.br');
  const text=buildLlmsText(origin);
  const paths=getPublishedPathnames(pageAvailability);
  for(const path of paths) assert.ok(text.includes(new URL(path,origin).href),path);
  assert.ok(text.includes('Rio de Janeiro/RJ'));
  assert.ok(text.includes('todo o Brasil'));
  assert.ok(!text.includes('localhost'));
  assert.ok(!paths.includes('/conteudos'));
  assert.ok(!text.includes('CNPJ'));
});
