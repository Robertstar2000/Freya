import fs from 'node:fs';
import {initialConsole} from '../src/initial-console.mjs';
import {DASHBOARD_MARKUP} from '../src/mission-dashboard.mjs';
import {createHash} from 'node:crypto';
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist',{recursive:true});
for(const f of ['current-requirements.html','trade-studies.html','block-data.html','science-review.html','validation.html','FREYA_Operations_Simulator_Rev09.html','index.html','revision8.html','revision7.html','FREYA_Engineering_Study_Revision_8_Fully_Integrated.pdf','FREYA_Engineering_Study_Revision_8_Fully_Integrated.docx','WEBSITE_SPECIFICATION.md','requirement-evidence.html','review.html','rev09-source.html','src','data','archive','assets','documents','Freya_Engineering_Study_Revision_7_Integrated.pdf','FREYA_Website_Specification_Revision_7.md','Freya_Engineering_Study_Revision_4.docx','FREYA_Website_Specification_Revision_4.md'])fs.cpSync(f,'dist/'+f,{recursive:true});
console.log('Built FREYA Revision 5.1 with full Rev09 specification, A/B operations and archived evidence');

// Render the dashboard shell into HTML so it remains visible before scripts load.
let html=fs.readFileSync('dist/index.html','utf8');
html=html.replace(/<section id="missionDashboard"[^>]*>[\s\S]*?<\/section>/, '<section id="missionDashboard" aria-label="Mission control dashboard">'+DASHBOARD_MARKUP+'</section>');
for(const [id,content] of Object.entries(initialConsole()))html=html.replace(new RegExp('<div id="'+id+'"([^>]*)></div>'), (_,attrs)=>'<div id="'+id+'"'+attrs+'>'+content+'</div>');
// Version the full module graph and styles to avoid mixed cached release assets.
const files=fs.readdirSync('dist/src').filter(f=>/\.(mjs|js|css)$/.test(f));
const release=createHash('sha256').update(html+files.map(f=>fs.readFileSync('dist/src/'+f,'utf8')).join('')).digest('hex').slice(0,12);
for(const f of files.filter(f=>/\.(mjs|js)$/.test(f))){const path='dist/src/'+f;const code=fs.readFileSync(path,'utf8').replace(/(['"])(\.\.?\/[^'"?]+\.(?:mjs|js))\1/g,(_,q,url)=>q+url+'?v='+release+q);fs.writeFileSync(path,code);}
html=html.replace(/(src|href)="(src\/[^"?]+\.(?:mjs|js|css))"/g, '$1="$2?v='+release+'"');
fs.writeFileSync('dist/index.html',html);

const tradePath='dist/trade-studies.html';
const tradeHtml=fs.readFileSync(tradePath,'utf8');
fs.writeFileSync(tradePath,tradeHtml.replace(/(src|href)="(src\/[^"?]+\.(?:mjs|css))"/g, '$1="$2?v='+release+'"'));
