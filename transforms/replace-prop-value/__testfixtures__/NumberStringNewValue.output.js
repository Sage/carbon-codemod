import Component from "carbon-react/lib/components/component";

export default () => <Component prop="2" />;
export const withProps = () => <Component otherProp="Example" prop="2" />

const prop = "2";
export const asVariable = () => <Component prop={prop} />;

const props = { prop: "2", otherProp: "Example" }
export const spread = () => <Component {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Component {...{ prop: "2", otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Component {...{ prop, otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Component {...{ prop: prop, otherProp: "Example" }} />;
