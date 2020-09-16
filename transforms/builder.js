import registerMethods from "./registerMethods";

const run = (...transformers) => {
  return function transformer(fileInfo, api, options) {
    let didReplacement = false;
    const j = api.jscodeshift;
    registerMethods(j);
    const root = j(fileInfo.source);

    transformers.forEach((transformer) => {
      const result = transformer(fileInfo, api, options, j, root);
      didReplacement = didReplacement || result;
    });

    if (didReplacement) {
      return root.toSource();
    }
  };
};

/**
 * Rename a component prop
 * @param {string} path the component import path
 * @param {string} old prop name to replace
 * @param {string} replacement new prop name
 */
const renameAttribute = (path, old, replacement) => (
  fileInfo,
  api,
  options,
  j,
  root
) => {
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

    if (replacement) {
      attributes.forEach((nodePath) => {
        nodePath.node.name = replacement;
        didReplacement = true;
      });
    } else if (attributes.size()) {
      attributes.remove();
      didReplacement = true;
    }

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
      if (replacement) {
        results.get("key").replace(j.identifier(replacement));
      } else {
        results.remove();
      }
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
      if (replacement) {
        results.get("key").replace(j.identifier(replacement));
        results.get().node.shorthand = false;
      } else {
        results.remove();
      }
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
        if (replacement) {
          results.get("key").replace(j.identifier(replacement));
        } else {
          results.remove();
        }
        didUpdate = true;
      }
    });
    return didUpdate;
  };

  const messages = root.findJSXElementsByImport(path);

  if (messages.size() === 0) {
    // If the component is not imported, skip this file
    return;
  }

  return messages.paths().reduce((didReplacement, path) => {
    const message = j(path);
    // Ensure that we run all possible combinations in case an attribute is defined more than once
    const result = [
      JSXAttributeReplacement(message),
      JSXSpreadAttributeIdentifierReplacement(message),
      JSXSpreadAttributeObjectReplacement(message),
    ].reduce((acc, cur) => {
      return acc || cur;
    }, false);

    return didReplacement || result;
  }, false);
};

const removeAttribute = (path, attribute) => renameAttribute(path, attribute);

module.exports = {
  run,
  renameAttribute,
  removeAttribute,
};
