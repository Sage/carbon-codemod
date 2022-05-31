import { Row, Column } from "carbon-react/lib/components/row";

const WithPropsPassedDown = (gutter, columns, otherProp) => {
  return (
    <Row {...{gutter, columns}}>
      <Column {...{columns, otherProp}}>col1</Column>
      <Column>col2</Column>
      <Column>col3</Column>
    </Row>
    );
};

export default WithPropsPassedDown;
