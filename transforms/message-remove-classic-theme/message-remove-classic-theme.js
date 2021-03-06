/*
 * Convert all <Message as="" roundedCorners border={false} /> to <Message variant="" />
 */
import { run, renameAttribute, removeAttribute } from "../builder";
module.exports = run(
  renameAttribute("carbon-react/lib/components/message", "as", "variant"),
  removeAttribute("carbon-react/lib/components/message", "roundedCorners"),
  removeAttribute("carbon-react/lib/components/message", "border")
);
