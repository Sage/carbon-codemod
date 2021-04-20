import defineTest from "../../../defineTest";

defineTest(
  __dirname,
  "rename-prop",
  {
    importPath: "carbon-react/lib/components/component",
    old: "old",
    replacement: "replacement",
  },
  "Basic"
);

defineTest(
  __dirname,
  "rename-prop",
  {
    importPath: "carbon-react/lib/components/component",
    importName: "Component",
    old: "old",
    replacement: "replacement",
  },
  "NamedImport"
);

defineTest(
  __dirname,
  "rename-prop",
  {
    importPath: "carbon-react/lib/components/component",
    old: "old",
    replacement: "replacement",
  },
  "Bug"
);

defineTest(
  __dirname,
  "rename-prop",
  {
    importPath: "carbon-react/lib/components/component",
    old: "old",
    replacement: "replacement",
  },
  "NoImport"
);
