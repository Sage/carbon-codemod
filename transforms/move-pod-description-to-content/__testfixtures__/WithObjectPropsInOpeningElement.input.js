import Pod from "carbon-react/lib/components/pod";

import { Accordion } from "carbon-react/lib/components/accordion";

const WithObjectPropsInOpeningElement = ({ children, podTitle, podSubtitle, desc }) => {
  return <Pod {...{title: podTitle, subtitle: podSubtitle, description: desc}}>{children}</Pod>;
};

const WithAccordionAndObjectPropInOpeningElement = ({ children, podTitle, podSubtitle, podCollapsed, desc }) => {
  return (
    <Pod {...{description: desc}}><Accordion
        borders="none"
        expanded={!podCollapsed}
        title={podTitle}
        subtitle={podSubtitle}>{children}</Accordion></Pod>
  );
};

const WithPropsPassedAsShorthand = ({ children, title, subtitle, description }) => {
  return <Pod {...{title, subtitle, description}}>{children}</Pod>;
};

const WithAccordionAndPropPassedAsShorthand = ({ children, podTitle, podSubtitle, podCollapsed, description }) => {
  return (
    <Pod {...{description}}><Accordion
        borders="none"
        expanded={!podCollapsed}
        title={podTitle}
        subtitle={podSubtitle}>{children}</Accordion></Pod>
  );
};
