import Button from "carbon-react/lib/components/button";
const buttonType = "primary";
export default () => <Button type={buttonType} destructive />;
export const one = (buttonType = "primary") => {
  return <Button type={buttonType} destructive />;
}
export const two = () =>  <Button type={buttonType()} />;