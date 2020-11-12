import finder from "./finder";

const renameAttribute = (path, attribute, replacement) =>
  finder(path, attribute, {
    JSXAttributeReplacement: (attributes, j) => {
      attributes.forEach((nodePath) => {
        j(nodePath)
          .find(j.JSXIdentifier)
          .replaceWith(j.jsxIdentifier(replacement));
      });
      return true;
    },

    ObjectExpressionsLiteralReplacement: (results, j) => {
      results.get("key").replace(j.identifier(replacement));
      return true;
    },

    ObjectExpressionsIdentifierReplacement: (results, j) => {
      results.get("key").replace(j.identifier(replacement));
      results.get().node.shorthand = false;
      return true;
    },

    JSXSpreadAttributeIdentifierReplacement: (results, j) => {
      results.get("key").replace(j.identifier(replacement));
      return true;
    },
  });

export default renameAttribute;
