import Button from "carbon-react/lib/components/button";
const props = {
  buttonType: "primary",
  destructive: true,
  onClick: () => {}
};
const buttonType = "primary";
const type = "primary";
export default () => <Button {...props} />;
export const one = () => <Button {...{
  buttonType: "primary",
  destructive: true,
  onClick: () => {}
}} />;
export const two = () => <Button {...{
  buttonType,
  destructive: true,
  onClick: () => {}
}} />;
export const three = () => <Button {...{
  buttonType: type,
  destructive: true,
  onClick: () => {}
}} />;