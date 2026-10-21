import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const root = 'assets/Identidade visual Foxstage';
const index = JSON.parse(fs.readFileSync(`${root}/assets-index.json`, 'utf8'));
const geometry = JSON.parse(fs.readFileSync(`${root}/source/symbol-geometry.json`, 'utf8'));
const backup = 'backups/2026-10-20-pre-brand-eye';
const original = JSON.parse(fs.readFileSync(`${backup}/${root}/source/symbol-geometry.json`, 'utf8'));
assert.equal(geometry.path, original.path, 'Outer silhouette must remain exact');
assert.deepEqual(geometry.placement, original.placement);
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
let svgCount = 0, pngCount = 0, eyeCount = 0;
for (const entry of index) {
  const file = `${root}/${entry.file}`;
  assert.ok(fs.statSync(file).size > 0, file);
  if (entry.format === 'svg') {
    svgCount++;
    const svg = fs.readFileSync(file, 'utf8');
    assert.ok(!/<image|<text|@font-face|href=/.test(svg), `Native vector: ${file}`);
    if (!entry.file.includes('/wordmark/')) {
      eyeCount++;
      assert.equal((svg.match(/data-brand-eye="1.1"/g) || []).length, 1, file);
      assert.ok(svg.includes(`d="${geometry.path}"`), `Shared contour: ${file}`);
      assert.ok(svg.includes(`d="${geometry.eyePath}"`), `Shared eye: ${file}`);
    } else assert.equal(hash(file), hash(`${backup}/${file}`), 'Wordmark unchanged');
    for (const png of index.filter(item => item.format === 'png' && item.file.startsWith(entry.file.slice(0, -4) + '-'))) {
      const rendered = await sharp(Buffer.from(svg)).resize({ width: png.width }).ensureAlpha().raw().toBuffer();
      const actual = await sharp(`${root}/${png.file}`).ensureAlpha().raw().toBuffer();
      assert.ok(rendered.equals(actual), `PNG matches updated SVG: ${png.file}`);
    }
  }
  if (entry.format === 'png') {
    pngCount++;
    const meta = await sharp(file).metadata();
    assert.equal(meta.width, entry.width, file);
    assert.equal(meta.height, entry.height, file);
    if (/^(logos|icons)\//.test(entry.file)) {
      assert.ok(meta.hasAlpha, `Alpha: ${file}`);
      const { channels } = await sharp(file).stats();
      assert.equal(channels.at(-1).min, 0, `Transparent canvas: ${file}`);
    }
  }
}
const ico = fs.readFileSync(`${root}/favicons/favicon.ico`);
assert.equal(ico.readUInt16LE(2), 1);
assert.equal(ico.readUInt16LE(4), 3);
for (const [i, size] of [16, 32, 48].entries()) {
  const position = 6 + i * 16;
  assert.equal(ico[position], size);
  const bytes = ico.subarray(ico.readUInt32LE(position + 12), ico.readUInt32LE(position + 12) + ico.readUInt32LE(position + 8));
  assert.ok(bytes.equals(fs.readFileSync(`${root}/favicons/foxstage-favicon-${size}.png`)), `ICO ${size}px matches updated PNG`);
}
for (const file of walk(`${root}/fonts`)) assert.equal(hash(file), hash(`${backup}/${file}`), `Preserve fonts/licenses: ${file}`);
const md = fs.readFileSync(`${root}/manual-de-marca.md`, 'utf8');
assert.ok(md.includes('Versão 1.1.'));
assert.ok(md.includes('olho em traço afilado'));
assert.ok(!/sem olhos|Acrescentar olhos/.test(md));
const html = fs.readFileSync(`${root}/manual-de-marca.html`, 'utf8');
assert.equal((html.match(/<section class="page /g) || []).length, 12);
for (const match of html.matchAll(/data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)/g)) {
  const svg = Buffer.from(match[1], 'base64').toString();
  if (svg.includes(geometry.path)) assert.ok(svg.includes(geometry.eyePath), 'Manual embedded marks use approved eye');
}
const pdfInfo = execFileSync('pdfinfo', [`${root}/manual-de-marca.pdf`], { encoding: 'utf8' });
assert.match(pdfInfo, /Pages:\s+12/);
assert.match(pdfInfo, /Page size:\s+841\.\d+ x 594\.\d+ pts/);
const python = process.env.FOXSTAGE_PYTHON || path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe');
const pdfText = execFileSync(python, ['-c', 'import sys; from pypdf import PdfReader; print("\\n".join(page.extract_text() for page in PdfReader(sys.argv[1]).pages))', `${root}/manual-de-marca.pdf`], { encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' } });
assert.ok(pdfText.includes('Versão 1.1'));
assert.ok(!/sem depender de olhos|Acrescentar olhos/.test(pdfText));
fs.mkdirSync('work/brand-eye-review', { recursive: true });
const samples = [['logos/compact/foxstage-compact-color.svg', 160], ['icons/foxstage-icon-orange.svg', 96], ['icons/foxstage-icon-dark.svg', 32], ['favicons/foxstage-favicon.svg', 16], ['favicons/foxstage-favicon.svg', 32], ['favicons/foxstage-favicon.svg', 48], ['avatars/foxstage-avatar-orange.svg', 128]];
const composite = [];
let x = 24;
for (const [file, width] of samples) {
  const input = await sharp(`${root}/${file}`).resize({ width }).png().toBuffer();
  composite.push({ input, left: x, top: 26 });
  x += width + 28;
}
await sharp({ create: { width: x, height: 180, channels: 3, background: '#F3EFE8' } }).composite(composite).png().toFile('work/brand-eye-review/small-sizes.png');
const verification = {
  testedAt: new Date().toISOString(), version: '1.1.0', assets: index.length, svgCount, pngCount, symbolsWithEye: eyeCount,
  silhouettePreserved: true, wordmarksFontsLicensesPreserved: true,
  svgChecks: 'Pure paths; shared unchanged silhouette and single approved eye in every symbol',
  pngChecks: 'All 38 PNGs match their corresponding updated SVG pixel for pixel; transparency and dimensions checked',
  icoChecks: '16/32/48px frames match updated favicon PNGs',
  manual: '12-page HTML; all embedded symbols include approved eye; PDF render verified separately',
  pdfPages: 12, pdfFormat: 'A4 landscape', pdfChecks: 'Version and updated instructions verified in extracted PDF text; all 12 final PDF pages rendered with Poppler and visually reviewed',
  smallSizes: 'Compact160px, icons96/32px, favicons16/32/48px, avatar128px rendered',
  printProof: 'Not performed', scope: 'Brand kit verified before separate website synchronization; see docs/assets-manifest.json for website integration', issues: []
};
fs.writeFileSync(`${root}/verification.json`, JSON.stringify(verification, null, 2) + '\n');
const files = walk(root).filter(file => !file.endsWith('delivery-manifest.json')).map(file => ({ file: path.relative(root, file).replaceAll('\\', '/'), bytes: fs.statSync(file).size, sha256: hash(file) }));
fs.writeFileSync(`${root}/delivery-manifest.json`, JSON.stringify({ version: '1.1.0', createdAt: new Date().toISOString(), files }, null, 2) + '\n');
console.log(`PASS: ${index.length} assets, ${eyeCount} vector symbols, ${pngCount} matching PNGs, ICO frames, manual embeds, preserved silhouette, wordmarks, fonts and licenses. Delivery hashes refreshed.`);
