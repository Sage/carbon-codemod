/*
 * Convert all <Message as="" /> <Message variant="" />
 */
import { run, renameAttribute } from "../builder";
module.exports = run(
  renameAttribute("carbon-react/lib/components/message", "as", "variant"),
  renameAttribute("carbon-react/lib/components/message", "foo", "bar")
);
