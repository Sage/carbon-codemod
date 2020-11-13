/**
 * Rename a component prop
 * @param {string} path the component import path
 * @param {string} prop prop name to operate on
 * @param {string} replacement new prop name
 */

/*
 * <Component prop="" />
 */
export const findJSXAttribute = (j, component, prop) =>
  component.find(j.JSXAttribute, {
    name: {
      type: "JSXIdentifier",
      name: prop,
    },
  });

/*
 * <Component {...{prop: 'info'}} />
 * <Component {...{prop: prop}} />
 */
export const findObjectExpressionsLiteral = (j, attribute, prop) =>
  attribute.find(j.Property, {
    kind: "init",
    key: { name: prop },
    shorthand: false,
  });

/*
 * <Component {...{prop}} />
 */
export const findObjectExpressionsIdentifier = (j, argument, prop) =>
  argument.find(j.Property, {
    kind: "init",
    key: { name: prop },
    shorthand: true,
  });

/*
 *   <Component {...{}} />
 */
export const findJSXSpreadAttributeObject = (j, component) =>
  component.find(j.JSXSpreadAttribute, {
    argument: {
      type: "ObjectExpression",
    },
  });

const finder = (
  path,
  prop,
  {
    JSXAttributeReplacement: JSXAttributeReplacementFn,
    ObjectExpressionsLiteralReplacement: ObjectExpressionsLiteralReplacementFn,
    ObjectExpressionsIdentifierReplacement: ObjectExpressionsIdentifierReplacementFn,
    JSXSpreadAttributeIdentifierReplacement: JSXSpreadAttributeIdentifierReplacementFn,
  }
) => (fileInfo, api, options, j, root) => {
  /*
   * <Component prop="" />
   */
  const JSXAttributeReplacement = (component) => {
    const attributes = findJSXAttribute(j, component, prop);

    if (attributes.size()) {
      return JSXAttributeReplacementFn(attributes, j);
    }
  };

  /*
   * <Component {...{prop: 'info'}} />
   * <Component {...{prop: prop}} />
   */
  const ObjectExpressionsLiteralReplacement = (attribute) => {
    const results = findObjectExpressionsLiteral(j, attribute, prop);

    if (results.size()) {
      return ObjectExpressionsLiteralReplacementFn(results, j);
    }
  };

  /*
   * <Component {...{prop}} />
   */
  const ObjectExpressionsIdentifierReplacement = (argument) => {
    const results = findObjectExpressionsIdentifier(j, argument, prop);

    if (results.size()) {
      return ObjectExpressionsIdentifierReplacementFn(results, j);
    }
  };

  /*
  <Component {...{}} />
  */
  const JSXSpreadAttributeObjectReplacement = (component) => {
    let didUpdate = false;

    const objectExpressions = findJSXSpreadAttributeObject(j, component);

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
      if (!declarationScope) {
        return;
      }
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
        key: { name: prop },
      });

      if (results.size()) {
        didUpdate = JSXSpreadAttributeIdentifierReplacementFn(results, j);
      }
    });
    return didUpdate;
  };

  const components = root.findJSXElementsByImport(path);

  if (components.size() === 0) {
    // If the component is not imported, skip this file
    return;
  }

  return components.paths().reduce((didReplacement, path) => {
    const component = j(path);
    // Ensure that we run all possible combinations in case an attribute is defined more than once
    const result = [
      JSXAttributeReplacement(component),
      JSXSpreadAttributeIdentifierReplacement(component),
      JSXSpreadAttributeObjectReplacement(component),
    ].reduce((acc, cur) => {
      return acc || cur;
    }, false);

    return didReplacement || result;
  }, false);
};

export default finder;
