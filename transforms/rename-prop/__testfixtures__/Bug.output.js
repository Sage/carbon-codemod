import Component from "carbon-react/lib/components/component";
export default ({ ...props }) => <Component replacement="info" {...props}>Example</Component>;
export const ExampleTwo = ({ old, ...props }) => <Component replacement={old} {...props}>Example</Component>;