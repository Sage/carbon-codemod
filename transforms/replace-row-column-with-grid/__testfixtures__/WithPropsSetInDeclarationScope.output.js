
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";

const WithPropsSetInDeclarationScope = ({ largeGutter, threeColumns }) => {
  let gutterSize = "15px";
  let columnsCount = 7;

  gutterSize = "5px"
  
  if (largeGutter) {
    gutterSize = "60px";
  }

  if (threeColumns) {
    columnsCount = 3;
  }

  return (
    <GridContainer gridGap={gutterSize} gridTemplateColumns={`repeat(${columnsCount}, 1fr)`}>
      <GridItem>col1</GridItem>
      <GridItem>col2</GridItem>
      <GridItem>col3</GridItem>
    </GridContainer>
  );
};

export default WithPropsSetInDeclarationScope;
