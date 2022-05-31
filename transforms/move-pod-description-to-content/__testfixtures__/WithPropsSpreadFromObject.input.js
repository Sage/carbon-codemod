import Pod from "carbon-react/lib/components/pod";

import { Accordion } from "carbon-react/lib/components/accordion";

const WithPropsSpreadFromObject = ({children, desc}) => {
  const podProps = {
    title: "Title",
    description: desc,
    subtitle: "subtitle",
  };

  return <Pod {...podProps}>{children}</Pod>;
};

const WithMultipleObjectsSpreads = ({children, podTitle, desc}) => {
  const podProps = {
    description: desc,
  };

  const other = {
    subtitle: "subtitle",
    title: podTitle
  };

  return <Pod {...podProps} {...other}>{children}</Pod>;
};

const WithAccordionAndPropsSpreadFromObject = ({children, closed, desc}) => {
  const podProps = {
    description: desc,
  };

  return <Pod {...podProps}><Accordion borders="none" expanded={!closed} title="Title" subtitle="subtitle">{children}</Accordion></Pod>;
};
