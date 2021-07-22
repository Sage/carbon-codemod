import Pod from "carbon-react/lib/components/pod";

import Accordion from "carbon-react/lib/components/accordion";

const WithCollapsedTrue = ({ children }) => <Pod><Accordion borders="none" title="Title" expanded>{children}</Accordion></Pod>;

const WithCollapsedLiteral = ({ children }) => <Pod><Accordion borders="none" title="Title" expanded>{children}</Accordion></Pod>;
