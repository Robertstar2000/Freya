import {STUDIES, evaluateStudy, improve} from './trade-studies-model.mjs?v=256072640f6f';

self.onmessage = ({data}) => {
  try {
    const study = STUDIES.find(entry=>entry.id===data.id);
    const result = data.iterations ? improve(study,data.context,data.values,data.iterations,data.multiplier) :
      evaluateStudy(study,data.context,data.values);
    self.postMessage({result});
  } catch (error) {
    self.postMessage({error:error.message});
  }
};
