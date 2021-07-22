import Pod from "carbon-react/lib/components/pod";

import Accordion from "carbon-react/lib/components/accordion";

const Basic = ({ children }) => <Pod><Accordion borders="none" expanded title="Title">{children}</Accordion></Pod>;

const WithStringValue = ({ children }) => <Pod><Accordion borders="none" expanded title="Title">{children}</Accordion></Pod>;

const WithBooleanValue = ({ children }) => <Pod><Accordion borders="none" expanded title="Title">{children}</Accordion></Pod>;

const WithCollapsedBasedOnProp = ({ children, open }) => <Pod><Accordion borders="none" expanded={open} title="Title">{children}</Accordion></Pod>;

const WithoutTitleProp = ({ children }) => <Pod><Accordion borders="none" expanded>{children}</Accordion></Pod>;

const WithoutCollapsedProp = ({ children }) => <Pod title="Title">{children}</Pod>;
