import registerMethods from "../registerMethods";
import { replaceColumnAlignWithJustifySelf } from "./replace-column-align-with-justify-self";
import { replaceColumnSpanWithGridColumn } from "./replace-column-span-with-grid-column";
import { replaceColumnsWithGridTemplateColumns } from "./replace-columns-with-grid-template-columns";
import { replaceGutterWithGridGap } from "./replace-gutter-with-grid-gap";
import { getSpreadObjectProperty } from "./utils";

const rowImportString = "carbon-react/lib/components/row";
const gridImportString = "carbon-react/lib/components/grid";

const names = {
  columnsProp: "columns",
  rowComponent: "Row",
  columnComponent: "Column",
  gridContainer: "GridContainer",
  gridItem: "GridItem",
};

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const rowImportDeclaration = root.find(j.ImportDeclaration, {
    source: {
      value: rowImportString,
    },
  });

  if (!rowImportDeclaration.size()) {
    return;
  }
  const hasRowImport =
    root
      .find(j.ImportSpecifier, {
        local: {
          name: "Row",
        },
      })
      .size() > 0;

  const hasColumnImport =
    root
      .find(j.ImportSpecifier, {
        local: {
          name: "Column",
        },
      })
      .size() > 0;

  registerMethods(j);
  replaceImports();
  replaceRowWithGridContainer();
  replaceColumnWithGridItem();

  // replace all non JSX instances, e.g.: component.toBe(Row) -> component.toBe(GridContainer)
  if (hasRowImport) {
    root
      .find(j.Identifier, {
        name: names.rowComponent,
      })
      .replaceWith(j.identifier(names.gridContainer));
  }

  if (hasColumnImport) {
    root
      .find(j.Identifier, {
        name: names.columnComponent,
      })
      .replaceWith(j.identifier(names.gridItem));
  }

  function replaceImports() {
    let gridImportDeclaration = root.find(j.ImportDeclaration, {
      source: {
        value: gridImportString,
      },
    });

    const hasGridContainerImport =
      root
        .find(j.ImportSpecifier, {
          local: {
            name: "GridContainer",
          },
        })
        .size() > 0;

    const hasGridItemImport =
      root
        .find(j.ImportSpecifier, {
          local: {
            name: "GridItem",
          },
        })
        .size() > 0;

    if (gridImportDeclaration.size()) {
      if (hasRowImport && !hasGridContainerImport) {
        gridImportDeclaration
          .get("specifiers")
          .value.push(j.importSpecifier(j.identifier(names.gridContainer)));
      } else if (hasColumnImport && !hasGridItemImport) {
        gridImportDeclaration
          .get("specifiers")
          .value.push(j.importSpecifier(j.identifier(names.gridItem)));
      }

      rowImportDeclaration.remove();
    } else {
      gridImportDeclaration = j.importDeclaration(
        [],
        j.stringLiteral(gridImportString)
      );

      if (hasRowImport) {
        gridImportDeclaration.specifiers.push(
          j.importSpecifier(j.identifier(names.gridContainer))
        );
      }

      if (hasColumnImport) {
        gridImportDeclaration.specifiers.push(
          j.importSpecifier(j.identifier(names.gridItem))
        );
      }

      rowImportDeclaration.replaceWith(gridImportDeclaration);

      if (rowImportDeclaration.size() > 1) {
        rowImportDeclaration
          .filter((importDeclaration, index) => {
            return index > 0;
          })
          .remove();
      }
    }
  }

  function replaceRowWithGridContainer() {
    let rowNodes = root.findJSXElements(names.rowComponent);

    rowNodes.forEach((rowNode) => {
      replaceGutterWithGridGap(j, rowNode);
      replaceColumnsWithGridTemplateColumns(j, rowNode);
      replaceJSXElementName(rowNode, names.gridContainer);
    });
  }

  function replaceColumnWithGridItem() {
    let columnNodes = root.findJSXElements(names.columnComponent);

    columnNodes.forEach((columnNode) => {
      replaceColumnSpanWithGridColumn(j, columnNode);
      replaceColumnAlignWithJustifySelf(j, columnNode);

      const spreadAttributes = j(columnNode).find(j.JSXSpreadAttribute);

      if (spreadAttributes.size()) {
        spreadAttributes.forEach((spreadObject) => {
          const columnsProperty = getSpreadObjectProperty(j, spreadObject, names.columnsProp);

          if (columnsProperty) {
          	columnsProperty.remove();
          }
        });
      }

      const columnsAttr = j(columnNode).findJSXAttribute(names.columnsProp);

      if (columnsAttr.length) {
        columnsAttr.remove();
      }

      replaceJSXElementName(columnNode, names.gridItem);
    });
  }

  function replaceJSXElementName(element, newName) {
    element.get("openingElement", "name").replace(j.jsxIdentifier(newName));

    if (element.get("closingElement").value) {
      element.get("closingElement", "name").replace(j.jsxIdentifier(newName));
    }
  }

  return root.toSource();
}
