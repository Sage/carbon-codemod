import Pod from "carbon-react/lib/components/pod";

import Typography from "carbon-react/lib/components/typography";

import { Accordion } from "carbon-react/lib/components/accordion";

const Basic = ({ children }) => <Pod title="Title" subtitle="Subtitle"><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">Description</Typography>{children}</Pod>;

const BasicWithAccordion = ({ children }) => <Pod><Accordion borders="none" title="Title" subtitle="subtitle"><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">Description</Typography>{children}</Accordion></Pod>;

const WithDescriptionBasedOnProp = ({ children, desc }) => <Pod title="Title" subtitle="Subtitle"><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">{desc}</Typography>{children}</Pod>;

const WithDescriptionEmpty = ({ children }) => <Pod title="Title" subtitle="subtitle"><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">""</Typography>{children}</Pod>;

const WithoutDescription = ({ children }) => <Pod title="Title" subtitle="subtitle">{children}</Pod>;
