import registerMethods from "./../registerMethods";

const run = (...transformers) => {
  return function rootTransformer(fileInfo, api, options) {
    let didReplacement = false;
    const j = api.jscodeshift;
    registerMethods(j);
    const root = j(fileInfo.source);

    transformers.forEach((transformer) => {
      const result = transformer(fileInfo, api, options, j, root);
      didReplacement = didReplacement || result;
    });

    if (didReplacement) {
      return root.toSource();
    }
  };
};

export default run;
