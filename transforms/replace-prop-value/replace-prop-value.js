/*
 * Convert all <Component prop="something" /> to <Component prop="somethingelse" />
 */
import { replaceAttributeValue } from "../builder";
import registerMethods from "../registerMethods";

const transformer = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  registerMethods(j);
  const root = j(fileInfo.source);

  const { importPath, attribute, oldValue, newValue, importName } = options;

  const result = replaceAttributeValue(
    importPath,
    attribute,
    oldValue,
    newValue,
    importName
  )(fileInfo, api, options, j, root);

  if (result) {
    return root.toSource();
  }
};

module.exports = transformer;
