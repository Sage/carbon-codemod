import Pod from "carbon-react/lib/components/pod";
import { Accordion } from "carbon-react/lib/components/accordion";

const WithAccordion = ({ children }) => {
  return <>
    <Pod title="Title" collapsed>{children}</Pod>
    <Accordion>accordion content</Accordion>
  </>;
};
