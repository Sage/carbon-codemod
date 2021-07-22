import Pod from "carbon-react/lib/components/pod";

const WithPropsSpreadFromObject = ({children, open}) => {
  const podProps = {
    title: "Title",
    collapsed: open,
    subtitle: "subtitle",
  };

  return <Pod {...podProps}>{children}</Pod>;
};

const WithTitleAsShorthand = ({children, open, title}) => {
  const podProps = {
    title,
    collapsed: open,
    subtitle: "subtitle",
  };

  return <Pod {...podProps}>{children}</Pod>;
};

const WithTitlePassed = ({children, open, podTitle}) => {
  const podProps = {
    title: podTitle,
    collapsed: open,
    subtitle: "subtitle"
  };

  return <Pod {...podProps}>{children}</Pod>;
};

const WithMultipleObjectsSpread = ({children, open, podTitle}) => {
  const podProps = {
    collapsed: open,
  };

  const other = {
    subtitle: "subtitle",
    title: podTitle
  };

  return <Pod {...podProps} {...other}>{children}</Pod>;
};

const WithSpreadPropsNoTitle = ({children, open}) => {
  const podProps = {
    collapsed: open,
    subtitle: "subtitle",
  };

  return <Pod {...podProps}>{children}</Pod>;
};

const WithSpreadPropsNoCollapsed = ({children, open}) => {
  const podProps = {
    title: "Title",
    subtitle: "subtitle",
  };

  return <Pod {...podProps}>{children}</Pod>;
};
