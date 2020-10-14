import Component from "carbon-react/lib/components/component";

export default () => <Component prop="newValue" />;
export const withProps = () => <Component otherProp="Example" prop="newValue" />

const prop = "newValue";
export const asVariable = () => <Component prop={prop} />;

const props = { prop: "newValue", otherProp: "Example" }
export const spread = () => <Component {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Component {...{ prop: "newValue", otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Component {...{ prop, otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Component {...{ prop: prop, otherProp: "Example" }} />;
