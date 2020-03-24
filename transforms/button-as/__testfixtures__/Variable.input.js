import Button from "carbon-react/lib/components/button";
const buttonType = "primary";
export default () => <Button as={buttonType} />;
export const one = (buttonType = "primary") => {
  return <Button as={buttonType} />;
}
export const two = () => <Button as={buttonType()} />;
