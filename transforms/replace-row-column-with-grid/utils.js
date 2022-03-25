export function getPropertyFromDeclarationScope(j, element, attributeName, propName) {
  const propObject = j(element).findVariableDeclaration(attributeName, {
    type: "ObjectExpression",
  });

  const esprimaProperty = propObject
    .find(j.Property, {
      kind: "init",
      key: { name: propName },
    });

  const babelParserProperty = propObject
    .find(j.ObjectProperty, {
      key: { name: propName },
    });

  if (esprimaProperty.length) {
    return esprimaProperty;
  } else if (babelParserProperty.length) {
    return babelParserProperty;
  }

  return undefined;
}

export function isLiteral(type) {
  return type === "Literal" || type === "StringLiteral" || type === "NumericLiteral";
}

export function replaceLiteralExpressionAssignments(
  j,
  node,
  propName,
  replacementMethod
) {
  const variableDeclaration = getVariableDeclarationWithLiteralValue(j, node, propName);

  if (variableDeclaration) {
    variableDeclaration
      .get("init", "value")
      .replace(
        replacementMethod(variableDeclaration.get("init", "value").value)
      );

    const literalExpressionAssignments = getLiteralExpressionAssignments(
      j,
      node,
      propName
    );

    if (!literalExpressionAssignments) {
      return;
    }

    literalExpressionAssignments.forEach((nodePath) => {
      nodePath
        .get("right")
        .replace(j.literal(replacementMethod(nodePath.value.right.value)));
    });
  }
}

export function replaceKey(j, element, newKey) {
  element.get("key").replace(j.identifier(newKey));
}

export function replaceValue(j, property, newIdentifier, convertMethod) {
  const propValue = property.get("value");
  const valueType = propValue.get("type").value;

  if (isLiteral(valueType)) {
    const literalValue = propValue.get("value").value;
    propValue.replace(j.literal(convertMethod(literalValue)));
  } else if (valueType === "Identifier") {
    if (property.get("shorthand").value) {
      property.replace(
        j.property(
          "init",
          j.literal(property.get("key", "name").value),
          j.identifier(newIdentifier)
        )
      );
    } else {
      propValue.replace(j.identifier(newIdentifier));
    }
  }
}

export function getSpreadObjectProperty(j, spreadObject, propertyName) {
  const esprimaProperty = j(spreadObject)
    .find(j.Property, {
      kind: "init",
      key: { name: propertyName },
    });

  const babelParserProperty = j(spreadObject)
    .find(j.ObjectProperty, {
      key: { name: propertyName },
    });

  if (esprimaProperty.length) {
    return esprimaProperty;
  } else if (babelParserProperty.length) {
    return babelParserProperty;
  }

  return undefined;
}

function getLiteralExpressionAssignments(j, element, attributeName) {
  const declarationScope = j(element).findDeclarationScope(attributeName);

  const assignmnetExpressions = ["Literal", "StringLiteral", "NumericLiteral"].reduce((acc, type) => {
    const expressions = j(declarationScope.path).find(j.AssignmentExpression, {
      left: {
        name: attributeName,
      },
      right: {
        type,
      },
    });

    return expressions.length ? expressions : acc;
  }, undefined);

  return assignmnetExpressions;
}

function getVariableDeclarationWithLiteralValue(j, node, propName) {
  const withLiteralValue = ["Literal", "StringLiteral", "NumericLiteral"].reduce((acc, type) => {
    const variableDeclaration = j(node).findVariableDeclaration(propName, {
      type,
    });

    return variableDeclaration.length ? variableDeclaration : acc;
  }, undefined);

  return withLiteralValue;
}