import { getSpreadObjectProperty, isLiteral, replaceKey } from "./utils";

const names = {
  columnAlignProp: "columnAlign",
  justifySelfProp: "justifySelf",
};

export function replaceColumnAlignWithJustifySelf(j, columnNode) {
  const spreadAttributes = j(columnNode).find(j.JSXSpreadAttribute);

  if (spreadAttributes.size()) {
    spreadAttributes.forEach((spreadObject) => {
      const columnAlignProperty = getSpreadObjectProperty(j, spreadObject, names.columnAlignProp);

      if (!columnAlignProperty) {
        return;
      }

      const typeOfSpreadAttributeObject = spreadObject.get(
        "argument",
        "type"
      ).value;

      if (typeOfSpreadAttributeObject === "ObjectExpression") {
        if (columnAlignProperty.length) {
          const columnAlignValue = columnAlignProperty.get(
            "value",
            "value"
          ).value;

          replaceKey(j, columnAlignProperty, names.justifySelfProp);
          columnAlignProperty
            .get("value")
            .replace(
              j.literal(convertColumnAlignToJustifySelf(columnAlignValue))
            );
        }
      }
    });
  }

  const columnAlignAttr = j(columnNode).findJSXAttribute(names.columnAlignProp);

  if (columnAlignAttr.length) {
    const columnAlignValue = columnAlignAttr.get("value", "value").value;
    const columnAlignValueType = columnAlignAttr.get("value", "type").value;

    columnAlignAttr.get("name").replace(names.justifySelfProp);

    if (isLiteral(columnAlignValueType)) {
      columnAlignAttr
        .get("value")
        .replace(j.literal(convertColumnAlignToJustifySelf(columnAlignValue)));
    } else {
      const expressionType = columnAlignAttr.get(
        "value",
        "expression",
        "type"
      ).value;

      if (isLiteral(expressionType)) {
        const columnAlignExpressionLiteralValue = columnAlignAttr.get(
          "value",
          "expression",
          "value"
        ).value;

        columnAlignAttr.get("value").replace(
          j.literal(convertColumnAlignToJustifySelf(columnAlignExpressionLiteralValue))
        );
      }
    }
  }
}

function convertColumnAlignToJustifySelf(columnAlign) {
  switch (columnAlign) {
    case "left":
      return "start";
    case "right":
      return "end";
    case "center":
    case "middle":
      return "center";
    default:
      return undefined;
  }
}
