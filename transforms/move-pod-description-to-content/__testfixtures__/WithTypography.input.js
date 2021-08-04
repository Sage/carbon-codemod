import Pod from "carbon-react/lib/components/pod";
import Typography from "carbon-react/lib/components/typography";

const WithTypography = ({ children }) => {
  return <>
    <Pod description="Description" title="Title">{children}</Pod>
    <Typography>accordion content</Typography>
  </>;
};
