import Button from "carbon-react/lib/components/button";
let buttonType = "primary";
export default () => <Button buttonType="primary" />;
export const duplicateProps = () => <Button buttonType="primary" />;
export const expression = () => <Button buttonType={"primary"} />;
export const expression2 = () => <Button buttonType={buttonType} />;