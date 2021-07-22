import Pod from "carbon-react/lib/components/pod";

import { Accordion } from "carbon-react/lib/components/accordion";

const Basic = ({ children }) => <Pod><Accordion borders="none" title="Title" subtitle="subtitle">{children}</Accordion></Pod>;

const WithBooleanValue = ({ children }) => <Pod><Accordion borders="none" title="Title" subtitle="subtitle">{children}</Accordion></Pod>;

const WithCollapsedBasedOnProp = ({ children, closed }) => <Pod><Accordion borders="none" expanded={!closed} title="Title" subtitle="subtitle">{children}</Accordion></Pod>;

const WithCollapsedSetToFalse = ({ children }) => <Pod><Accordion borders="none" expanded title="Title" subtitle="subtitle">{children}</Accordion></Pod>;

const WithTitlePassed = ({ children, title }) => <Pod><Accordion borders="none" title={title} subtitle="subtitle">{children}</Accordion></Pod>;

const WithoutTitleProp = ({ children }) => <Pod><Accordion borders="none">{children}</Accordion></Pod>;

const WithoutCollapsedProp = ({ children }) => <Pod title="Title" subtitle="subtitle">{children}</Pod>;
