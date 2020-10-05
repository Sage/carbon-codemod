import defineTest from "../../../defineTest";

defineTest(
  __dirname,
  "replace-prop-value",
  {
    component: "carbon-react/lib/components/component",
    attribute: "prop",
    oldValue: "test",
    newValue: 3,
  },
  "NoImport"
);

defineTest(
  __dirname,
  "replace-prop-value",
  {
    component: "carbon-react/lib/components/component",
    attribute: "prop",
    oldValue: "oldString",
    newValue: "newString",
  },
  "StringToString"
);

defineTest(
  __dirname,
  "replace-prop-value",
  {
    component: "carbon-react/lib/components/component",
    attribute: "prop",
    oldValue: "oldString",
    newValue: 2,
  },
  "StringToNumber"
);

defineTest(
  __dirname,
  "replace-prop-value",
  {
    component: "carbon-react/lib/components/component",
    attribute: "prop",
    oldValue: 3,
    newValue: "newString",
  },
  "NumberToString"
);

defineTest(
  __dirname,
  "replace-prop-value",
  {
    component: "carbon-react/lib/components/component",
    attribute: "prop",
    oldValue: 3,
    newValue: 2,
  },
  "NumberToNumber"
);

defineTest(
  __dirname,
  "replace-prop-value",
  {
    component: "carbon-react/lib/components/component",
    attribute: "prop",
    oldValue: "3",
    newValue: "newValue",
  },
  "NumberStringOldValue"
);

defineTest(
  __dirname,
  "replace-prop-value",
  {
    component: "carbon-react/lib/components/component",
    attribute: "prop",
    oldValue: "oldValue",
    newValue: "2",
  },
  "NumberStringNewValue"
);
