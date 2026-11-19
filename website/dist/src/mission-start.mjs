// Show startup failures beside the pre-rendered dashboard instead of leaving a blank section.
import('./revision51-app.mjs?v=45af70b8d000').catch(error=>{
 const status=document.getElementById('mdStatus');if(status)status.textContent='SIMULATION • LOAD ERROR';
 const node=document.getElementById('mdLoadError');
 if(node){node.hidden=false;node.textContent='Live telemetry could not start. Reload this page to retry. '+error.message;}
 console.error('FREYA startup failed',error);
});
