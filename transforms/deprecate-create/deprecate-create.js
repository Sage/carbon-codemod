/*
 * Convert all <Create /> to
 * <Button buttonType=“dashed” iconType=“plus” iconPosition=“after” fullWidth />
 */
import registerMethods from "../registerMethods";

function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  registerMethods(j);

  /*
    Change import from 'import Create from "carbon-react/lib/components/create";'
    to 'import Button from "carbon-react/lib/components/button";'
  */
  const ImportReplacement = () => {
    const createImport = root.find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: "carbon-react/lib/components/create",
      },
    });

    const buttonImport = root.find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: "carbon-react/lib/components/button",
      },
    });

    // If there's already a Button import, just remove the Create one
    if (buttonImport.size()) {
      createImport.remove();
      return true;
    }

    createImport.replaceWith(
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier("Button"))],
        j.literal("carbon-react/lib/components/button")
      )
    );
    return true;
  };

  const OpeningTagReplacement = (tag) => {
    // Change the tag from Create to Button
    const name = tag.find(j.JSXIdentifier, { name: "Create" });
    if (name.size()) {
      // If there's already attributes, add the new ones after
      const currentAttributes = tag.find(j.JSXAttribute);

      let props = [
        ...currentAttributes.nodes(),
        j.jsxAttribute(j.jsxIdentifier("buttonType"), j.literal("dashed")),
        j.jsxAttribute(j.jsxIdentifier("iconType"), j.literal("plus")),
        j.jsxAttribute(j.jsxIdentifier("iconPosition"), j.literal("after")),
        j.jsxAttribute(j.jsxIdentifier("fullWidth")),
      ];

      const selfClosing = tag.nodes()[0].selfClosing;
      tag.replaceWith(
        j.jsxOpeningElement(j.jsxIdentifier("Button"), props, selfClosing)
      );
      return true;
    }
  };

  const ClosingTagReplacement = (tag) => {
    // Change the tag from Create to Button
    const name = tag.find(j.JSXIdentifier, { name: "Create" });

    if (name.size()) {
      name.replaceWith(j.jsxIdentifier("Button"));
      return true;
    }
  };

  const JSXElementReplacement = (create) => {
    // Opening tag
    const createOpeningTags = create.find(j.JSXOpeningElement, {
      name: {
        type: "JSXIdentifier",
        name: "Create",
      },
    });

    // Closing tag. If it doesn't exist, the opening tag is self closing
    const createClosingTags = create.find(j.JSXClosingElement, {
      name: {
        type: "JSXIdentifier",
        name: "Create",
      },
    });

    let tagsReplaced = OpeningTagReplacement(createOpeningTags.last());

    if (createClosingTags.size()) {
      const closingTag = createClosingTags.last();
      tagsReplaced = tagsReplaced && ClosingTagReplacement(closingTag);
    }

    return tagsReplaced;
  };

  const root = j(fileInfo.source);

  const creates = root.findJSXElementsByImport(
    "carbon-react/lib/components/create"
  );

  if (creates.size() === 0) {
    // If the component is not imported, skip this file
    return;
  }

  let didUpdateFile = false;

  creates.forEach((path) => {
    const create = j(path);
    const didImportReplacement = ImportReplacement();
    const didElementReplacement = JSXElementReplacement(create);

    let didConvertCreate = didImportReplacement && didElementReplacement;
    didUpdateFile = didUpdateFile ? true : didConvertCreate;
  });

  if (didUpdateFile) {
    return root.toSource();
  }
}

module.exports = transformer;
