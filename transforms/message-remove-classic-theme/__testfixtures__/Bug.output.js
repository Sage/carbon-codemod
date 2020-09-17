import Message from "carbon-react/lib/components/message";
export default ({ roundedCorners, ...props }) => <Message variant="info" {...props}>Example</Message>;
export const ExampleTwo = ({ as, ...props }) => <Message variant={as} {...props}>Example</Message>;