import { GridContainer, GridItem } from "carbon-react/lib/components/grid";

const WithPropsSpreadFromDeclarationScope = () => {
  const rowProps = {
    gridGap: "15px",
    gridTemplateColumns: "repeat(5, 1fr)",
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

export default WithPropsSpreadFromDeclarationScope;
