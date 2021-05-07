import registerMethods from "../registerMethods";

const oldPrefix = "carbon-react/lib/__experimental__/components/";
const newPrefix = "carbon-react/lib/components/";
const newInternalPrefix = "carbon-react/lib/__internal__/";

const componentsWithNewPath = [
  "checkbox",
  "date",
  "date-range",
  "decimal",
  "fieldset",
  "grouped-character",
  "number",
  "numeral-date",
  "radio-button",
  "search",
  "simple-color-picker",
  "switch",
  "textarea",
  "textbox",
];

const componentsWithNewInternalPath = [
  "field-help",
  "form-field",
  "input",
  "input-icon-toggle",
  "label",
];

const componentsWithNewPathDictionary = componentsWithNewPath.reduce(
  (object, component) => {
    object[`${oldPrefix}${component}`] = `${newPrefix}${component}`;
    return object;
  },
  {}
);

const componentsWithNewInternalPathDictionary = componentsWithNewInternalPath.reduce(
  (object, component) => {
    object[`${oldPrefix}${component}`] = `${newInternalPrefix}${component}`;
    return object;
  },
  {}
);

const componentsDictionary = {
  ...componentsWithNewPathDictionary,
  ...componentsWithNewInternalPathDictionary,
};

function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  registerMethods(j);

  const root = j(fileInfo.source);
  let didReplaceAnyImport = false;

  root.find(j.ImportDeclaration).forEach((path) => {
    const newPath = componentsDictionary[path.value.source.value];
    if (newPath) {
      didReplaceAnyImport = true;
      path.value.source.value = newPath;
    }
  });

  // transform if update occurred
  if (didReplaceAnyImport) {
    return root.toSource();
  }
}

module.exports = transformer;
