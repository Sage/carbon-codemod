/**
 * Convert all <Button buttonType="destructive"/> to <Button buttonType="primary" destructive />
 */
import registerMethods from "../registerMethods";

function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  registerMethods(j);

  const addDestructiveProp = attribute => {
    attribute.insertAfter(j.jsxIdentifier("destructive"));
  };

  /*
  <Button buttonType="destructive" />
  */
  const LiteralReplacement = attribute => {
    if (attribute.find(j.Literal, { value: "destructive" }).size()) {
      attribute.replaceWith(
        j.jsxAttribute(j.jsxIdentifier("buttonType"), j.literal("primary"))
      );
      addDestructiveProp(attribute);
      return true;
    }
  };

  /*
  const buttonType = "destructive";
  export default () => <Button buttonType={buttonType} />;
  */
  const JSXExpressionVariableReplacement = IdentifierExpression => {
    const result = IdentifierExpression.findVariableDeclaration(
      IdentifierExpression.get("expression").value.name,
      {
        type: "Literal",
        value: "destructive"
      }
    );
    if (result.size()) {
      result.get("init").replace(j.literal("primary"));
      return true;
    }
  };

  /*
  export const one = (buttonType = "destructive") => {
    return <Button buttonType={buttonType} />;
  }
  */
  const JSXExpressionAssignmentReplacement = IdentifierExpression => {
    const result = IdentifierExpression.findAssignmentPattern({
      type: "Literal",
      value: "destructive"
    });
    if (result.size()) {
      result.get("right").replace(j.literal("primary"));
      return true;
    }
  };

  /*
  <Button buttonType={buttonType}/>
  */
  const JSXExpressionReplacement = attribute => {
    const IdentifierExpression = attribute.find(j.JSXExpressionContainer, {
      expression: { type: "Identifier" }
    });
    if (IdentifierExpression.size() === 0) {
      return false;
    }

    const didUpdate =
      JSXExpressionVariableReplacement(IdentifierExpression) ||
      JSXExpressionAssignmentReplacement(IdentifierExpression);

    if (didUpdate) {
      addDestructiveProp(attribute);
    }

    return didUpdate;
  };

  /*
  <Button {...{{buttonType: 'destructive'}}} />
  */
  const ObjectExpressionsLiteralReplacement = attribute => {
    const results = attribute.find(j.Property, {
      kind: "init",
      key: { name: "buttonType" },
      value: { value: "destructive" }
    });

    if (results.size()) {
      results.replaceWith(
        j.property("init", j.identifier("buttonType"), j.literal("primary"))
      );

      results.insertAfter(
        j.property.from({
          kind: "init",
          key: j.identifier("destructive"),
          value: j.identifier("destructive"),
          shorthand: true
        })
      );
      return true;
    }
  };

  /*
  <Button {...{buttonType}} />
  <Button {...{buttonType: buttonType}} />
  */
  const ObjectExpressionsIdentifierReplacement = argument => {
    const results = argument.find(j.Property, {
      kind: "init",
      key: { name: "buttonType" },
      value: { type: "Identifier" }
    });

    if (results.size()) {
      const literals = results.findVariableDeclaration(
        results.get("value").value.name,
        {
          type: "Literal",
          value: "destructive"
        }
      );

      if (literals.size()) {
        literals.get("init").replace(j.literal("primary"));

        results.insertAfter(
          j.property.from({
            kind: "init",
            key: j.identifier("destructive"),
            value: j.identifier("destructive"),
            shorthand: true
          })
        );
        return true;
      }
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
      const result =
        ObjectExpressionsLiteralReplacement(attribute) ||
        ObjectExpressionsIdentifierReplacement(attribute);
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

      const results = declaration.find(j.Property, {
        kind: "init",
        key: { name: "buttonType" },
        value: { value: "destructive" }
      });

      if (results.size()) {
        results.replaceWith(
          j.property("init", j.identifier("buttonType"), j.literal("primary"))
        );

        results.insertAfter(
          j.property.from({
            kind: "init",
            key: j.identifier("destructive"),
            value: j.identifier("destructive"),
            shorthand: true
          })
        );
        didUpdate = true;
      }
    });
    return didUpdate;
  };
  /*
  <Button buttonType= />
  */
  const JSXAttributeReplacement = button => {
    const typeAttributes = button.find(j.JSXAttribute, {
      name: {
        type: "JSXIdentifier",
        name: "buttonType"
      }
    });

    // Remove all but the last buttonType prop
    // e.g. <Button buttonType="primary" buttonType="secondary" />
    typeAttributes.trimLeft();

    const attribute = typeAttributes.last();
    return LiteralReplacement(attribute) || JSXExpressionReplacement(attribute);
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
