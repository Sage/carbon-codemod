import Message from "carbon-react/lib/components/message";
export default ({ roundedCorners, ...props }) => <Message as="info" roundedCorners={roundedCorners} {...props}>Example</Message>;
export const ExampleTwo = ({ as, ...props }) => <Message as={as} roundedCorners={roundedCorners} {...props}>Example</Message>;