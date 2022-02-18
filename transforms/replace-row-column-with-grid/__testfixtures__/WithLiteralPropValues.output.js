import { GridContainer, GridItem } from "carbon-react/lib/components/grid";

const WithLiteralPropValues = () => (
  <GridContainer gridGap="15px" gridTemplateColumns="repeat(10, 1fr)" columnDivide>
    <GridItem justifySelf="start" gridColumn="2 / span 3">col1</GridItem>
    <GridItem justifySelf="center" gridColumn="span 2">col2</GridItem>
    <GridItem justifySelf="center" gridColumn="span 2">col3</GridItem>
    <GridItem justifySelf="end" gridColumn="span 2">col4</GridItem>
  </GridContainer>
);

export default WithLiteralPropValues;
