import {
  findJSXAttribute,
  findObjectExpressionsLiteral,
  findObjectExpressionsIdentifier,
} from "../builder/finder";
import registerMethods from "../registerMethods";

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const names = {
    collapsedProp: "collapsed",
    expandedProp: "expanded",
    podComponent: "Pod",
    accordionComponent: "Accordion",
    typographyComponent: "Typography",
    descriptionProp: "description",
  };
  let podNodes = root.findJSXElements(names.podComponent);

  registerMethods(j);

  if (
    !podNodes
      .paths()
      .some((podNode) => hasDescriptionProp(podNode, names.descriptionProp))
  ) {
    return;
  }

  addTypographyImport(j, root);

  podNodes.forEach((podNode) => {
    if (!hasDescriptionProp(podNode)) {
      return;
    }
    let accordionNode = j(podNode).findJSXElements(names.accordionComponent);

    let descriptionContent;

    // JSX Attribute Props
    let descriptionJSXAttributeProp = findJSXAttribute(
      j,
      j(podNode),
      names.descriptionProp
    );

    if (descriptionJSXAttributeProp.size()) {
      descriptionContent = getDescriptionContent(descriptionJSXAttributeProp);
      descriptionJSXAttributeProp.remove();
    }

    // spread props
    const spreadAttributeObject = j(podNode).find(j.JSXSpreadAttribute);

    if (spreadAttributeObject.size()) {
      const typeOfSpreadAttributeObject = spreadAttributeObject.get(
        "argument",
        "type"
      ).value;

      if (typeOfSpreadAttributeObject === "Identifier") {
        // props spread from an object in declaration scope
        spreadAttributeObject.forEach((attr) => {
          const descriptionInDeclarationScope = getPropertyFromDeclarationScope(
            podNode,
            attr.value,
            names.descriptionProp
          );

          if (descriptionInDeclarationScope.size()) {
            descriptionContent = getDescriptionContent(
              descriptionInDeclarationScope
            );
            descriptionInDeclarationScope.remove();
          }
        });
      } else {
        const descriptionAsObjectProp = findObjectExpressionsLiteral(
          j,
          spreadAttributeObject,
          names.descriptionProp
        );

        if (descriptionAsObjectProp.size()) {
          descriptionContent = getDescriptionContent(descriptionAsObjectProp);
          descriptionAsObjectProp.remove();
        }

        const descriptionAsShorthandProp = findObjectExpressionsIdentifier(
          j,
          spreadAttributeObject,
          names.descriptionProp
        );

        if (descriptionAsShorthandProp.size()) {
          descriptionContent = getDescriptionContent(
            descriptionAsShorthandProp
          );
          descriptionAsShorthandProp.remove();
        }
      }
    }

    const descriptionOpeningTag = getDescriptionOpeningTag();
    const descriptionClosingTag = j.jsxClosingElement(
      j.jsxIdentifier(names.typographyComponent)
    );

    if (accordionNode.size()) {
      accordionNode.paths()[0].value.children = [
        descriptionOpeningTag,
        descriptionContent,
        descriptionClosingTag,
        ...accordionNode.paths()[0].value.children,
      ];
    } else {
      podNode.node.children = [
        descriptionOpeningTag,
        descriptionContent,
        descriptionClosingTag,
        ...podNode.value.children,
      ];
    }
  });

  function addTypographyImport(j, root) {
    let typographyImport = root.find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: "carbon-react/lib/components/typography",
      },
    });
    const podImport = root.find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: "carbon-react/lib/components/pod",
      },
    });

    if (typographyImport.size()) {
      return;
    }

    typographyImport = j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier(names.typographyComponent))],
      j.stringLiteral("carbon-react/lib/components/typography")
    );

    podImport.insertAfter(typographyImport);
  }

  function getDescriptionOpeningTag() {
    return j.jsxOpeningElement(j.jsxIdentifier(names.typographyComponent), [
      j.jsxAttribute(
        j.jsxIdentifier("data-element"),
        j.stringLiteral("description")
      ),
      j.jsxAttribute(j.jsxIdentifier("as"), j.stringLiteral("div")),
      j.jsxAttribute(j.jsxIdentifier("fontSize"), j.stringLiteral("13px")),
      j.jsxAttribute(j.jsxIdentifier("lineHeight"), j.stringLiteral("normal")),
    ]);
  }

  function getDescriptionContent(descriptionJSXAttributeProp) {
    const propValue = descriptionJSXAttributeProp.get("value").value;
    const isValueLiteral = propValue.type === "Literal";

    if (propValue && propValue.type === "Identifier") {
      return j.jsxExpressionContainer(j.jsxIdentifier(propValue.name));
    }

    return isValueLiteral
      ? j.stringLiteral(propValue.value)
      : j.jsxExpressionContainer(j.jsxIdentifier(propValue.expression.name));
  }

  function hasDescriptionProp(element) {
    return element.node.openingElement.attributes.some((attr) => {
      if (attr.type === "JSXSpreadAttribute") {
        if (attr.argument.type === "ObjectExpression") {
          return (
            j(attr)
              .find(j.Property, {
                kind: "init",
                key: { name: names.descriptionProp },
              })
              .size() > 0
          );
        }

        const property = getPropertyFromDeclarationScope(
          element,
          attr,
          names.descriptionProp
        );

        return property.size() > 0;
      }

      return attr.name.name === names.descriptionProp;
    });
  }

  function getPropertyFromDeclarationScope(element, attribute, propName) {
    const attributeName = attribute.argument.name;

    const declarationScope = j(element).findDeclarationScope(attributeName);
    const propObject = j(declarationScope.path).find(j.VariableDeclarator, {
      id: {
        type: "Identifier",
        name: attributeName,
      },
    });

    return propObject.find(j.Property, {
      kind: "init",
      key: { name: propName },
    });
  }

  return root.toSource();
}
