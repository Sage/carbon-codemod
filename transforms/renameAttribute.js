import registerMethods from "./registerMethods";

/**
 * Rename a component prop
 * @param {string} path the component import path
 * @param {string} old prop name to replace
 * @param {string} replacement new prop name
 */
module.exports = (path, old, replacement) => {
  return function transformer(fileInfo, api, options) {
    let didReplacement = false;
    const j = api.jscodeshift;
    registerMethods(j);

    /*
     * <Component prop="" />
     */
    const JSXAttributeReplacement = (message) => {
      let didReplacement = false;
      const attributes = message.find(j.JSXAttribute, {
        name: {
          type: "JSXIdentifier",
          name: old,
        },
      });

      attributes.forEach((nodePath) => {
        nodePath.node.name = replacement;
        didReplacement = true;
      });
      return didReplacement;
    };

    /*
     * <Component {...{old: 'info'}} />
     * <Component {...{old: old}} />
     */
    const ObjectExpressionsLiteralReplacement = (attribute) => {
      const results = attribute.find(j.Property, {
        kind: "init",
        key: { name: old },
        shorthand: false,
      });

      if (results.size()) {
        results.get("key").replace(j.identifier(replacement));
        return true;
      }
    };

    /*
     * <Component {...{old}} />
     */
    const ObjectExpressionsIdentifierReplacement = (argument) => {
      const results = argument.find(j.Property, {
        kind: "init",
        key: { name: old },
        shorthand: true,
      });

      if (results.size()) {
        results.get("key").replace(j.identifier(replacement));
        results.get().node.shorthand = false;
        return true;
      }
    };

    /*
    <Component {...{}} />
    */
    const JSXSpreadAttributeObjectReplacement = (message) => {
      let didUpdate = false;
      const objectExpressions = message.find(j.JSXSpreadAttribute, {
        argument: {
          type: "ObjectExpression",
        },
      });
      objectExpressions.forEach((path) => {
        const attribute = j(path);
        const result =
          ObjectExpressionsLiteralReplacement(attribute) ||
          ObjectExpressionsIdentifierReplacement(attribute);
        didUpdate = didUpdate ? true : result;
      });
      return didUpdate;
    };

    /*
     * <Component {...props} />
     */
    const JSXSpreadAttributeIdentifierReplacement = (message) => {
      let didUpdate = false;
      const identifiers = message.find(j.JSXSpreadAttribute, {
        argument: {
          type: "Identifier",
        },
      });
      identifiers.forEach((path) => {
        const attribute = j(path);
        const expressionName = attribute.get("argument", "name").value;
        const declarationScope = attribute.findDeclarationScope(expressionName);
        const declaration = j(declarationScope.path)
          .find(j.VariableDeclarator, {
            id: {
              type: "Identifier",
              name: expressionName,
            },
            init: {
              type: "ObjectExpression",
            },
          })
          .filter((path) => path.scope === declarationScope);

        const results = declaration.find(j.Property, {
          kind: "init",
          key: { name: old },
        });

        if (results.size()) {
          results.get("key").replace(j.identifier(replacement));
          didUpdate = true;
        }
      });
      return didUpdate;
    };

    const root = j(fileInfo.source);

    const messages = root.findJSXElementsByImport(path);

    if (messages.size() === 0) {
      // If the component is not imported, skip this file
      return;
    }

    messages.forEach((path) => {
      const message = j(path);
      didReplacement =
        JSXAttributeReplacement(message) ||
        JSXSpreadAttributeIdentifierReplacement(message) ||
        JSXSpreadAttributeObjectReplacement(message);
    });

    if (didReplacement) {
      return root.toSource();
    }
  };
};
