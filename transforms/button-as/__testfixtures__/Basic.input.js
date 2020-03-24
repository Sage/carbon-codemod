import Button from "carbon-react/lib/components/button";
export default () => <Button as="primary" />;
export const secondary = () => <Button as="secondary" />;
export const duplicateProps = () => <Button as="secondary" as="primary" />;
export const expression = () => <Button as={"primary"} />;
