import Component from "carbon-react/lib/components/component";
export default () => <Component old="info" />;
export const withProps = () => <Component old="info" title="Example" />;
const old = "info";
export const asVariable = () => <Component old={old} />;
const props = { old: "info", title: "Example" }
export const spread = () => <Component {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Component {...{ old: "info", title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Component {...{ old, title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Component {...{ old: old, title: "Example" }} />;