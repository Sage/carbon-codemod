import Pod from "carbon-react/lib/components/pod";
import { Accordion } from "carbon-react/lib/components/accordion";

const WithAccordion = ({ children }) => {
  return <>
    <Pod><Accordion borders="none" title="Title">{children}</Accordion></Pod>
    <Accordion>accordion content</Accordion>
  </>;
};
