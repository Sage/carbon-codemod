import Button from "carbon-react/lib/components/button";
export default () => <Button buttonType="destructive" />;
export const duplicateProps = () => <Button buttonType="secondary" buttonType="destructive" />;
export const expression = () => <Button buttonType={"destructive"} />;
