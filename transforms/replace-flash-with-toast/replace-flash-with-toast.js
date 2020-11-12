import {
  findJSXAttribute,
  findObjectExpressionsLiteral,
  findObjectExpressionsIdentifier,
  findJSXSpreadAttributeObject,
} from "../builder/finder";

import renameAttribute from "../builder/renameAttribute";

import registerMethods from "../registerMethods";

const flashImportString = "carbon-react/lib/components/flash";
const toastImportString = "carbon-react/lib/components/toast";

function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  registerMethods(j);

  const root = j(fileInfo.source);

  /*
    Change import from 'import Flash from "carbon-react/lib/components/flash";'
    to 'import Toast from "carbon-react/lib/components/toast";'
  */

  const replaceImport = () => {
    // Flash import
    const flashImport = root.find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: flashImportString,
      },
    });

    // Toast import
    let toastImport = root.find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: toastImportString,
      },
    });

    // If there's already a Toast import, just remove the Flash one
    if (toastImport.size()) {
      flashImport.remove();
      return true;
    }

    // if no Toast import exists already add one
    toastImport = j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier("Toast"))],
      j.stringLiteral(toastImportString)
    );

    // replace Flash import with Toast import
    flashImport.replaceWith(toastImport);

    return true;
  };

  const getProp = (flash, propName) => {
    // <Flash propName="message" />
    // <Flash propName={message} />
    let propLiteral = findJSXAttribute(j, flash, propName);

    if (propLiteral.size()) {
      return propLiteral.get("value").value || true;
    }

    // <Flash {...{}} />
    const jsxSpreadAttribute = findJSXSpreadAttributeObject(j, flash);

    //  <Flash {...{propName: 'info'}} />
    //  <Flash {...{propName: prop}} />
    propLiteral = findObjectExpressionsLiteral(j, jsxSpreadAttribute, propName);

    if (propLiteral.size()) {
      const literalMessageValue = propLiteral.get("value").value;
      if (literalMessageValue.type === "Literal") {
        return literalMessageValue;
      }
      return j.jsxExpressionContainer(
        j.jsxIdentifier(literalMessageValue.name)
      );
    }

    //  <Flash {...{propName}} />
    propLiteral = findObjectExpressionsIdentifier(
      j,
      jsxSpreadAttribute,
      propName
    );

    if (propLiteral.size()) {
      const name = propLiteral.get("value").value.name;
      return j.jsxExpressionContainer(j.jsxIdentifier(name));
    }

    //  <Flash {...props} />
    const jsxSpreadIdentifier = flash.find(j.JSXSpreadAttribute, {
      argument: {
        type: "Identifier",
      },
    });

    if (jsxSpreadIdentifier.size()) {
      let memberExpression;
      jsxSpreadIdentifier.forEach((path) => {
        const attribute = j(path);
        const expressionName = attribute.get("argument", "name").value;
        const declarationScope = attribute.findDeclarationScope(expressionName);
        if (!declarationScope) {
          return;
        }

        const declaration = j(declarationScope.path)
          .find(j.VariableDeclarator, {
            id: {
              type: "Identifier",
              name: expressionName,
            },
            init: {
              type: "ObjectExpression",
            },
          })
          .filter((path) => path.scope === declarationScope);

        const results = declaration.find(j.Property, {
          kind: "init",
          key: { name: propName },
        });

        if (results.size()) {
          memberExpression = j.jsxExpressionContainer(
            j.memberExpression(
              j.identifier(expressionName),
              j.identifier(propName)
            )
          );
        }
      });
      return memberExpression;
    }
  };

  const replaceOpeningTag = (tag) => {
    const filteredAttributes = tag
      .find(j.JSXAttribute)
      .filter((path) => j(path).get("name").value.name !== "message");
    const props = [...filteredAttributes.nodes()];

    if (!getProp(tag, "variant")) {
      props.push(
        j.jsxAttribute(j.jsxIdentifier("variant"), j.literal("success"))
      );
    }

    if (!getProp(tag, "isCenter")) {
      props.push(j.jsxAttribute(j.jsxIdentifier("isCenter")));
    }

    const currentSpreadAttributes = tag.find(j.JSXSpreadAttribute);
    props.push(...currentSpreadAttributes.nodes());

    tag.replaceWith(
      j.jsxOpeningElement(j.jsxIdentifier("Toast"), props, false)
    );
  };

  const replaceChildren = (flash) => {
    const message = getProp(flash, "message");
    if (message) {
      flash.get("children").replace([message]);
    }
  };

  const replaceClosingTag = (tag) => {
    // Change the tag from Flash to Toast
    const name = tag.find(j.JSXIdentifier, { name: "Flash" });
    name.replaceWith(j.jsxIdentifier("Toast"));
  };

  const addClosingTag = (flash) => {
    // Add closing Flash tag
    flash
      .get("closingElement")
      .replace(j.jsxClosingElement(j.jsxIdentifier("Toast")));
  };

  const replaceJSXElement = (flash) => {
    // Opening tag
    const flashOpeningTags = flash.find(j.JSXOpeningElement, {
      name: {
        type: "JSXIdentifier",
        name: "Flash",
      },
    });

    // Closing tag. If it doesn't exist, the opening tag is self closing
    const flashClosingTags = flash.find(j.JSXClosingElement, {
      name: {
        type: "JSXIdentifier",
        name: "Flash",
      },
    });

    replaceChildren(flash);

    replaceOpeningTag(flashOpeningTags.last());

    if (flashClosingTags.size()) {
      const closingTag = flashClosingTags.last();
      replaceClosingTag(closingTag);
    } else {
      addClosingTag(flash);
    }
  };

  const flashComponents = root.findJSXElementsByImport(flashImportString);

  // if the component is not imported, skip this file
  if (flashComponents.size() === 0) {
    return;
  }

  // Change 'as' prop name to 'variant' in all Flash components
  renameAttribute(flashImportString, "as", "variant")(
    fileInfo,
    api,
    options,
    j,
    root
  );

  let didReplaceImport = false;

  flashComponents.forEach((path) => {
    // if import was not already replaced
    if (!didReplaceImport) {
      didReplaceImport = replaceImport();
    }
    const flash = j(path);
    replaceJSXElement(flash);
  });

  // transform if update occurred
  if (didReplaceImport) {
    return root.toSource();
  }
}

module.exports = transformer;
