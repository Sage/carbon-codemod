/*
 * Convert all <Component prop="something" /> to <Component prop="somethingelse" />
 */
import { replaceAttributeValue } from "../builder";
import registerMethods from "../registerMethods";

const transformer = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  registerMethods(j);
  const root = j(fileInfo.source);

  const { component, attribute, oldValue, newValue } = options;

  const result = replaceAttributeValue(
    component,
    attribute,
    oldValue,
    newValue
  )(fileInfo, api, options, j, root);

  if (result) {
    return root.toSource();
  }
};

module.exports = transformer;
