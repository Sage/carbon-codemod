import Component from "carbon-react/lib/components/component";
export default ({ ...props }) => <Component old="info" {...props}>Example</Component>;
export const ExampleTwo = ({ old, ...props }) => <Component old={old} {...props}>Example</Component>;