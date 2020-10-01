import Component from "carbon-react/lib/components/component";
export default ({ ...props }) => <Component prop="info" {...props}>Example</Component>;
export const ExampleTwo = ({ prop, ...props }) => <Component prop={prop} {...props}>Example</Component>;