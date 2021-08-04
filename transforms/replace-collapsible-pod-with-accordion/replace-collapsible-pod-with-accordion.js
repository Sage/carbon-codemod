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
    titleProp: "title",
    subtitleProp: "subtitle",
    expandedProp: "expanded",
    podComponent: "Pod",
    accordionComponent: "Accordion",
  };
  let podNodes = root.findJSXElements(names.podComponent);

  registerMethods(j);

  if (
    !podNodes
      .paths()
      .some((podNode) => hasCollapsedProp(podNode, names.collapsedProp))
  ) {
    return;
  }

  addAccordionImport(j, root);
  addAccordion(j, podNodes);

  function addAccordionImport(j, root) {
    let accordionImport = root.find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: "carbon-react/lib/components/accordion",
      },
    });
    const podImport = root.find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: "carbon-react/lib/components/pod",
      },
    });

    if (accordionImport.size()) {
      return;
    }

    accordionImport = j.importDeclaration(
      [j.importSpecifier(j.identifier(names.accordionComponent))],
      j.stringLiteral("carbon-react/lib/components/accordion")
    );

    podImport.insertAfter(accordionImport);
  }

  function addAccordion(j, podNodes) {
    podNodes.forEach((podNode) => {
      if (!hasCollapsedProp(podNode)) {
        return;
      }

      const accordionAttributes = [
        j.jsxAttribute(j.jsxIdentifier("borders"), j.stringLiteral("none")),
      ];

      // JSX Attribute Props
      let collapsedJSXAttributeProp = findJSXAttribute(
        j,
        j(podNode),
        names.collapsedProp
      );

      if (collapsedJSXAttributeProp.size()) {
        accordionAttributes.push(
          getExpandedAttribute(collapsedJSXAttributeProp)
        );
        collapsedJSXAttributeProp.remove();
      }

      const titleJSXAttributeProp = findJSXAttribute(
        j,
        j(podNode),
        names.titleProp
      );

      if (titleJSXAttributeProp.size()) {
        accordionAttributes.push(getTitleAttribute(titleJSXAttributeProp, names.titleProp));
        titleJSXAttributeProp.remove();
      }

      const subtitleJSXAttributeProp = findJSXAttribute(
        j,
        j(podNode),
        names.subtitleProp
      );

      if (subtitleJSXAttributeProp.size()) {
        accordionAttributes.push(getTitleAttribute(subtitleJSXAttributeProp, names.subtitleProp));
        subtitleJSXAttributeProp.remove();
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
            const collapsedInDeclarationScope = getPropertyFromDeclarationScope(
              podNode,
              attr.value,
              names.collapsedProp
            );

            if (collapsedInDeclarationScope.size()) {
              accordionAttributes.push(
                getExpandedAttribute(collapsedInDeclarationScope)
              );
              collapsedInDeclarationScope.remove();
            }

            const titleInDeclarationScope = getPropertyFromDeclarationScope(
              podNode,
              attr.value,
              names.titleProp
            );

            if (titleInDeclarationScope.size()) {
              accordionAttributes.push(getTitleAttribute(titleInDeclarationScope, names.titleProp));
              titleInDeclarationScope.remove();
            }

            const subtitleInDeclarationScope = getPropertyFromDeclarationScope(
              podNode,
              attr.value,
              names.subtitleProp
            );

            if (subtitleInDeclarationScope.size()) {
              accordionAttributes.push(getTitleAttribute(subtitleInDeclarationScope, names.subtitleProp));
              subtitleInDeclarationScope.remove();
            }
          });
        } else {
          // props spread from an object in the opening element
          const collapsedAsObjectProp = findObjectExpressionsLiteral(
            j,
            spreadAttributeObject,
            names.collapsedProp
          );

          if (collapsedAsObjectProp.size()) {
            accordionAttributes.push(
              getExpandedPropFromOpeningElementObject(collapsedAsObjectProp)
            );
            collapsedAsObjectProp.remove();
          }

          const titleAsObjectProp = findObjectExpressionsLiteral(
            j,
            spreadAttributeObject,
            names.titleProp
          );

          if (titleAsObjectProp.size()) {
            accordionAttributes.push(getTitleAttribute(titleAsObjectProp, names.titleProp));
            titleAsObjectProp.remove();
          }

          const subtitleAsObjectProp = findObjectExpressionsLiteral(
            j,
            spreadAttributeObject,
            names.subtitleProp
          );

          if (subtitleAsObjectProp.size()) {
            accordionAttributes.push(getTitleAttribute(subtitleAsObjectProp, names.subtitleProp));
            subtitleAsObjectProp.remove();
          }

          // props spread as shorthand from an object in opening element
          const collapsedAsShorthandProp = findObjectExpressionsIdentifier(
            j,
            spreadAttributeObject,
            names.collapsedProp
          );

          if (collapsedAsShorthandProp.size()) {
            accordionAttributes.push(j.jsxAttribute(
                j.jsxIdentifier(names.expandedProp),
                j.jsxExpressionContainer(j.jsxIdentifier(`!${names.collapsedProp}`))
              )
            );
            collapsedAsShorthandProp.remove();
          }

          const titleAsShorthandProp = findObjectExpressionsIdentifier(
            j,
            spreadAttributeObject,
            names.titleProp
          );

          if (titleAsShorthandProp.size()) {
            accordionAttributes.push(j.jsxAttribute(
                j.jsxIdentifier(names.titleProp),
                j.jsxExpressionContainer(j.jsxIdentifier(names.titleProp))
              )
            );
            titleAsShorthandProp.remove();
          }

          const subtitleAsShorthandProp = findObjectExpressionsIdentifier(
            j,
            spreadAttributeObject,
            names.subtitleProp
          );

          if (subtitleAsShorthandProp.size()) {
            accordionAttributes.push(j.jsxAttribute(
                j.jsxIdentifier(names.subtitleProp),
                j.jsxExpressionContainer(j.jsxIdentifier(names.subtitleProp))
              )
            );
            subtitleAsShorthandProp.remove();
          }
        }
      }

      const accordionOpeningTag = getAccordionOpeningTag(accordionAttributes.filter(attribute => attribute !== null));
      const accordionClosingTag = j.jsxClosingElement(
        j.jsxIdentifier(names.accordionComponent)
      );

      podNode.node.children = [
        accordionOpeningTag,
        ...podNode.value.children,
        accordionClosingTag,
      ];
    });
  }

  function getAccordionOpeningTag(accordionAttributes) {
    return j.jsxOpeningElement(
      j.jsxIdentifier(names.accordionComponent),
      accordionAttributes
    );
  }

  function getTitleAttribute(titleJSXAttributeProp, propName) {
    const propValue = titleJSXAttributeProp.get("value").value;
    const isValueLiteral = propValue.type === "Literal";

    if (propValue && propValue.type === "Identifier") {
      return j.jsxAttribute(
        j.jsxIdentifier(propName),
        j.jsxExpressionContainer(j.jsxIdentifier(propValue.name))
      );
    }

    return j.jsxAttribute(
      j.jsxIdentifier(propName),
      isValueLiteral
        ? j.stringLiteral(propValue.value)
        : j.jsxExpressionContainer(
            j.jsxIdentifier(propValue.expression.name)
          )
    );
  }

  function getExpandedPropFromOpeningElementObject(objectProp) {
    const objectPropValue = objectProp.get("value").value;
    if (
      objectPropValue.type === "Literal" &&
      (objectPropValue.value === names.collapsedProp ||
        objectPropValue.value === true)
    ) {
      return null;
    }

    return j.jsxAttribute(
      j.jsxIdentifier(names.expandedProp),
      j.jsxExpressionContainer(j.jsxIdentifier(`!${objectPropValue.name}`))
    );
  }

  function getExpandedAttribute(collapsedProp) {
    const propValue = collapsedProp.get("value");

    if (propValue.value && propValue.value.type === "Identifier") {
      return j.jsxAttribute(
        j.jsxIdentifier(names.expandedProp),
        j.jsxExpressionContainer(j.jsxIdentifier(`!${propValue.value.name}`))
      );
    }

    if (
      propValue.value === null ||
      propValue.value.value === "" ||
      propValue.value.value === names.collapsedProp ||
      propValue.value.expression.value === true
    ) {
      return null;
    }
    
    if (propValue.value.expression.value === false) {
      return j.jsxAttribute(j.jsxIdentifier(names.expandedProp));
    }

    return j.jsxAttribute(
      j.jsxIdentifier(names.expandedProp),
      j.jsxExpressionContainer(j.jsxIdentifier(`!${propValue.value.expression.name}`))
    );
  }

  function hasCollapsedProp(element) {
    return element.node.openingElement.attributes.some((attr) => {
      if (attr.type === "JSXSpreadAttribute") {
        if (attr.argument.type === "ObjectExpression") {
          return (
            j(attr)
              .find(j.Property, {
                kind: "init",
                key: { name: names.collapsedProp },
              })
              .size() > 0
          );
        }

        const property = getPropertyFromDeclarationScope(
          element,
          attr,
          names.collapsedProp
        );

        return property.size() > 0;
      }

      return attr.name.name === names.collapsedProp;
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
