// Dependency-ordered, isolated module scopes for the downloadable offline simulator.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const modules=new Map(),chunks=[];
function bundle(file){file=path.posix.normalize(file);if(modules.has(file))return modules.get(file);const id='module'+modules.size;modules.set(file,id);let code=fs.readFileSync(file,'utf8');
 const names=[...code.matchAll(/export\s+(?:function|const|let|class)\s+(\w+)/g)].map(m=>m[1]);
 code=code.replace(/import\s*\{([^}]+)\}\s*from\s*(['"])([^'"]+)\2\s*;/g,(_,bindings,q,relative)=>{const dependency=bundle(path.posix.join(path.posix.dirname(file),relative));return 'const {'+bindings.replace(/\s+as\s+/g,':')+'}='+dependency+';';}).replace(/\bexport\s+/g,'');
 if(['src/revision51-app.mjs','src/workspace-ui.mjs'].includes(file))code=code.replace("fetch('data/revision51/requirements.json')",'Promise.resolve({ok:true,json:()=>'+fs.readFileSync('data/revision51/requirements.json','utf8')+'})');
 chunks.push(`const ${id}=(()=>{\n${code}\nreturn {${names.join(',')}};})();`);return id;
}
bundle('src/revision51-app.mjs');const code=chunks.join('\n');new vm.Script(code);
// The hosted trade lab uses fetch and module workers. Keep the offline simulator self-contained.
let html=fs.readFileSync('index.html','utf8')
 .replace(/<!-- TRADE-STUDIES:START -->[\s\S]*?<!-- TRADE-STUDIES:END -->/,'')
 .replace('<script type="module" src="src/trade-studies-ui.mjs"></script>','')
 .replace('<link rel="stylesheet" href="src/trade-studies.css">','')
 .replace(/<div class="sidebar-group" data-sidebar-group="screen-trades">[\s\S]*?<\/div><\/div>/,
  '<div class="sidebar-group"><a href="https://freya-revision-4.mifecoinc.chatgpt.site/#screen-trades">Trade studies</a></div>')
 .replace(/href="#(studies|science-package|trace|optimizer)"/g,
  'href="https://freya-revision-4.mifecoinc.chatgpt.site/#$1"')
 .replace(/<link rel="stylesheet" href="([^"]+)">/g,(_,file)=>'<style>'+fs.readFileSync(file,'utf8')+'</style>');
html=html.replace('<script type="module" src="src/mission-start.mjs"></script>','<script type="module">'+code.replace(/<\/script/gi,'<\\/script')+'</script>');
html=html.replace('<h1>FREYA Engineering Lab</h1>','<h1>FREYA Engineering Lab · offline calculator</h1><p>Flight calculations and requirement filtering are embedded. Linked reports, audit pages and source references require the hosted site or the complete source directory.</p>');
fs.writeFileSync('FREYA_Operations_Simulator_Rev09.html',html);console.log('Built offline simulator from current module graph');
