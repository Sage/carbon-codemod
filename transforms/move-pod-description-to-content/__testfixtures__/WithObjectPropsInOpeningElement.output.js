import Pod from "carbon-react/lib/components/pod";

import Typography from "carbon-react/lib/components/typography";

import { Accordion } from "carbon-react/lib/components/accordion";

const WithObjectPropsInOpeningElement = ({ children, podTitle, podSubtitle, desc }) => {
  return (
    <Pod {...{
      title: podTitle,
      subtitle: podSubtitle
    }}><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">{desc}</Typography>{children}</Pod>
  );
};

const WithAccordionAndObjectPropInOpeningElement = ({ children, podTitle, podSubtitle, podCollapsed, desc }) => {
  return (
    <Pod {...{}}><Accordion
        borders="none"
        expanded={!podCollapsed}
        title={podTitle}
        subtitle={podSubtitle}><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">{desc}</Typography>{children}</Accordion></Pod>
  );
};

const WithPropsPassedAsShorthand = ({ children, title, subtitle, description }) => {
  return (
    <Pod {...{
      title,
      subtitle
    }}><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">{description}</Typography>{children}</Pod>
  );
};

const WithAccordionAndPropPassedAsShorthand = ({ children, podTitle, podSubtitle, podCollapsed, description }) => {
  return (
    <Pod {...{}}><Accordion
        borders="none"
        expanded={!podCollapsed}
        title={podTitle}
        subtitle={podSubtitle}><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">{description}</Typography>{children}</Accordion></Pod>
  );
};
