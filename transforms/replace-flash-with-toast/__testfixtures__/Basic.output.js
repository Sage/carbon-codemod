import Toast from "carbon-react/lib/components/toast";
export default () => <Toast variant="success" isCenter>info</Toast>;
export const withProps = () => <Toast random="Example" isCenter variant="success">info</Toast>;
const message = "info";
export const asVariable = () => <Toast variant="success" isCenter>{message}</Toast>;
const props = { message: "info", variant: 'info', random: "Example" }
export const spread = () => <Toast isCenter {...props}>{props.message}</Toast>;
export const ObjectExpressionsLiteralReplacement = () => <Toast variant="success" isCenter {...{ message: "info", random: "Example" }}>info</Toast>;
export const ObjectExpressionsIdentifierReplacement1 = () => <Toast variant="success" isCenter {...{ message, random: "Example" }}>{message}</Toast>;
export const ObjectExpressionsIdentifierReplacement2 = () => <Toast variant="success" isCenter {...{ message: message, random: "Example" }}>{message}</Toast>;