import { Row } from "carbon-react/lib/components/row";
import { Column } from "carbon-react/lib/components/row";

const WithPropsDeclaredInOpeningElement = (otherProp) => {
  return (
    <Row {...{gutter: "medium", columns: "8"}}>
      <Column {...{columns: "8", columnAlign: "left", columnSpan:"3", columnOffset:"1"}}>col1</Column>
      <Column {...{columns: "8", columnAlign: "center", columnSpan:"2" }}>col2</Column>
      <Column {...{columns: "8", columnAlign: "right", columnSpan:"2" }}>col3</Column>
    </Row>
    );
};

export default WithPropsDeclaredInOpeningElement;
