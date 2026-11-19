// Keep links shared before the trade lab moved into the workspace usable.
const hash=location.hash.slice(1);
const oldModelIds=new Set(['mission','shield','chute','mass','relay','energy','propulsion','gas','storage','science','clock']);
const target=oldModelIds.has(hash)?'study-'+hash:hash||'screen-trades';
location.replace('./'+location.search+'#'+target);
