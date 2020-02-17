import Button from "carbon-react/lib/components/button";
const props = {type: "destructive", onClick: () => {}};
const type = "destructive";
const buttonType = "destructive";
export default () => <Button {...props} />;
export const one = () => <Button {...{type: "destructive", onClick: () => {}}} />;
export const two = () => <Button {...{type, onClick: () => {}}} />;
export const three = () => <Button {...{type: buttonType, onClick: () => {}}} />;