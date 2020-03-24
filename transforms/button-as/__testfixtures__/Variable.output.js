import Button from "carbon-react/lib/components/button";
const buttonType = "primary";
export default () => <Button buttonType={buttonType} />;
export const one = (buttonType = "primary") => {
  return <Button buttonType={buttonType} />;
}
export const two = () => <Button buttonType={buttonType()} />;