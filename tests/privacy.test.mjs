import test from 'node:test';
import assert from 'node:assert/strict';
import { createConsent, parseConsent, CONSENT_MAX_AGE } from '../src/lib/consent.ts';
import { getMeasurementConfig, allowedMeasurements } from '../src/lib/measurement.ts';

test('consent is explicit, versioned, bounded and fails closed', () => {
  const now = Date.UTC(2026, 9, 17);
  assert.equal(parseConsent(undefined, now), null);
  assert.equal(parseConsent('invalid', now), null);
  const consent = createConsent(false, true, now);
  assert.deepEqual(parseConsent(JSON.stringify(consent), now), consent);
  for (const patch of [{version:0}, {analytics:'yes'}, {advertising:1}, {updatedAt:now+60000}, {updatedAt:now-CONSENT_MAX_AGE*1000-1}]) {
    assert.equal(parseConsent(JSON.stringify({...consent,...patch}),now),null);
  }
});

test('only validated public IDs cross the server/client boundary', () => {
  const config = getMeasurementConfig({GA4_ID:'G-ABC123',GOOGLE_ADS_ID:'AW-123456',META_PIXEL_ID:'123456789',GOOGLE_ADS_WHATSAPP_LABEL:'Ab_c-123',PRIVATE_KEY:'never-pass'});
  assert.deepEqual(config,{ga4:'G-ABC123',googleAds:'AW-123456',metaPixel:'123456789',adsWhatsAppLabel:'Ab_c-123'});
  assert.deepEqual(getMeasurementConfig({GA4_ID:'G-<script>',META_PIXEL_ID:'a',GOOGLE_ADS_ID:'AW-x',GOOGLE_ADS_WHATSAPP_LABEL:'bad/value'}),{});
});

test('measurement respects purpose and is inert when unconfigured', () => {
  const config={ga4:'G-ABC123',googleAds:'AW-123456',metaPixel:'123456789'};
  assert.deepEqual(allowedMeasurements(config,null),{});
  assert.deepEqual(allowedMeasurements(config,createConsent(false,false)),{});
  assert.deepEqual(allowedMeasurements(config,createConsent(true,false)),{ga4:'G-ABC123'});
  assert.deepEqual(allowedMeasurements(config,createConsent(false,true)),{googleAds:'AW-123456',metaPixel:'123456789'});
  assert.deepEqual(allowedMeasurements({},createConsent(true,true)),{});
});
