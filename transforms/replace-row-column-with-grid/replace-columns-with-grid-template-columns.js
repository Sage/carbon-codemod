import {
  getPropertyFromDeclarationScope,
  getSpreadObjectProperty,
  isLiteral,
  replaceKey,
  replaceLiteralExpressionAssignments,
  replaceValue,
} from "./utils";

const names = {
  columnsProp: "columns",
  gridTemplateColumnsProp: "gridTemplateColumns",
};

export function replaceColumnsWithGridTemplateColumns(j, rowNode) {
  const spreadAttributeObjects = j(rowNode.node.openingElement).find(
    j.JSXSpreadAttribute
  );

  if (spreadAttributeObjects.size()) {
    // prop spread
    spreadAttributeObjects.forEach((spreadObject) => {
      const typeOfSpreadAttributeObject = spreadObject.get(
        "argument",
        "type"
      ).value;

      if (typeOfSpreadAttributeObject === "Identifier") {
        // props spread from an object in declaration scope e.g.: <Component {...props}>
        const columnsInDeclarationScope = getPropertyFromDeclarationScope(
          j,
          rowNode,
          spreadObject.value.argument.name,
          names.columnsProp
        );

        if (columnsInDeclarationScope) {
          const columnsInDeclarationScopeValueType =
            columnsInDeclarationScope.get("value", "type").value;

          if (isLiteral(columnsInDeclarationScopeValueType)) {
            // replace literal value in declaration scope e.g.: columns: 7 -> gridTemplateColumns: "repeat(7, 1fr)"
            replaceValue(
              j,
              columnsInDeclarationScope,
              names.columnsProp,
              getGridTemplateColumns
            );
            replaceKey(
              j,
              columnsInDeclarationScope,
              names.gridTemplateColumnsProp
            );
          } else if (columnsInDeclarationScopeValueType === "Identifier") {
            columnsInDeclarationScope
              .get("value")
              .replace(
                getGridTemplateQuasis(
                  j,
                  columnsInDeclarationScope.get("value").value
                )
              );
            replaceKey(
              j,
              columnsInDeclarationScope,
              names.gridTemplateColumnsProp
            );
          }
        }
      } else if (typeOfSpreadAttributeObject === "ObjectExpression") {
        // props spread in the opening element e.g.: <Row {...{columns: 7}}>
        const columnsProperty = getSpreadObjectProperty(j, spreadObject, names.columnsProp);

        if (!columnsProperty) {
          return;
        }

        const coumnsPropertyValueType = columnsProperty.get(
          "value",
          "type"
        ).value;

        replaceKey(j, columnsProperty.get(), names.gridTemplateColumnsProp);

        if (isLiteral(coumnsPropertyValueType)) {
          columnsProperty
            .get("value")
            .replace(
              j.literal(
                getGridTemplateColumns(
                  columnsProperty.get("value", "value").value
                )
              )
            );
        } else if (coumnsPropertyValueType === "Identifier") {
          if (columnsProperty.get("shorthand").value) {
            replaceShorthandProp(j, columnsProperty, names.gridTemplateColumnsProp);
          } else {
            columnsProperty
              .get("value")
              .replace(
                getGridTemplateQuasis(j, columnsProperty.get("value").value)
              );
          }
        }
      }
    });
  }

  const columnsAttr = j(rowNode).findJSXAttribute(names.columnsProp);

  if (columnsAttr.length) {
    const columnsValue = columnsAttr.get("value");

    columnsAttr.get("name").replace(names.gridTemplateColumnsProp);

    if (isLiteral(columnsValue.value.type)) {
      // replace literal value in a JSX node e.g.: <Row columns="7">
      columnsValue.replace(
        j.literal(getGridTemplateColumns(columnsValue.value.value))
      );
    } else if (columnsValue.value.type === "JSXExpressionContainer") {
      const expressionType = columnsAttr.get(
        "value",
        "expression",
        "type"
      ).value;

      if (isLiteral(expressionType)) {
        columnsValue.replace(
          j.literal(getGridTemplateColumns(columnsValue.value.expression.value))
        );
      } else {
        const expression = columnsAttr.get("value", "expression");
        const templateLiteral = getGridTemplateQuasis(j, expression.value);

        expression.replace(templateLiteral);
      }
    } else {
      // replace literal values in declaration scope
      const expressionName = columnsValue.value.expression.name;

      replaceLiteralExpressionAssignments(
        j,
        rowNode,
        expressionName,
        getGridTemplateColumns
      );
    }
  }
}

function getGridTemplateColumns(columns) {
  return `repeat(${columns}, 1fr)`;
}

function getGridTemplateQuasis(j, propValue) {
  const gridTemplateQuasis = j.templateLiteral(
    [
      j.templateElement({ cooked: "repeat(", raw: "repeat(" }, false),
      j.templateElement({ cooked: ", 1fr)", raw: ", 1fr)" }, true),
    ],
    [propValue]
  );

  return gridTemplateQuasis;
}

function replaceShorthandProp(j, shorthandProp, newValue) {
  const shorthandPropType = shorthandProp.get("type").value;

  if (shorthandPropType === "Property") {
    shorthandProp
      .get()
      .replace(
        j.property(
          "init",
          j.identifier(newValue),
          getGridTemplateQuasis(j, shorthandProp.get("value").value)
        )
      );
  }

  if (shorthandPropType === "ObjectProperty") {
    shorthandProp
      .get()
      .replace(
        j.objectProperty(
          j.identifier(newValue),
          getGridTemplateQuasis(j, shorthandProp.get("value").value)
        )
      );
  }
}