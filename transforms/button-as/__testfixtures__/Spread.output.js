import Button from "carbon-react/lib/components/button";
const props = {buttonType: "primary", onClick: () => {}};
const as = "primary";
const type = "primary";
export default () => <Button {...props} />;
export const one = () => <Button {...{buttonType: "primary", onClick: () => {}}} />;
export const two = () => <Button {...{buttonType: as, onClick: () => {}}} />;
export const three = () => <Button {...{buttonType: type, onClick: () => {}}} />;