import Pod from "carbon-react/lib/components/pod";

const WithPropsSpreadFromObject = ({children, closed}) => {
  const podProps = {
    title: "Title",
    collapsed: closed,
    subtitle: "subtitle",
  };

  return <Pod {...podProps}>{children}</Pod>;
};

const WithTitleAsShorthand = ({children, closed, title}) => {
  const podProps = {
    title,
    collapsed: closed,
    subtitle: "subtitle",
  };

  return <Pod {...podProps}>{children}</Pod>;
};

const WithTitlePassed = ({children, closed, podTitle}) => {
  const podProps = {
    title: podTitle,
    collapsed: closed,
    subtitle: "subtitle"
  };

  return <Pod {...podProps}>{children}</Pod>;
};

const WithMultipleObjectsSpread = ({children, closed, podTitle}) => {
  const podProps = {
    collapsed: closed,
  };

  const other = {
    subtitle: "subtitle",
    title: podTitle
  };

  return <Pod {...podProps} {...other}>{children}</Pod>;
};

const WithSpreadPropsNoTitle = ({children, closed}) => {
  const podProps = {
    collapsed: closed,
    subtitle: "subtitle",
  };

  return <Pod {...podProps}>{children}</Pod>;
};

const WithSpreadPropsNoCollapsed = ({children}) => {
  const podProps = {
    title: "Title",
    subtitle: "subtitle",
  };

  return <Pod {...podProps}>{children}</Pod>;
};
