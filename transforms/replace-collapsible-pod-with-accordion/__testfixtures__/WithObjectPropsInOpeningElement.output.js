import Pod from "carbon-react/lib/components/pod";

import Accordion from "carbon-react/lib/components/accordion";

const WithObjectPropsInOpeningElement = ({ children, podTitle, podSubtitle, podCollapsed }) => {
  return (
    <Pod {...{
      subtitle: podSubtitle
    }}><Accordion borders="none" expanded={podCollapsed} title={podTitle}>{children}</Accordion></Pod>
  );
};

const WithLiteralProps = ({ children, subtitle }) => {
  return (
    <Pod {...{
      subtitle
    }}><Accordion borders="none" expanded title="Title">{children}</Accordion></Pod>
  );
};

const WithCollapsedSetToTrue = ({ children, subtitle }) => {
  return (
    <Pod {...{
      subtitle
    }}><Accordion borders="none" expanded title="Title">{children}</Accordion></Pod>
  );
};

const WithPropsPassedAsShorthand = ({ children, title, subtitle, collapsed }) => {
  return (
    <Pod {...{
      subtitle
    }}><Accordion borders="none" expanded={collapsed} title={title}>{children}</Accordion></Pod>
  );
};

const WithPropsPassedWithoutTitle = ({ children, subtitle, collapsed }) => {
  return (
    <Pod {...{
      subtitle
    }}><Accordion borders="none" expanded={collapsed}>{children}</Accordion></Pod>
  );
};
