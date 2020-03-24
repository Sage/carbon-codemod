import Button from "carbon-react/lib/components/button";
const props = {as: "primary", onClick: () => {}};
const as = "primary";
const type = "primary";
export default () => <Button {...props} />;
export const one = () => <Button {...{as: "primary", onClick: () => {}}} />;
export const two = () => <Button {...{as, onClick: () => {}}} />;
export const three = () => <Button {...{as: type, onClick: () => {}}} />;