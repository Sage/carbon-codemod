/*
 * Convert all <Message as="" /> <Message variant="" />
 */
import { run, removeAttribute } from "../builder";
module.exports = run(
  removeAttribute("carbon-react/lib/components/message", "roundedCorners")
);
