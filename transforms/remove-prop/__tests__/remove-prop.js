import defineTest from "../../../defineTest";

defineTest(
  __dirname,
  "remove-prop",
  {
    importPath: "carbon-react/lib/components/component",
    prop: "prop",
  },
  "Basic"
);

defineTest(
  __dirname,
  "remove-prop",
  {
    importPath: "carbon-react/lib/components/component",
    importName: "Component",
    prop: "prop",
  },
  "NamedImport"
);

defineTest(
  __dirname,
  "remove-prop",
  {
    importPath: "carbon-react/lib/components/component",
    prop: "prop",
  },
  "Bug"
);

defineTest(
  __dirname,
  "remove-prop",
  {
    importPath: "carbon-react/lib/components/component",
    prop: "prop",
  },
  "NoImport"
);
