import { Component } from "carbon-react/lib/components/component";

export default () => <Component prop="newString" />;
export const withProps = () => <Component otherProp="Example" prop="newString" />

const prop = "newString";
export const asVariable = () => <Component prop={prop} />;

const props = { prop: "newString", otherProp: "Example" }
export const spread = () => <Component {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Component {...{ prop: "newString", otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Component {...{ prop, otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Component {...{ prop: prop, otherProp: "Example" }} />;
