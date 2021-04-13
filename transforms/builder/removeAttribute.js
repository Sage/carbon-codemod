import finder from "./finder";

const removeAttribute = (path, attribute, importName) =>
  finder(
    path,
    attribute,
    {
      JSXAttributeReplacement: (attributes) => {
        attributes.remove();
        return true;
      },

      ObjectExpressionsLiteralReplacement: (results, j) => {
        results.remove();
        return true;
      },

      ObjectExpressionsIdentifierReplacement: (results, j) => {
        results.remove();
        return true;
      },

      JSXSpreadAttributeIdentifierReplacement: (results, j) => {
        results.remove();
        return true;
      },
    },
    importName
  );

export default removeAttribute;
