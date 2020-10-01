import defineTest from "../../../defineTest";

defineTest(
  __dirname,
  "remove-prop",
  {
    component: "carbon-react/lib/components/component",
    prop: "prop",
  },
  "Basic"
);

defineTest(
  __dirname,
  "remove-prop",
  {
    component: "carbon-react/lib/components/component",
    prop: "prop",
  },
  "Bug"
);

defineTest(
  __dirname,
  "remove-prop",
  {
    component: "carbon-react/lib/components/component",
    prop: "prop",
  },
  "NoImport"
);
