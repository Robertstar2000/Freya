import fs from 'node:fs';
let html=fs.readFileSync('index.html','utf8');
html=html.replace('<link rel="stylesheet" href="./src/style.css">','<style>'+fs.readFileSync('src/style.css','utf8')+'</style>');
let model=fs.readFileSync('src/trade.js','utf8').replace(/\bexport /g,'');
let app=fs.readFileSync('src/app.js','utf8').replace(/^import[^\n]+\n/,'');
const data=fs.readFileSync('data/reassessment.json','utf8').replace(/</g,'\\u003c');
html=html.replace('<script type="module" src="./src/app.js"></script>','<script>window.FREYA_DATA='+data+';</script><script type="module">'+model+'\n'+app+'</script>');
fs.writeFileSync('freya_standalone.html',html);console.log('Built portable HTML');
