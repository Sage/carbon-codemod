import Button from "carbon-react/lib/components/button";
const buttonType = "destructive";
export default () => <Button buttonType={buttonType} />;
export const one = (buttonType = "destructive") => {
  return <Button buttonType={buttonType} />;
}
export const two = () => <Button buttonType={buttonType()} />;
