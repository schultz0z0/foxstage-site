import fs from 'node:fs';
import path from 'node:path';
// Isolated fixture only: no failure trigger or debug endpoint is shipped to production.
const root='work/error-fixture';
fs.mkdirSync(root+'/app/check',{recursive:true});fs.mkdirSync(root+'/components',{recursive:true});
fs.writeFileSync(root+'/package.json',JSON.stringify({private:true,type:'module'}));
fs.writeFileSync(root+'/next.config.mjs','export default {experimental:{cpus:1}};\n');
fs.writeFileSync(root+'/tsconfig.json',JSON.stringify({compilerOptions:{target:'ES2020',lib:['dom','esnext'],strict:true,noEmit:true,jsx:'react-jsx',module:'esnext',moduleResolution:'bundler',esModuleInterop:true,skipLibCheck:true,paths:{'@/components/ui/*':['./components/*']}}}));
for(const [src,dest] of [['src/app/error.tsx','app/error.tsx'],['src/app/global-error.tsx','app/global-error.tsx'],['src/components/ui/ErrorState.tsx','components/ErrorState.tsx'],['src/components/ui/LoadingState.tsx','components/LoadingState.tsx']])fs.copyFileSync(src,path.join(root,dest));
fs.writeFileSync(root+'/app/loading.tsx',`export {LoadingState as default} from '../components/LoadingState';`);
fs.writeFileSync(root+'/app/layout.tsx',`import {headers} from 'next/headers';
export default async function Layout({children}:{children:React.ReactNode}){if((await headers()).get('x-qa-root-failure')==='yes')throw new Error('PRIVATE_ROOT_ERROR_SENTINEL');return <html lang="pt-BR"><body>{children}</body></html>;}`);
fs.writeFileSync(root+'/app/page.tsx',`export const dynamic='force-dynamic';export default function Home(){return <main><h1>Fixture inicial</h1><a href="/check">Abrir página</a></main>;}`);
fs.writeFileSync(root+'/app/check/page.tsx',`export const dynamic='force-dynamic';
export default async function Check({searchParams}:{searchParams:Promise<{mode?:string}>}){const {mode}=await searchParams;if(mode==='loading')await new Promise(r=>setTimeout(r,1800));if(mode==='error')throw new Error('PRIVATE_ROUTE_ERROR_SENTINEL');return <main><h1>Página carregada</h1></main>;}`);
console.log('Prepared isolated fixture in '+root);
