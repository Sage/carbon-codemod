import { Row, Column } from "carbon-react/lib/components/row";

const WithPropsPassedAndSpreadFromDeclarationScope = ({gutterSize, columnsCount}) => {
  const rowProps = {
    gutter: gutterSize,
    columns: columnsCount,
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

export default WithPropsPassedAndSpreadFromDeclarationScope;
