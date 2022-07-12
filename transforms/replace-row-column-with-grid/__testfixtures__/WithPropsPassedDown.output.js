import { GridContainer, GridItem } from "carbon-react/lib/components/grid";

const WithPropsPassedDown = (gutter, columns, otherProp) => {
  return (
    <GridContainer {...{gridGap: gutter, gridTemplateColumns: `repeat(${columns}, 1fr)`}}>
      <GridItem {...{
        otherProp
      }}>col1</GridItem>
      <GridItem>col2</GridItem>
      <GridItem>col3</GridItem>
    </GridContainer>
  );
};

export default WithPropsPassedDown;
