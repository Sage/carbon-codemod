import Button from "carbon-react/lib/components/button";

interface SomeInterface {
  label: string;
}

export const asFalse = (arg: string): JSX.Element => <Button hasBorder={false} />
