import Component from "carbon-react/lib/components/component";
export default () => <Component />;
export const withProps = () => <Component title="Example" />;
const prop = "info";
export const asVariable = () => <Component />;
const props = {
  title: "Example"
}
export const spread = () => <Component {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Component {...{
  title: "Example"
}} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Component {...{
  title: "Example"
}} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Component {...{
  title: "Example"
}} />;