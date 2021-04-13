/*
 * Convert all <Component old="" /> to <Component new="" />
 */
import { renameAttribute } from "../builder";
import registerMethods from "../registerMethods";

const transformer = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  registerMethods(j);
  const root = j(fileInfo.source);

  const { importPath, old, replacement, importName } = options;

  const result = renameAttribute(importPath, old, replacement, importName)(
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
