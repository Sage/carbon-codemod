import defineTest from "../../../defineTest";

defineTest(
  __dirname,
  "rename-prop",
  {
    component: "carbon-react/lib/components/component",
    old: "old",
    replacement: "replacement",
  },
  "Basic"
);

defineTest(
  __dirname,
  "rename-prop",
  {
    component: "carbon-react/lib/components/component",
    old: "old",
    replacement: "replacement",
  },
  "Bug"
);

defineTest(
  __dirname,
  "rename-prop",
  {
    component: "carbon-react/lib/components/component",
    old: "old",
    replacement: "replacement",
  },
  "NoImport"
);
