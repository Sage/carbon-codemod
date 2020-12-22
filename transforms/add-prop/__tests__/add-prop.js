import defineTest from "../../../defineTest";

defineTest(
  __dirname,
  "add-prop",
  {
    component: "carbon-react/lib/components/button",
    prop: "ml",
    value: 2,
  },
  "Number"
);

defineTest(
  __dirname,
  "add-prop",
  {
    component: "carbon-react/lib/components/button",
    prop: "ml",
    value: "16px",
  },
  "String"
);

defineTest(
  __dirname,
  "add-prop",
  {
    component: "carbon-react/lib/components/button",
    prop: "hasBorder",
    value: true,
  },
  "BooleanTrue"
);

defineTest(
  __dirname,
  "add-prop",
  {
    component: "carbon-react/lib/components/button",
    prop: "hasBorder",
    value: false,
  },
  "BooleanFalse"
);

defineTest(
  __dirname,
  "add-prop",
  {
    component: "carbon-react/lib/components/component",
    prop: "newProp",
    value: "value",
  },
  "NoImport"
);

defineTest(
  __dirname,
  "add-prop",
  {
    component: "carbon-react/lib/components/button",
    prop: "ml",
    value: "2",
  },
  "NoTransformRequired"
);

defineTest(
  __dirname,
  "add-prop",
  {
    component: "carbon-react/lib/components/button",
    prop: "hasLink",
    value: "test foo bar",
  },
  "Node"
);

defineTest(
  __dirname,
  "add-prop",
  {
    component: "carbon-react/lib/components/button",
    prop: "info",
    value: "test foo bar",
  },
  "Object"
);
