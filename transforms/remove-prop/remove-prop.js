/*
 * Convert all <Component old="" /> to <Component />
 */
import { removeAttribute } from "../builder";
import registerMethods from "../registerMethods";

const transformer = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  registerMethods(j);
  const root = j(fileInfo.source);

  const { component, prop } = options;

  const result = removeAttribute(component, prop)(
    fileInfo,
    api,
    options,
    j,
    root
  );

  if (result) {
    return root.toSource();
  }
};

module.exports = transformer;
