import Message from "carbon-react/lib/components/message";
export default () => <Message variant="info" />;
export const withProps = () => <Message variant="info" title="Example" />;
const as = "info";
export const asVariable = () => <Message variant={as} />;
const props = { variant: "info", title: "Example" }
export const spread = () => <Message {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Message {...{ variant: "info", title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Message {...{ variant: as, title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Message {...{ variant: as, title: "Example" }} />;