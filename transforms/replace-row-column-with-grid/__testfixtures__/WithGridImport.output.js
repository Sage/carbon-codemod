import { GridContainer, GridItem } from "carbon-react/lib/components/grid";

const WithGridImport = () => (
  <>
    <GridContainer gridGap="15px" gridTemplateColumns="repeat(7, 1fr)" columnDivide>
      <GridItem>col1</GridItem>
      <GridItem>col2</GridItem>
      <GridItem>col3</GridItem>
    </GridContainer>
    <GridContainer gridGap="15px" gridTemplateColumns="repeat(7, 1fr)">
      <GridItem>col1</GridItem>
      <GridItem>col2</GridItem>
      <GridItem>col3</GridItem>
    </GridContainer>
  </>
);

export default WithGridImport;
