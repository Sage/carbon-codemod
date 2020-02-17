import Button from "carbon-react/lib/components/button";
const buttonType = "destructive";
export default () => <Button type={buttonType} />;
export const one = (buttonType = "destructive") => {
  return <Button type={buttonType} />;
}
export const two = () =>  <Button type={buttonType()} />;
