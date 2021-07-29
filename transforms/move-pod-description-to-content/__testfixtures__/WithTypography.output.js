import Pod from "carbon-react/lib/components/pod";
import Typography from "carbon-react/lib/components/typography";

const WithTypography = ({ children }) => {
  return <>
    <Pod title="Title"><Typography data-element="description" as="div" fontSize="13px" lineHeight="normal">Description</Typography>{children}</Pod>
    <Typography>accordion content</Typography>
  </>;
};
