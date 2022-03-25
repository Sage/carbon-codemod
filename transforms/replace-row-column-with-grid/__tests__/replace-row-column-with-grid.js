import defineTest from "../../../defineTest";

const testFilePrefixes = [
  "WithGridImport",
  "WithLiteralPropValues",
  "WithLiteralValuesInExpression",
  "WithPropsDeclaredInOpeningElement",
  "WithPropsPassedAndSpreadFromDeclarationScope",
  "WithPropsPassedDown",
  "WithPropsSetInDeclarationScope",
  "WithPropsShorthandMixed",
  "WithPropsSpreadFromDeclarationScope",
];

testFilePrefixes.forEach((testFilePrefix) => {
  defineTest(__dirname, "replace-row-column-with-grid", null, testFilePrefix);
});
