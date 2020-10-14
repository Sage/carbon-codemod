import Component from "carbon-react/lib/components/component";

export default () => <Component prop="oldValue" />;
export const withProps = () => <Component otherProp="Example" prop="oldValue" />

const prop = "oldValue";
export const asVariable = () => <Component prop={prop} />;

const props = { prop: "oldValue", otherProp: "Example" }
export const spread = () => <Component {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Component {...{ prop: "oldValue", otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Component {...{ prop, otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Component {...{ prop: prop, otherProp: "Example" }} />;
