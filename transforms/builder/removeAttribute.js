import finder from "./finder";

const removeAttribute = (path, attribute) =>
  finder(path, attribute, {
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
  });

export default removeAttribute;
