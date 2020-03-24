import Button from "carbon-react/lib/components/button";
export default () => <Button buttonType="primary" />;
export const secondary = () => <Button buttonType="secondary" />;
export const duplicateProps = () => <Button buttonType="primary" />;
export const expression = () => <Button buttonType={"primary"} />;