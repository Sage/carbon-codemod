/*
 * Convert all <Tile padding="" /> to <Tile p="" />
 */
import { run, renameAttribute, replaceAttributeValue } from "../builder";

module.exports = run(
  replaceAttributeValue("carbon-react/lib/components/tile", "padding", "XS", 1),
  replaceAttributeValue("carbon-react/lib/components/tile", "padding", "S", 2),
  replaceAttributeValue("carbon-react/lib/components/tile", "padding", "M", 3),
  replaceAttributeValue("carbon-react/lib/components/tile", "padding", "L", 4),
  replaceAttributeValue("carbon-react/lib/components/tile", "padding", "XL", 5),
  renameAttribute("carbon-react/lib/components/tile", "padding", "p")
);
