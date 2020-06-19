import Button from "carbon-react/lib/components/button";
export default () => <Button buttonType="dashed" iconType="plus" iconPosition="after" fullWidth />;
export const withProps = () => <Button
  className="test-class"
  onClick={() => undefined}
  buttonType="dashed"
  iconType="plus"
  iconPosition="after"
  fullWidth />;
