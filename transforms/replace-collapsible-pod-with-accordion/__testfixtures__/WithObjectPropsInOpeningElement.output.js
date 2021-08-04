import Pod from "carbon-react/lib/components/pod";

import { Accordion } from "carbon-react/lib/components/accordion";

const WithObjectPropsInOpeningElement = ({ children, podTitle, podSubtitle, podCollapsed }) => {
  return (
    <Pod {...{}}><Accordion
        borders="none"
        expanded={!podCollapsed}
        title={podTitle}
        subtitle={podSubtitle}>{children}</Accordion></Pod>
  );
};

const WithCollapsedSetToTrue = ({ children, subtitle }) => {
  return <Pod {...{}}><Accordion borders="none" title="Title" subtitle={subtitle}>{children}</Accordion></Pod>;
};

const WithPropsPassedAsShorthand = ({ children, title, subtitle, collapsed }) => {
  return <Pod {...{}}><Accordion borders="none" expanded={!collapsed} title={title} subtitle={subtitle}>{children}</Accordion></Pod>;
};

const WithPropsPassedWithoutTitle = ({ children, subtitle, collapsed }) => {
  return <Pod {...{}}><Accordion borders="none" expanded={!collapsed} subtitle={subtitle}>{children}</Accordion></Pod>;
};
