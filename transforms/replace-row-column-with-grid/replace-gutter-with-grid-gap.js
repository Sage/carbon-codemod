import {
  getPropertyFromDeclarationScope,
  getSpreadObjectProperty,
  isLiteral,
  replaceKey,
  replaceLiteralExpressionAssignments,
  replaceValue,
} from "./utils";

const names = {
  gutterProp: "gutter",
  gridGapProp: "gridGap",
};

export function replaceGutterWithGridGap(j, rowNode) {
  const spreadAttributeObjects = j(rowNode.node.openingElement).find(
    j.JSXSpreadAttribute
  );

  // gutter as a simple JSX Attribute, e.g.: gutter="medium"
  const gutterAttr = j(rowNode).findJSXAttribute(names.gutterProp);

  if (gutterAttr.length) {
    const gutterValue = gutterAttr.get("value");

    gutterAttr.get("name").replace(names.gridGapProp);

    if (isLiteral(gutterValue.value.type)) {
      // replace literal value in JSX node
      gutterValue.replace(
        j.literal(convertGutterToGridGap(gutterValue.value.value))
      );
    } else {
      // replace literal values in declaration scope
      const expressionType = gutterAttr.get(
        "value",
        "expression",
        "type"
      ).value;
      const expressionName = gutterValue.value.expression.name;

      if (isLiteral(expressionType)) {
        const gutterExpressionLiteralValue = gutterValue.get(
          "expression",
          "value"
        ).value;

        gutterValue.replace(
          j.literal(convertGutterToGridGap(gutterExpressionLiteralValue))
        );
      } else if (expressionType === "Identifier") {
        replaceLiteralExpressionAssignments(
          j,
          rowNode,
          expressionName,
          convertGutterToGridGap
        );
      }
    }
  }

  if (spreadAttributeObjects.size()) {
    // prop spread
    spreadAttributeObjects.forEach((spreadObject) => {
      convertSpreadObjectValues(j, spreadObject, rowNode);
    });
  }
}

function convertSpreadObjectValues(j, spreadObject, rowNode) {
  const typeOfSpreadAttributeObject = spreadObject.get(
    "argument",
    "type"
  ).value;

  if (typeOfSpreadAttributeObject === "Identifier") {
    // props spread from an object in declaration scope e.g.: <Row {...props}>
    const gutterInDeclarationScope = getPropertyFromDeclarationScope(
      j,
      rowNode,
      spreadObject.value.argument.name,
      names.gutterProp
    );

    if (gutterInDeclarationScope) {
      const gutterValueType = gutterInDeclarationScope.get(
        "value",
        "type"
      ).value;

      if (isLiteral(gutterValueType)) {
        // replace literal value in declaration scope e.g.: gutter: "medium" -> gridGap: "15px"
        replaceValue(
          j,
          gutterInDeclarationScope,
          names.gutterProp,
          convertGutterToGridGap
        );
        replaceKey(j, gutterInDeclarationScope, names.gridGapProp);
      } else if (gutterValueType === "Identifier") {
        replaceKey(j, gutterInDeclarationScope, names.gridGapProp);
      }
    }
  } else if (typeOfSpreadAttributeObject === "ObjectExpression") {
    // props spread in the opening element e.g.: <Row {...{gutter: "medium"}}>
    const gutterProperty = getSpreadObjectProperty(j, spreadObject, names.gutterProp);

    if (!gutterProperty) {
      return;
    }

    const gutterPropName = gutterProperty.get("value", "name").value;

    replaceValue(j, gutterProperty.get(), gutterPropName, convertGutterToGridGap);
    replaceKey(j, gutterProperty.get(), names.gridGapProp);

    if (gutterProperty.get("value", "type").value === "Identifier") {
      replaceLiteralExpressionAssignments(
        j,
        rowNode,
        gutterPropName,
        convertGutterToGridGap
      );
    }
  }
}

function convertGutterToGridGap(gutter) {
  switch (gutter) {
    case "extra-small":
      return "2px";
    case "small":
      return "5px";
    case "medium-small":
      return "10px";
    case "medium":
      return "15px";
    case "medium-large":
      return "30px";
    case "large":
      return "60px";
    case "extra-large":
      return "90px";
    case "none":
    default:
      return 0;
  }
}
