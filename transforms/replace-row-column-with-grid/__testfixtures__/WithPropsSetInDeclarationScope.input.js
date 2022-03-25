
import { Row, Column } from "carbon-react/lib/components/row";

const WithPropsSetInDeclarationScope = ({ largeGutter, threeColumns }) => {
  let gutterSize = "medium";
  let columnsCount = 7;

  gutterSize = "small"
  
  if (largeGutter) {
    gutterSize = "large";
  }

  if (threeColumns) {
    columnsCount = 3;
  }

  return (
    <Row gutter={gutterSize} columns={columnsCount}>
      <Column columns={7}>col1</Column>
      <Column columns={7}>col2</Column>
      <Column columns={7}>col3</Column>
    </Row>
  );
};

export default WithPropsSetInDeclarationScope;
