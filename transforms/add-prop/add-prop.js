/*
 * Add a prop to a component <Component /> to <Component prop=value/>
 */
import { addAttribute } from "../builder";
import registerMethods from "../registerMethods";

const transformer = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  registerMethods(j);
  const root = j(fileInfo.source);

  const { importPath, prop, value, importName } = options;

  const result = addAttribute(importPath, prop, value, importName)(
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
