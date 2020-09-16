/*
 * Convert all <Message as="" /> <Message variant="" />
 */
import removeAttribute from "../removeAttribute";
module.exports = removeAttribute(
  "carbon-react/lib/components/message",
  "roundedCorners"
);
