import Pod from "carbon-react/lib/components/pod";

const WithObjectPropsInOpeningElement = ({ children, podTitle, podSubtitle, podCollapsed }) => {
  return <Pod {...{title: podTitle, subtitle: podSubtitle, collapsed: podCollapsed}}>{children}</Pod>;
};

const WithCollapsedSetToTrue = ({ children, subtitle }) => {
  return <Pod {...{title: "Title", subtitle, collapsed: true }}>{children}</Pod>;
};

const WithPropsPassedAsShorthand = ({ children, title, subtitle, collapsed }) => {
  return <Pod {...{title, subtitle, collapsed}}>{children}</Pod>;
};

const WithPropsPassedWithoutTitle = ({ children, subtitle, collapsed }) => {
  return <Pod {...{subtitle, collapsed}}>{children}</Pod>;
};