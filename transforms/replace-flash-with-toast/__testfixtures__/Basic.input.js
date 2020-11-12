import Flash from "carbon-react/lib/components/flash";
export default () => <Flash message="info" />;
export const withProps = () => <Flash message="info" random="Example" isCenter/>;
const message = "info";
export const asVariable = () => <Flash message={message} />;
const props = { message: "info", variant: 'info', random: "Example" }
export const spread = () => <Flash {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Flash {...{ message: "info", random: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Flash {...{ message, random: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Flash {...{ message: message, random: "Example" }} />;