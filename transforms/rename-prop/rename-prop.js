/*
 * Convert all <Component old="" /> to <Component new="" />
 */
import { renameAttribute } from "../builder";
import registerMethods from "../registerMethods";

const transformer = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  registerMethods(j);
  const root = j(fileInfo.source);

  const { component, old, replacement } = options;

  const result = renameAttribute(component, old, replacement)(
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
