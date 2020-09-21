import Message from "carbon-react/lib/components/message";
export default () => <Message roundedCorners variant="info" />;
export const withProps = () => <Message variant="info" roundedCorners title="Example" />;
const roundedCorners = true;
export const asVariable = () => <Message roundedCorners={roundedCorners} />;
const props = { variant: "info", roundedCorners, title: "Example" }
export const spread = () => <Message {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Message {...{ variant: "info", roundedCorners: true, title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Message {...{ roundedCorners: roundedCorners, title: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Message {...{ roundedCorners, title: "Example" }} />;