/*
 * Convert all <Message as="" /> <Message variant="" />
 */
import renameAttribute from "../renameAttribute";
module.exports = renameAttribute(
  "carbon-react/lib/components/message",
  "as",
  "variant"
);
