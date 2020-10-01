import Component from "carbon-react/lib/components/component";
export default ({ ...props }) => <Component {...props}>Example</Component>;
export const ExampleTwo = ({ prop, ...props }) => <Component {...props}>Example</Component>;