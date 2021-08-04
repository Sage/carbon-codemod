import Pod from "carbon-react/lib/components/pod";

import { Accordion } from "carbon-react/lib/components/accordion";

const WithPropsSpreadFromObject = ({children, closed}) => {
  const podProps = {};

  return <Pod {...podProps}><Accordion borders="none" expanded={!closed} title="Title" subtitle="subtitle">{children}</Accordion></Pod>;
};

const WithTitleAsShorthand = ({children, closed, title}) => {
  const podProps = {};

  return <Pod {...podProps}><Accordion borders="none" expanded={!closed} title={title} subtitle="subtitle">{children}</Accordion></Pod>;
};

const WithTitlePassed = ({children, closed, podTitle}) => {
  const podProps = {};

  return <Pod {...podProps}><Accordion borders="none" expanded={!closed} title={podTitle} subtitle="subtitle">{children}</Accordion></Pod>;
};

const WithMultipleObjectsSpread = ({children, closed, podTitle}) => {
  const podProps = {};

  const other = {};

  return <Pod {...podProps} {...other}><Accordion borders="none" expanded={!closed} title={podTitle} subtitle="subtitle">{children}</Accordion></Pod>;
};

const WithSpreadPropsNoTitle = ({children, closed}) => {
  const podProps = {};

  return <Pod {...podProps}><Accordion borders="none" expanded={!closed} subtitle="subtitle">{children}</Accordion></Pod>;
};

const WithSpreadPropsNoCollapsed = ({children}) => {
  const podProps = {
    title: "Title",
    subtitle: "subtitle",
  };

  return <Pod {...podProps}>{children}</Pod>;
};
