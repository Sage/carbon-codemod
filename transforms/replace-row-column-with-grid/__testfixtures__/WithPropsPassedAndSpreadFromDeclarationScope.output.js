import { GridContainer, GridItem } from "carbon-react/lib/components/grid";

const WithPropsPassedAndSpreadFromDeclarationScope = ({gutterSize, columnsCount}) => {
  const rowProps = {
    gridGap: gutterSize,
    gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
    columnDivide: true,
  };

  return (
    <GridContainer {...rowProps}>
      <GridItem>col1</GridItem>
      <GridItem>col2</GridItem>
      <GridItem>col3</GridItem>
    </GridContainer>
  );
}

export default WithPropsPassedAndSpreadFromDeclarationScope;
