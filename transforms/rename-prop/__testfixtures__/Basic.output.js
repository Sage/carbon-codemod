import Component from "carbon-react/lib/components/component";
export default () => <Component replacement="info" />;
export const withProps = () => <Component replacement="info" title="Example" />;
const old = "info";
export const asVariable = () => <Component replacement={old} />;
const props = { replacement: "info", title: "Example" }
export const spread = () => <Component {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Component {...{ replacement: "info", title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Component {...{ replacement: old, title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Component {...{ replacement: old, title: "Example" }} />;