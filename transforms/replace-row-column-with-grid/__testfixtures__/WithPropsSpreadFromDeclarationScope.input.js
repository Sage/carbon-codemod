import { Row, Column } from "carbon-react/lib/components/row";

const WithPropsSpreadFromDeclarationScope = () => {
  const rowProps = {
    gutter: "medium",
    columns: 5,
    columnDivide: true,
  };

  return (
    <Row {...rowProps}>
      <Column columns={rowProps.columns}>col1</Column>
      <Column columns={rowProps.columns}>col2</Column>
      <Column columns={rowProps.columns}>col3</Column>
    </Row>
  );
}

export default WithPropsSpreadFromDeclarationScope;
