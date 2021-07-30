import Pod from "carbon-react/lib/components/pod";

import { Accordion } from "carbon-react/lib/components/accordion";

const Basic = ({ children }) => <Pod description="Description" title="Title" subtitle="Subtitle">{children}</Pod>;

const BasicWithAccordion = ({ children }) => <Pod description="Description"><Accordion borders="none" title="Title" subtitle="subtitle">{children}</Accordion></Pod>;

const WithDescriptionBasedOnProp = ({ children, desc }) => <Pod description={desc} title="Title" subtitle="Subtitle">{children}</Pod>;

const WithDescriptionEmpty = ({ children }) => <Pod description="" title="Title" subtitle="subtitle">{children}</Pod>;

const WithoutDescription = ({ children }) => <Pod title="Title" subtitle="subtitle">{children}</Pod>;
