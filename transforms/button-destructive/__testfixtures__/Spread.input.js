import Button from "carbon-react/lib/components/button";
const props = {buttonType: "destructive", onClick: () => {}};
const buttonType = "destructive";
const type = "destructive";
export default () => <Button {...props} />;
export const one = () => <Button {...{buttonType: "destructive", onClick: () => {}}} />;
export const two = () => <Button {...{buttonType, onClick: () => {}}} />;
export const three = () => <Button {...{buttonType: type, onClick: () => {}}} />;