import Pod from "carbon-react/lib/components/pod";

import Typography from "carbon-react/lib/components/typography";

import { Accordion } from "carbon-react/lib/components/accordion";

const WithPropsSpreadFromObject = ({children, desc}) => {
  const podProps = {
    title: "Title",
    subtitle: "subtitle"
  };

  return <Pod {...podProps}><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">{desc}</Typography>{children}</Pod>;
};

const WithMultipleObjectsSpreads = ({children, podTitle, desc}) => {
  const podProps = {};

  const other = {
    subtitle: "subtitle",
    title: podTitle
  };

  return <Pod {...podProps} {...other}><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">{desc}</Typography>{children}</Pod>;
};

const WithAccordionAndPropsSpreadFromObject = ({children, closed, desc}) => {
  const podProps = {};

  return <Pod {...podProps}><Accordion borders="none" expanded={!closed} title="Title" subtitle="subtitle"><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">{desc}</Typography>{children}</Accordion></Pod>;
};
