import Message from "carbon-react/lib/components/message";
export default () => <Message as="info" />;
export const withProps = () => <Message as="info" title="Example" />;
const as = "info";
export const asVariable = () => <Message as={as} />;
const props = { as: "info", title: "Example" }
export const spread = () => <Message {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Message {...{ as: "info", title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Message {...{ as, title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Message {...{ as: as, title: "Example" }} />;