const addAttribute = (path, attribute, value, importName) => (
  fileInfo,
  api,
  options,
  j,
  root
) => {
  const components = importName
    ? root.findJSXElementsByNamedImport(path, importName)
    : root.findJSXElementsByImport(path);

  // If the component is not imported, skip this file
  if (components.size() === 0) {
    return;
  }
  if (!components) {
    return false;
  }

  let didUpdate = false;
  components.forEach((component) => {
    if (
      !j(component.value.openingElement.attributes)
        .find(j.JSXIdentifier, { name: attribute })
        .size()
    ) {
      if (typeof value === "string") {
        component.value.openingElement.attributes.push(
          j.jsxAttribute(j.jsxIdentifier(attribute), j.literal(value))
        );
        didUpdate = true;
      }

      if (
        typeof value === "number" ||
        (typeof value === "boolean" && value === false)
      ) {
        component.value.openingElement.attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier(attribute),
            j.jsxExpressionContainer(j.literal(value))
          )
        );
        didUpdate = true;
      }

      if (typeof value === "boolean" && value === true) {
        component.value.openingElement.attributes.push(
          j.jsxAttribute(j.jsxIdentifier(attribute))
        );
        didUpdate = true;
      }
    }
  });

  return didUpdate;
};

export default addAttribute;
