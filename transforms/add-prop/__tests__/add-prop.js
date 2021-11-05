import defineTest from "../../../defineTest";

["tsx", "js"].forEach((fileExtension) => {
  const prefix = fileExtension === "tsx" ? "typescript/" : "";
  const testOptions = fileExtension === "tsx" ? { parser: "tsx" } : {};

  defineTest(
    __dirname,
    "add-prop",
    {
      importPath: "carbon-react/lib/components/button",
      prop: "ml",
      value: 2,
    },
    prefix + "Number",
    testOptions
  );

  defineTest(
    __dirname,
    "add-prop",
    {
      importPath: "carbon-react/lib/components/button",
      prop: "ml",
      value: "16px",
    },
    prefix + "String",
    testOptions
  );

  defineTest(
    __dirname,
    "add-prop",
    {
      importPath: "carbon-react/lib/components/button",
      prop: "hasBorder",
      value: true,
    },
    prefix + "BooleanTrue",
    testOptions
  );

  defineTest(
    __dirname,
    "add-prop",
    {
      importPath: "carbon-react/lib/components/button",
      prop: "hasBorder",
      value: false,
    },
    prefix + "BooleanFalse",
    testOptions
  );

  defineTest(
    __dirname,
    "add-prop",
    {
      importPath: "carbon-react/lib/components/component",
      prop: "newProp",
      value: "value",
    },
    prefix + "NoImport",
    testOptions
  );

  defineTest(
    __dirname,
    "add-prop",
    {
      importPath: "carbon-react/lib/components/button",
      prop: "ml",
      value: "2",
    },
    prefix + "NoTransformRequired",
    testOptions
  );

  defineTest(
    __dirname,
    "add-prop",
    {
      importPath: "carbon-react/lib/components/button",
      importName: "Button",
      prop: "import",
      value: "named",
    },
    prefix + "NamedImport",
    testOptions
  );
});
