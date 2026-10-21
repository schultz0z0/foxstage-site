import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root='assets/Identidade visual Foxstage';
const lettering=JSON.parse(fs.readFileSync(`${root}/source/lettering-outlines.json`,'utf8'));
const colors={orange:'#F65A0B',ink:'#101314',cream:'#F3EFE8',light:'#FFF8EC',white:'#FFFFFF',textOrange:'#A83A08',lightOrange:'#FFB077'};
const geometry=JSON.parse(fs.readFileSync(`${root}/source/symbol-geometry.json`,'utf8'));
const mark=geometry.path;
const schemes={color:{mark:colors.orange,text:colors.ink},reverse:{mark:colors.orange,text:colors.light},'mono-dark':{mark:colors.ink,text:colors.ink},'mono-light':{mark:colors.light,text:colors.light}};
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
function svg(content,w,h,label){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title"><title id="title">${escape(label)}</title>${content}</svg>`;}
function symbol(color,x,y,scale,micro=false){
  const contour = '<path d="'+mark+'" fill-rule="evenodd"'+(micro?' stroke="'+color+'" stroke-width="'+geometry.microStrokeWidth+'" stroke-linejoin="round"':'')+'/>';
  const eye = '<path data-brand-eye="1.1" d="'+geometry.eyePath+'"'+(micro?' stroke="'+color+'" stroke-width="'+geometry.microEyeStrokeWidth+'" stroke-linejoin="round"':'')+'/>';
  return '<g fill="'+color+'" transform="translate('+x+' '+y+') scale('+scale+')">'+contour+eye+'</g>';
}
function text(label,color,x,y,size){const info=lettering[label],scale=size/info.unitsPerEm;return `<g fill="${color}" transform="translate(${x} ${y}) scale(${scale} ${-scale})">${info.glyphs.map(g=>`<path d="${g.d}" transform="translate(${g.x} 0)"/>`).join('')}</g>`;}
const index=[];
async function asset(folder,name,art,w,h,widths=[2080]){
  fs.mkdirSync(path.join(root,folder),{recursive:true});
  const file=`${folder}/${name}.svg`;
  fs.writeFileSync(path.join(root,file),svg(art,w,h,'Foxstage — '+name));
  index.push({file,format:'svg',viewBox:[w,h],transparent:!folder.includes('avatar')&&!folder.includes('favicon')});
  for(const width of widths){const output=`${folder}/${name}-${width}.png`;await sharp(Buffer.from(svg(art,w,h,name))).resize({width}).png().toFile(path.join(root,output));index.push({file:output,format:'png',width,height:Math.round(h*width/w)});}
}
for(const [name,palette]of Object.entries(schemes)){
  const wordSize=156;
  const width=290+lettering.wordmark.width*wordSize/lettering.wordmark.unitsPerEm+45;
  await asset('logos/horizontal',`foxstage-horizontal-${name}`,symbol(palette.mark,40,22,.96)+text('wordmark',palette.text,290,166,wordSize)+text('descriptor',palette.text,294,225,29),width,280,[Math.ceil(width*2)]);
  await asset('logos/compact',`foxstage-compact-${name}`,symbol(palette.mark,26,16,.68)+text('wordmark',palette.text,204,139,126),204+lettering.wordmark.width*126/lettering.wordmark.unitsPerEm+32,190,[1600]);
  const sw=760,wordWidth=lettering.wordmark.width*155/lettering.wordmark.unitsPerEm,descWidth=lettering.descriptor.width*29/lettering.descriptor.unitsPerEm;
  await asset('logos/stacked',`foxstage-stacked-${name}`,symbol(palette.mark,(sw-215*.97)/2,30,.97)+text('wordmark',palette.text,(sw-wordWidth)/2,420,155)+text('descriptor',palette.text,(sw-descWidth)/2,478,29),sw,530,[1520]);
}
for(const [name,color]of [['orange',colors.orange],['dark',colors.ink],['light',colors.light]]){
  await asset('icons',`foxstage-icon-${name}`,symbol(color,20,12,.93),240,240,[96,256,512,1024]);
}
for(const [name,color]of [['dark',colors.ink],['light',colors.light]]){
  await asset('logos/wordmark',`foxstage-wordmark-${name}`,text('wordmark',color,25,155,176),lettering.wordmark.width*176/lettering.wordmark.unitsPerEm+50,218,[1600]);
}
for(const [name,bg,fg]of [['orange',colors.orange,colors.light],['dark',colors.ink,colors.orange],['cream',colors.cream,colors.ink]]){
  const art=`<rect width="512" height="512" fill="${bg}"/>`+symbol(fg,103,92,1.4);
  await asset('avatars',`foxstage-avatar-${name}`,art,512,512,[512,1024]);
}
const microArt=`<rect width="256" height="256" rx="46" fill="${colors.orange}"/>`+symbol(colors.light,43,35,.77,true);
await asset('favicons','foxstage-favicon',microArt,256,256,[16,32,48,180,192,512]);
const sizes=[16,32,48],pngs=await Promise.all(sizes.map(s=>fs.promises.readFile(`${root}/favicons/foxstage-favicon-${s}.png`)));
const header=Buffer.alloc(6+16*sizes.length);header.writeUInt16LE(1,2);header.writeUInt16LE(sizes.length,4);let offset=header.length;
pngs.forEach((data,i)=>{const p=6+16*i;header[p]=sizes[i];header[p+1]=sizes[i];header.writeUInt16LE(1,p+4);header.writeUInt16LE(32,p+6);header.writeUInt32LE(data.length,p+8);header.writeUInt32LE(offset,p+12);offset+=data.length;});
fs.writeFileSync(`${root}/favicons/favicon.ico`,Buffer.concat([header,...pngs]));
index.push({file:'favicons/favicon.ico',format:'ico',sizes:[16,32,48]});
fs.mkdirSync(`${root}/tokens`,{recursive:true});
fs.mkdirSync(`${root}/source`,{recursive:true});
fs.writeFileSync(`${root}/source/lettering-outlines.json`,JSON.stringify(lettering,null,2)+'\n');
const contrast=(a,b)=>{const lum=h=>{const c=h.slice(1).match(/../g).map(s=>parseInt(s,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];};const x=lum(a),y=lum(b);return Number(((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2));};
const tokens={version:'1.1.0',direction:'B',status:'User-approved direction B with tapered eye, 2026-10-20',colors,typography:{wordmark:'Source Sans 3 700, optically adjusted and supplied as paths',descriptor:'Source Sans 3 600, supplied as paths',heading:'Bebas Neue 400',body:'Source Sans 3 400/600/700'},clearSpace:{unit:'x = one quarter of the visible symbol height',minimum:'1x on all sides'},minimumSizes:{horizontalWithDescriptorPx:360,compactWithoutDescriptorPx:160,symbolPx:32,microFaviconPx:16},contrast:{inkOnOrange:contrast(colors.ink,colors.orange),creamOnOrange:contrast(colors.light,colors.orange),inkOnCream:contrast(colors.ink,colors.cream),textOrangeOnCream:contrast(colors.textOrange,colors.cream),orangeOnInk:contrast(colors.orange,colors.ink)},print:'RGB reference. CMYK/Pantone must be proofed for the chosen paper/profile; no universal equivalence supplied.'};
fs.writeFileSync(`${root}/tokens/brand.json`,JSON.stringify(tokens,null,2)+'\n');
fs.writeFileSync(`${root}/tokens/brand.css`,`:root {\n${Object.entries(colors).map(([k,v])=>`  --foxstage-${k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase())}: ${v};`).join('\n')}\n  --foxstage-font-heading: 'Bebas Neue', sans-serif;\n  --foxstage-font-body: 'Source Sans 3', sans-serif;\n}\n`);
fs.writeFileSync(`${root}/assets-index.json`,JSON.stringify(index,null,2)+'\n');
const provenance=JSON.parse(fs.readFileSync(root+'/provenance.json','utf8'));
provenance.updatedAt=new Date().toISOString();
provenance.version='1.1.0';
delete provenance.websiteChanged;
provenance.websiteIntegration='Website copies are synchronized only after kit verification; integration hashes and timestamps are recorded in docs/assets-manifest.json.';
provenance.symbol='Original SVG outer contour preserved, with one native tapered eye path traced from the user-approved preview of 2026-10-20. Shared master geometry reused in every variant.';
provenance.approvedEyeReference='source/eye-approved-reference.png';
provenance.sourceScripts=['scripts/build-brand-assets.mjs','scripts/build-brand-manual.mjs','scripts/sync-brand-to-site.mjs'];
provenance.microIcon='Original contour reinforcement plus a 3-unit eye stroke for optical legibility at 16/32/48px.';
fs.writeFileSync(root+'/provenance.json',JSON.stringify(provenance,null,2)+'\n');
console.log('Created '+index.length+' brand assets from the shared vector master, version 1.1.0.');
