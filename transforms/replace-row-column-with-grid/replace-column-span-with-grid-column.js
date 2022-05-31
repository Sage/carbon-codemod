import { getSpreadObjectProperty, isLiteral, replaceKey } from "./utils";

const names = {
  columnSpanProp: "columnSpan",
  columnOffsetProp: "columnOffset",
  gridColumnProp: "gridColumn",
};

export function replaceColumnSpanWithGridColumn(j, columnNode) {
  const columnSpanAttr = j(columnNode).findJSXAttribute(names.columnSpanProp);
  const columnOffsetAttr = j(columnNode).findJSXAttribute(
    names.columnOffsetProp
  );
  const spreadAttributes = j(columnNode).find(j.JSXSpreadAttribute);
  let offset;

  if (columnOffsetAttr.length) {
    offset = getColumnOffsetLiteralValue(columnOffsetAttr);
    columnOffsetAttr.remove();
  }

  if (columnSpanAttr.length) {
    const offsetPart = offset ? `${offset} / ` : "";
    const columnSpanValue = columnSpanAttr.get("value", "value").value;
    const columnSpanValueType = columnSpanAttr.get("value", "type").value;

    columnSpanAttr.get("name").replace(names.gridColumnProp);

    if (isLiteral(columnSpanValueType)) {
      columnSpanAttr
        .get("value")
        .replace(
          j.literal(
            `${offsetPart}span ${columnSpanValue}`
          )
        );
    } else if (columnSpanValueType === "JSXExpressionContainer") {
      const columnSpanExpression = columnSpanAttr.get("value", "expression");

      if (isLiteral(columnSpanExpression.get("type").value)) {
        columnSpanAttr
          .get("value")
          .replace(
            j.literal(
              `${offsetPart}span ${columnSpanExpression.get("value").value}`
            )
          );
      }
    }
  }

  if (spreadAttributes.size()) {
    spreadAttributes.forEach((spreadObject) => {
      convertSpreadObjectValues(j, spreadObject);
    });
  }
}

function convertSpreadObjectValues(j, spreadObject) {
  const columnSpanProperty = getSpreadObjectProperty(j, spreadObject, names.columnSpanProp);
  const columnOffsetAttr = getSpreadObjectProperty(j, spreadObject, names.columnOffsetProp);

  const typeOfSpreadAttributeObject = spreadObject.get(
    "argument",
    "type"
  ).value;

  if (typeOfSpreadAttributeObject === "ObjectExpression") {
    let offset;

    if (columnOffsetAttr) {
      offset = getColumnOffsetLiteralValue(columnOffsetAttr);
      columnOffsetAttr.remove();
    }

    const offsetPart = offset ? `${offset} / ` : "";

    if (columnSpanProperty) {
      const columnSpanPropertyType = columnSpanProperty.get("value", "type").value;

      if (isLiteral(columnSpanPropertyType)) {
        const columnSpanValue = columnSpanProperty.get("value", "value").value;

        replaceKey(j, columnSpanProperty, names.gridColumnProp);
        columnSpanProperty
          .get("value")
          .replace(j.literal(`${offsetPart}span ${columnSpanValue}`));
      }
    }
  }
}

function getColumnOffsetLiteralValue(columnOffsetAttr) {
  const columnOffsetValue = columnOffsetAttr.get("value", "value").value;
  const columnOffsetValueType = columnOffsetAttr.get("value", "type").value;

  if (isLiteral(columnOffsetValueType)) {
    return Number(columnOffsetValue) + 1;
  } else if (columnOffsetValueType === "JSXExpressionContainer") {
    const columnOffsetExpression = columnOffsetAttr.get("value", "expression");

    if (isLiteral(columnOffsetExpression.get("type").value)) {
      return Number(columnOffsetExpression.get("value").value) + 1;
    }
  }
}
