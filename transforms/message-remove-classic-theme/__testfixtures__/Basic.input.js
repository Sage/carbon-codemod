import Message from "carbon-react/lib/components/message";
export default () => <Message as="info" roundedCorners />;
export const withProps = () => <Message as="info" title="Example" roundedCorners={true} />;
const as = "info";
const roundedCorners = true;
export const asVariable = () => <Message as={as} roundedCorners={roundedCorners} />;
const props = { as: "info", title: "Example", roundedCorners: true }
export const spread = () => <Message {...props} roundedCorners />;
export const ObjectExpressionsLiteralReplacement = () => <Message {...{ as: "info", title: "Example", roundedCorners: true }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Message {...{ as, title: "Example", roundedCorners }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Message {...{ as: as, title: "Example", roundedCorners: roundedCorners }} />;