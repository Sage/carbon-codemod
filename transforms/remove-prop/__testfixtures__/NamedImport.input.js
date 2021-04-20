import { Component } from "carbon-react/lib/components/component";
export default () => <Component prop="info" />;
export const withProps = () => <Component prop="info" title="Example" />;
const prop = "info";
export const asVariable = () => <Component prop={prop} />;
const props = { prop: "info", title: "Example" }
export const spread = () => <Component {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Component {...{ prop: "info", title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Component {...{ prop, title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Component {...{ prop: prop, title: "Example" }} />;