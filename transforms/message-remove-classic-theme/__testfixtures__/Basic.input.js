import Message from "carbon-react/lib/components/message";
export default () => <Message as="info" roundedCorners />;
export const withProps = () => <Message as="info" title="Example" roundedCorners={true} />;
const as = "info";
const roundedCorners = true;
export const asVariable = () => <Message as={as} roundedCorners={roundedCorners} border={false}/>;
const props = { as: "info", title: "Example", roundedCorners: true, border: false }
export const spread = () => <Message {...props} roundedCorners border={false}/>;
export const ObjectExpressionsLiteralReplacement = () => <Message {...{ as: "info", title: "Example", roundedCorners: true, border: false }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Message {...{ as, title: "Example", roundedCorners, border: false }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Message {...{ as: as, title: "Example", roundedCorners: roundedCorners, border: false }} />;