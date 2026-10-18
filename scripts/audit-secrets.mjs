import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

// Findings contain only locations/rule names. Never print matching credentials.
const rules = [
  ['private-key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ['github-token', /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})/],
  ['aws-access-key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ['google-api-key', /AIza[0-9A-Za-z_-]{35}/],
  ['slack-token', /xox[baprs]-[0-9A-Za-z-]{20,}/],
  ['credential-url', /(?:postgres(?:ql)?|mysql|redis):\/\/[^\s:"']+:[^\s@"']+@/],
];
const findings=[];
const scan=(content,location)=>{
  if(content.includes('\0'))return;
  for(const [rule,pattern] of rules)if(pattern.test(content))findings.push({location,rule});
};
const git=(args)=>execFileSync('git',args,{encoding:'utf8',maxBuffer:128*1024*1024});
const files=git(['ls-files','-z']).split('\0').filter(Boolean);
for(const file of files){if(fs.existsSync(file)&&fs.statSync(file).isFile())scan(fs.readFileSync(file,'utf8'),file);}
const history=git(['log','--all','--format=','--no-ext-diff','-p','--','.',' :(exclude)package-lock.json'.trim()]);
scan(history,'git-history(all branches, patches)');
let bundles=0;
const walk=(directory)=>{
  if(!fs.existsSync(directory))return;
  for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
    const file=path.join(directory,entry.name);
    if(entry.isDirectory())walk(file);else{scan(fs.readFileSync(file,'utf8'),file);bundles++;}
  }
};
walk('public');walk('.next/static');
const forbidden=files.filter(file=>/(?:^|\/)(?:\.env(?:\..*)?|id_(?:rsa|ed25519)|[^/]+\.(?:pem|key))$/.test(file)&&!file.endsWith('.env.example')&&!file.endsWith('production.env.example'));
for(const location of forbidden)findings.push({location,rule:'tracked-private-file'});
const report={date:new Date().toISOString(),trackedFiles:files.length,publicAndClientFiles:bundles,history:'all reachable branches, patches',findings,limitations:['Pattern-based scan: does not prove absence of every possible secret.','Private server environment and third-party accounts require separate access review.']};
fs.mkdirSync('work',{recursive:true});fs.writeFileSync('work/security-audit.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(findings.length)process.exitCode=1;
