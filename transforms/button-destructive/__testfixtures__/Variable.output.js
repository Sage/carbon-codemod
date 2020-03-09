import Button from "carbon-react/lib/components/button";
const buttonType = "primary";
export default () => <Button buttonType={buttonType} destructive />;
export const one = (buttonType = "primary") => {
  return <Button buttonType={buttonType} destructive />;
}
export const two = () => <Button buttonType={buttonType()} />;