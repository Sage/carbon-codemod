import { GridContainer, GridItem } from "carbon-react/lib/components/grid";

const WithPropsDeclaredInOpeningElement = (otherProp) => {
  return (
    <GridContainer {...{gridGap: "15px", gridTemplateColumns: "repeat(8, 1fr)"}}>
      <GridItem {...{
        justifySelf: "start",
        gridColumn:"2 / span 3"
      }}>col1</GridItem>
      <GridItem {...{
        justifySelf: "center",
        gridColumn:"span 2"
      }}>col2</GridItem>
      <GridItem {...{
        justifySelf: "end",
        gridColumn:"span 2"
      }}>col3</GridItem>
    </GridContainer>
  );
};

export default WithPropsDeclaredInOpeningElement;