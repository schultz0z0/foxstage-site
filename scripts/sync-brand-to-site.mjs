import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import sharp from 'sharp';

const root = 'assets/Identidade visual Foxstage';
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const verified = JSON.parse(fs.readFileSync(`${root}/verification.json`, 'utf8'));
assert.equal(verified.version, '1.1.0', 'Validate the approved kit before website synchronization');
assert.deepEqual(verified.issues, []);
assert.equal(verified.pdfPages, 12);
const delivery = JSON.parse(fs.readFileSync(`${root}/delivery-manifest.json`, 'utf8'));
for (const entry of delivery.files) assert.equal(hash(`${root}/${entry.file}`), entry.sha256, `Verified kit changed: ${entry.file}`);

const dest = 'public/images/foxstage/brand';
fs.mkdirSync(dest, { recursive: true });
const files = [];
function copy(source, target) {
  fs.copyFileSync(source, target);
  assert.equal(hash(source), hash(target));
  files.push({ source, target, sha256: hash(target) });
}
for (const variant of ['color', 'reverse']) for (const format of ['horizontal', 'compact']) copy(`${root}/logos/${format}/foxstage-${format}-${variant}.svg`, `${dest}/foxstage-${format}-${variant}.svg`);
copy(`${root}/logos/horizontal/foxstage-horizontal-reverse-1891.png`, `${dest}/foxstage-horizontal-reverse.png`);
copy(`${root}/favicons/favicon.ico`, 'src/app/favicon.ico');
copy(`${root}/favicons/foxstage-favicon.svg`, 'src/app/icon.svg');
copy(`${root}/avatars/foxstage-avatar-orange-512.png`, 'src/app/icon.png');
await sharp(`${root}/avatars/foxstage-avatar-orange-512.png`).resize(180, 180).png().toFile('src/app/apple-icon.png');
files.push({ source: `${root}/avatars/foxstage-avatar-orange-512.png`, target: 'src/app/apple-icon.png', treatment: 'Proportional resize to 180px from approved avatar', sha256: hash('src/app/apple-icon.png') });

const manifest = JSON.parse(fs.readFileSync('docs/assets-manifest.json', 'utf8'));
const fonts = manifest.brand.files.filter(entry => entry.target.startsWith('public/fonts/'));
manifest.brand = { ...manifest.brand, version: 'B v1.1', websiteVersion: '3.1.3', approvedBy: 'User approved tapered-eye preview and entire kit/site update, 2026-10-20', kitVerifiedAt: verified.testedAt, synchronizedAt: new Date().toISOString(), files: [...files, ...fonts] };
fs.writeFileSync('docs/assets-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`PASS: validated complete kit before synchronizing ${files.length} website assets; all copies verified by SHA-256.`);
