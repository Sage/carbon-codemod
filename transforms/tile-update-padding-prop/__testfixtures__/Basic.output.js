import Tile from "carbon-react/lib/components/tile";
export const xs = () => <Tile p={1} />;
export const s = () => <Tile p={2} />;
export const m = () => <Tile p={3} />;
export const l = () => <Tile p={4} />;
export const xl = () => <Tile p={5} />;

export default () => <Tile p={2} />;
export const withProps = () => <Tile otherProp="Example" p={4} />

const padding = 1;
export const asVariable = () => <Tile p={padding} />;

const props = { p: 2, otherProp: "Example" }
export const spread = () => <Tile {...props} />;
export const ObjectExpressionsLiteralReplacement = () => <Tile {...{ p: 2, otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement1 = () => <Tile {...{ p: padding, otherProp: "Example" }} />;
export const ObjectExpressionsIdentifierReplacement2 = () => <Tile {...{ p: padding, otherProp: "Example" }} />;
