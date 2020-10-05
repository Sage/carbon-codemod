import Tile from "carbon-react/lib/components/tile";
export const xs = () => <Tile padding="XS" />;
export const s = () => <Tile padding="S" />;
export const m = () => <Tile padding="M" />;
export const l = () => <Tile padding="L" />;
export const xl = () => <Tile padding="XL" />;

export default () => <Tile padding="S" />;
export const withProps = () => <Tile otherProp="Example" padding="L" />

const padding = "XS";
export const asVariable = () => <Tile padding={padding} />;

const props = { padding: "S", otherProp: "Example" }
export const spread = () => <Tile {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Tile {...{ padding: "S", otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Tile {...{ padding, otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Tile {...{ padding: padding, otherProp: "Example" }} />;
