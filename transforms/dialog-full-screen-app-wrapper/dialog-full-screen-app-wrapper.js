/*
 * Add <AppWrapper> around the children on <DialogFullScreen>
 * <DialogFullScreen><AppWrapper>{ children }</ AppWrapper></ DialogFullScreen>
 */
import registerMethods from "../registerMethods";

function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  registerMethods(j);

  // adds the AppWrapper import path
  const addImport = () => {

    // DialogFullScreen import
    const dialogFullScreenImport = root.find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: "carbon-react/lib/components/dialog-full-screen"
      }
    });

    const appWrapperImportString = "carbon-react/lib/components/app-wrapper";

    // AppWrapper import
    let appWrapperImport = root.find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: appWrapperImportString,
      },
    });

    // if no AppWrapper import exists already add one
    if (!appWrapperImport.size()) {
      appWrapperImport = j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier("AppWrapper"))],
        j.stringLiteral(appWrapperImportString)
      );
    
      // insert AppWrapper import after DialogFullScreen import
      dialogFullScreenImport.insertAfter(appWrapperImport);

      return true;
    }
  };

  // filter the variable declarations against the expression declared as a child of DialogFullScreen
  const filteredDeclarations = (variableDeclarations, expressionContainerName) => {
    if (!variableDeclarations.length) {
      return variableDeclarations;
    }

    const filteredDeclarations = [];

    variableDeclarations.filter((vd) => {
      const { declarations } = vd.value;

      if (declarations.length && declarations[0].id.name === expressionContainerName) {
        filteredDeclarations.push(declarations[0].init);
      }
    });

    return filteredDeclarations;
  }

  // compute whether the given declaration already composes AppWrapper
  const computeShouldUpdate = (declarations, appWrapperIdentifier) => {
    let result = false;
    declarations.forEach((declaration) => {
      // declaration is jsx element
      if (declaration.openingElement) {
        result = declaration.openingElement.name.name !== appWrapperIdentifier;
      } else if (declaration.body.openingElement) {
        // declaration is function with no return
        result = declaration.body.openingElement.name.name !== appWrapperIdentifier;
      } else {
        // declaration is function with return
        result = declaration.body.body[0].argument.openingElement.name.name !== appWrapperIdentifier;
      }
    })

    return result;
  }

  // adds the AppWrapper as a child of DialogFullScreen
  const addAppWrapper = (dialogFullScreen, addedImport) => {
    let appWrapperIdentifier = "AppWrapper";

    // if there already was an import
    if (!addedImport) {
      const appWrapperImport = root.find(j.ImportDeclaration, {
        source: {
          type: "Literal",
          value: "carbon-react/lib/components/app-wrapper",
        },
      });

      // find identifier used for import
      appWrapperIdentifier = appWrapperImport.get('specifiers', 0, 'local', 'name').value;
    }
    
    const dialogFullScreenAppWrapper = j(dialogFullScreen).find(
      j.JSXOpeningElement,
      {
        name: {
          type: "JSXIdentifier",
          name: appWrapperIdentifier,
        },
      }
    );

    // if app wrapper already exists within dialog, do nothing
    if (dialogFullScreenAppWrapper.size()) {
      return;
    }
    
    const dialogFullScreenJSXExpressionContainer = j(dialogFullScreen).find(
      j.JSXExpressionContainer
    );
      
    let shouldUpdate = false;

    // if there are no expression containers or multiple instances then add wrapper
    if (dialogFullScreenJSXExpressionContainer.size() !== 1) {
      shouldUpdate = true;
    } else {
    // else there is a single expression container
      const expressionContainerName = dialogFullScreenJSXExpressionContainer.get('expression', 'name').value;
      
      const variableDeclarations = filteredDeclarations(root.find(j.VariableDeclaration), expressionContainerName);

      shouldUpdate = !variableDeclarations.length || computeShouldUpdate(variableDeclarations, appWrapperIdentifier);
    }

    if (shouldUpdate) {
      // AppWrapper tags
      const appWrapperOpeningTag = j.jsxOpeningElement(j.jsxIdentifier(appWrapperIdentifier));
      const appWrapperClosingTag = j.jsxClosingElement(j.jsxIdentifier(appWrapperIdentifier));
    
      // wrap children in AppWrapper tags
      dialogFullScreen.value.children = [
        appWrapperOpeningTag,
        ...dialogFullScreen.value.children,
        appWrapperClosingTag
      ];

      return true;
    }
  };

  const root = j(fileInfo.source);

  const dialogFullScreens = root.findJSXElementsByImport(
    "carbon-react/lib/components/dialog-full-screen"
  );

  // if the component is not imported, skip this file
  if (dialogFullScreens.size() === 0) {
    return;
  }

  let didAddImport = false;
  let didAddAppWrapper = false;

  dialogFullScreens.forEach((path) => {
    // if selfClosing component do not transform and display warn
    if (path.node.openingElement.selfClosing) {
      console.warn('The component is self-closing and therefore has not been modified', fileInfo);
      return;
    } else {
      // if import was not already added
      if (!didAddImport) {
        didAddImport = addImport();
      }
      didAddAppWrapper = addAppWrapper(path, didAddImport);
    } 
  });

  // transform if update occurred
  if (didAddImport || didAddAppWrapper) {
    return root.toSource();
  }
}

module.exports = transformer;
