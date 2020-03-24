/**
 * Convert all <Button as="primary"/> to <Button buttonType="primary" />
 */
import registerMethods from "../registerMethods";

function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  registerMethods(j);

  /*
  <Button {...{{as: 'primary'}}} />
  */
  const ObjectExpressionsLiteralReplacement = attribute => {
    const results = attribute.find(j.Property, {
      kind: "init",
      key: { name: "as" }
    });

    if (results.size()) {
      results.replaceWith(
        j.property(
          "init",
          j.identifier("buttonType"),
          results.get("value").value
        )
      );
      return true;
    }
  };

  /*
  <Button {...{}} />
  */
  const JSXSpreadAttributeObjectReplacement = button => {
    let didUpdate = false;
    const objectExpressions = button.find(j.JSXSpreadAttribute, {
      argument: {
        type: "ObjectExpression"
      }
    });
    objectExpressions.forEach(path => {
      const attribute = j(path);
      const result = ObjectExpressionsLiteralReplacement(attribute);
      didUpdate = didUpdate ? true : result;
    });
    return didUpdate;
  };

  /*
  <Button {...props} />
  */
  const JSXSpreadAttributeIdentifierReplacement = button => {
    let didUpdate = false;
    const identifiers = button.find(j.JSXSpreadAttribute, {
      argument: {
        type: "Identifier"
      }
    });
    identifiers.forEach(path => {
      const attribute = j(path);
      const expressionName = attribute.get("argument", "name").value;
      const declarationScope = attribute.findDeclarationScope(expressionName);
      const declaration = j(declarationScope.path)
        .find(j.VariableDeclarator, {
          id: {
            type: "Identifier",
            name: expressionName
          },
          init: {
            type: "ObjectExpression"
          }
        })
        .filter(path => path.scope === declarationScope);

      const result = ObjectExpressionsLiteralReplacement(declaration);
      didUpdate = didUpdate ? true : result;
    });
    return didUpdate;
  };

  /*
  <Button as= />
  */
  const JSXAttributeReplacement = button => {
    const typeAttributes = button.find(j.JSXAttribute, {
      name: {
        name: "as"
      }
    });

    if (!typeAttributes.size()) {
      return false;
    }

    // Remove all but the last as prop
    // e.g. <Button as="primary" as="secondary" />
    typeAttributes.trimLeft();

    const attribute = typeAttributes.last();

    attribute.replaceWith(
      j.jsxAttribute(
        j.jsxIdentifier("buttonType"),
        attribute.get("value").value
      )
    );

    return true;
  };

  const root = j(fileInfo.source);

  const buttons = root.findJSXElementsByImport(
    "carbon-react/lib/components/button"
  );

  if (buttons.size() === 0) {
    // If the Component is not imported, skip this file
    return;
  }

  let didUpdateFile = false;

  buttons.forEach(path => {
    const button = j(path);
    const didAttributeReplacement = JSXAttributeReplacement(button);
    const didSpreadAttributeReplacement = JSXSpreadAttributeIdentifierReplacement(
      button
    );
    const didSpreadObjectReplacement = JSXSpreadAttributeObjectReplacement(
      button
    );
    let didUpdateButton =
      didAttributeReplacement ||
      didSpreadAttributeReplacement ||
      didSpreadObjectReplacement;
    didUpdateFile = didUpdateFile ? true : didUpdateButton;
  });

  if (didUpdateFile) {
    return root.toSource();
  }
}

module.exports = transformer;
