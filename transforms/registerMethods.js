import assert from "assert";
import once from "jscodeshift/dist/utils/once";

export default once(j => {
  j.registerMethods({
    /*
    Find the VariableDeclaration for the expressionName, optionally filtered by init value
    */
    findVariableDeclaration: function(expressionName, init) {
      const declarationScope = this.findDeclarationScope(expressionName);
      assert.ok(
        declarationScope,
        `Unable to find the declaration scope of "${expressionName}"`
      );
      return j(declarationScope.path)
        .find(j.VariableDeclarator, {
          id: {
            type: "Identifier",
            name: expressionName
          },
          init
        })
        .filter(path => path.scope === declarationScope);
    },

    /**
     * Finds all JSXElements by package name. Given
     *
     *     import Bar from 'Foo';
     *     <Bar />
     *
     * findJSXElementsByImport('Foo') will find <Bar />, without having to
     * know the variable name.
     */
    findJSXElementsByImport: function(importName) {
      assert.ok(
        importName && typeof importName === "string",
        "findJSXElementsByImport(...) needs a name to look for"
      );

      return this.find(j.ImportDeclaration, {
        source: { value: importName }
      })
        .find(j.ImportDefaultSpecifier)
        .map(path => {
          const id = path.node.local.name;
          if (id) {
            return j([path])
              .closestScope()
              .findJSXElements(id)
              .paths();
          }
        });
    },

    /**
     * Finds all JSXElements by named import. Given
     *
     *     import { Foo as Bar } from 'foo';
     *     <Bar />
     *
     * findJSXElementsByModuleName('foo', 'Foo') will find <Bar />, without having
     * to know the variable name.
     */
    findJSXElementsByNamedImport: function(importName, exportName) {
      assert.ok(
        importName &&
          typeof importName === "string" &&
          exportName &&
          typeof exportName === "string",
        "findJSXElementsByNamedImport(...) needs a name to look for"
      );

      return this.find(j.ImportDeclaration, {
        source: { value: importName }
      })
        .find(j.ImportSpecifier, { imported: { name: exportName } })
        .map(path => {
          const id = path.node.local.name;
          if (id) {
            return j([path])
              .closestScope()
              .findJSXElements(id)
              .paths();
          }
        });
    },

    /*
    Get the last element in the collection
    */
    last: function() {
      return this.at(this.size() - 1);
    },

    /*
     * Remove all but the last item in the collection
     */
    trimLeft: function() {
      this.forEach((path, index) => {
        if (index + 1 < this.size()) {
          path.prune();
        }
      });
    },

    /*
    Find the scope that declares a variable.
    Starts at the current scope and traverses the parent scopes.
    */
    findDeclarationScope: function(name) {
      let scope = this.get().scope;
      while (scope && !scope.declares(name)) {
        scope = scope.parent;
      }
      return scope;
    }
  });

  j.registerMethods(
    {
      /*
      Given a JSXExpressionContainer e.g. type={buttonType}, find the AssignmentPattern where this expression is
      defined, optionally filtered by right value.
       */
      findAssignmentPattern: function(right) {
        const expressionName = this.get("expression").value.name;
        const declarationScope = this.findDeclarationScope(expressionName);
        return j(declarationScope.path)
          .find(j.AssignmentPattern, {
            left: {
              type: "Identifier",
              name: expressionName
            },
            right
          })
          .filter(path => path.scope === declarationScope);
      }
    },
    j.JSXExpressionContainer
  );
});
