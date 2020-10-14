import Component from "carbon-react/lib/components/component";

export default () => <Component prop="oldString" />;
export const withProps = () => <Component otherProp="Example" prop="oldString" />

const prop = "oldString";
export const asVariable = () => <Component prop={prop} />;

const props = { prop: "oldString", otherProp: "Example" }
export const spread = () => <Component {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Component {...{ prop: "oldString", otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Component {...{ prop, otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Component {...{ prop: prop, otherProp: "Example" }} />;
