import { Row, Column } from "carbon-react/lib/components/row";

const WithLiteralPropValues = () => (
  <Row gutter="medium" columns="10" columnDivide>
    <Column columns="10" columnAlign="left" columnSpan="3" columnOffset="1">col1</Column>
    <Column columns="10" columnAlign="center" columnSpan="2">col2</Column>
    <Column columns="10" columnAlign="middle" columnSpan="2">col3</Column>
    <Column columns="10" columnAlign="right" columnSpan="2">col4</Column>
  </Row>
);

export default WithLiteralPropValues;
