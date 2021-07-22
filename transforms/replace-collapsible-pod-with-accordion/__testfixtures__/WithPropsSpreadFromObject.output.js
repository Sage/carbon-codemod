import Pod from "carbon-react/lib/components/pod";

import Accordion from "carbon-react/lib/components/accordion";

const WithPropsSpreadFromObject = ({children, open}) => {
  const podProps = {
    subtitle: "subtitle"
  };

  return <Pod {...podProps}><Accordion borders="none" expanded={open} title="Title">{children}</Accordion></Pod>;
};

const WithTitleAsShorthand = ({children, open, title}) => {
  const podProps = {
    subtitle: "subtitle"
  };

  return <Pod {...podProps}><Accordion borders="none" expanded={open} title={title}>{children}</Accordion></Pod>;
};

const WithTitlePassed = ({children, open, podTitle}) => {
  const podProps = {
    subtitle: "subtitle"
  };

  return <Pod {...podProps}><Accordion borders="none" expanded={open} title={podTitle}>{children}</Accordion></Pod>;
};

const WithMultipleObjectsSpread = ({children, open, podTitle}) => {
  const podProps = {};

  const other = {
    subtitle: "subtitle"
  };

  return <Pod {...podProps} {...other}><Accordion borders="none" expanded={open} title={podTitle}>{children}</Accordion></Pod>;
};

const WithSpreadPropsNoTitle = ({children, open}) => {
  const podProps = {
    subtitle: "subtitle"
  };

  return <Pod {...podProps}><Accordion borders="none" expanded={open}>{children}</Accordion></Pod>;
};

const WithSpreadPropsNoCollapsed = ({children, open}) => {
  const podProps = {
    title: "Title",
    subtitle: "subtitle",
  };

  return <Pod {...podProps}>{children}</Pod>;
};
