import finder from "./finder";

/*
  <Component prop="value" />;
 */
const LiteralReplacement = (
  j,
  selectedAttribute,
  attribute,
  oldValue,
  newValue
) => {
  if (selectedAttribute.find(j.Literal, { value: oldValue }).size()) {
    let replacement = j.literal(newValue);
    if (typeof newValue !== "string") {
      replacement = j.jsxExpressionContainer(replacement);
    }

    selectedAttribute.replaceWith(
      j.jsxAttribute(j.jsxIdentifier(attribute), replacement)
    );
    return true;
  }
};

/*
  const value = "something";
  export default () => <Component prop={value} />;
  */
const JSXExpressionVariableReplacement = (
  j,
  IdentifierExpression,
  oldValue,
  newValue
) => {
  const result = IdentifierExpression.findVariableDeclaration(
    IdentifierExpression.get("expression").value.name,
    {
      type: "Literal",
      value: oldValue,
    }
  );
  if (result.size()) {
    result.get("init").replace(j.literal(newValue));
    return true;
  }
};

/*
export const one = (value = "something") => {
  return <Component prop={value} />;
}
*/
const JSXExpressionAssignmentReplacement = (
  j,
  IdentifierExpression,
  oldValue,
  newValue
) => {
  const result = IdentifierExpression.findAssignmentPattern({
    type: "Literal",
    value: oldValue,
  });
  if (result.size()) {
    result.get("right").replace(j.literal(newValue));
    return true;
  }
};

/*
<Component prop={value}/>
*/
const JSXExpressionReplacement = (j, attribute, oldValue, newValue) => {
  const IdentifierExpression = attribute.find(j.JSXExpressionContainer, {
    expression: { type: "Identifier" },
  });
  if (IdentifierExpression.size() === 0) {
    return false;
  }

  const didUpdate =
    JSXExpressionVariableReplacement(
      j,
      IdentifierExpression,
      oldValue,
      newValue
    ) ||
    JSXExpressionAssignmentReplacement(
      j,
      IdentifierExpression,
      oldValue,
      newValue
    );

  return didUpdate;
};

const replaceAttributeValue = (path, attribute, oldValue, newValue) =>
  finder(path, attribute, {
    JSXAttributeReplacement: (attributes, j) => {
      const selectedAttribute = attributes.last();

      let didUpdate =
        LiteralReplacement(
          j,
          selectedAttribute,
          attribute,
          oldValue,
          newValue
        ) || JSXExpressionReplacement(j, selectedAttribute, oldValue, newValue);
      return didUpdate;
    },

    ObjectExpressionsLiteralReplacement: (results, j) => {
      let didUpdate = false;
      const value = results.get("value");
      if (value.value.value === oldValue) {
        value.replace(j.literal(newValue));
        didUpdate = true;
      }
      return didUpdate;
    },

    ObjectExpressionsIdentifierReplacement: (results, j) => {
      let didUpdate = false;
      const value = results.get("value");
      if (value.value.value === oldValue) {
        value.replace(j.literal(newValue));
        didUpdate = true;
      }
      return didUpdate;
    },

    JSXSpreadAttributeIdentifierReplacement: (results, j) => {
      let didUpdate = false;
      const value = results.get("value");
      if (value.value.value === oldValue) {
        value.replace(j.literal(newValue));
        didUpdate = true;
      }
      return didUpdate;
    },
  });

export default replaceAttributeValue;
