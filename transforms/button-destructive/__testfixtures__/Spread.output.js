import Button from "carbon-react/lib/components/button";
const props = {
  type: "primary",
  destructive,
  onClick: () => {}
};
const type = "primary";
const buttonType = "primary";
export default () => <Button {...props} />;
export const one = () => <Button {...{
  type: "primary",
  destructive,
  onClick: () => {}
}} />;
export const two = () => <Button {...{
  type,
  destructive,
  onClick: () => {}
}} />;
export const three = () => <Button {...{
  type: buttonType,
  destructive,
  onClick: () => {}
}} />;