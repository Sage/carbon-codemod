import { Row, Column } from "carbon-react/lib/components/row";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";

const WithGridImport = () => (
  <>
    <Row gutter="medium" columns="7" columnDivide>
      <Column columns="foo">col1</Column>
      <Column columns="7">col2</Column>
      <Column columns="7">col3</Column>
    </Row>
    <GridContainer gridGap="15px" gridTemplateColumns="repeat(7, 1fr)">
      <GridItem>col1</GridItem>
      <GridItem>col2</GridItem>
      <GridItem>col3</GridItem>
    </GridContainer>
  </>
);

export default WithGridImport;
