import Message from "carbon-react/lib/components/message";
export default () => <Message variant="info" />;
export const withProps = () => <Message variant="info" title="Example" />;
const roundedCorners = true;
export const asVariable = () => <Message />;
const props = {
  variant: "info",
  title: "Example"
}
export const spread = () => <Message {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Message {...{
  variant: "info",
  title: "Example"
}} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Message {...{
  title: "Example"
}} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Message {...{
  title: "Example"
}} />;