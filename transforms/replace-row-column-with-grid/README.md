# replace-row-column-with-grid

The `Row` and `Column` components have been deprecated in favour of `GridContainer` and `GridItem` components respectively. This codemod converts all `Row` and `Column` instances to `GridContainer` and `GridItem`

The codemod will also replace `Row` props with their `GridContainer` equivalents:

- `gutter` will be changed to `gridGap`
- `columns` will be changed to `gridTemplateColumns`

and `Column` props with their `GridItem` equivalents:

- `columnSpan` will be changed to `gridColumn`
- `columnOffset` will be removed and the offset added to `gridColumn`
- `columnAlign` will be changed to `justifySelf`

For column props, only literal values will be changed, e.g.:`prop={3}`, `prop="3"`, `{...{ prop: 3 }}`, `{...{ prop: "3" }}`.
A codemod to replace these column values passed as variabled would be too complex, so in that case, these props should be addressed manually.

```diff
- import { Row, Column } from "carbon-react/lib/components/row";
+ import { GridContainer, GridItem } from "carbon-react/lib/components/grid";

- <Row gutter="medium" columns="10" columnDivide>
-   <Column columns="10" columnAlign="left" columnSpan="3" columnOffset="1">col1</Column>
-   <Column columns="10" columnAlign="center" columnSpan="2">col2</Column>
-   <Column columns="10" columnAlign="middle" columnSpan="2">col3</Column>
-   <Column columns="10" columnAlign="right" columnSpan="2">col4</Column>
- </Row>
+ <GridContainer gridGap="15px" gridTemplateColumns="repeat(10, 1fr)" columnDivide>
+   <GridItem justifySelf="start" gridColumn="2 / span 3">col1</GridItem>
+   <GridItem justifySelf="center" gridColumn="span 2">col2</GridItem>
+   <GridItem justifySelf="center" gridColumn="span 2">col3</GridItem>
+   <GridItem justifySelf="end" gridColumn="span 2">col4</GridItem>
+ </GridContainer>
```

This codemod could not convert `gutter` value that is passed down from the parent component, that value must be manually corrected based on the table below:
| `gutter` | `gridGap` |
| --- | --- |
| "extra-small" | "2px" |
| "small" | "5px" |
| "medium-small" | "10px" |
| "medium" | "15px" |
| "medium-large" | "30px" |
| "large" | "60px" |
| "extra-large" | "90px" |
| "none" | "0" |

The `Row` component `columnDivide` prop functionality could not be replicated in `GridContainer` and replication of that functionality should be addressed manually.

It's likely that props might be assigned in a different manners, therefore this codemod accounts for several prop patterns.

```js
<Row gutter="medium" columns="5">
  <Column columns="5" columnSpan="3" columnAlign="left">
    ...
  </Column>
</Row>
```

```js
<Row {...{ gutter: "medium", columns: "5" }}>
  <Column {...{ columns: "5", columnSpan: "3", columnAlign: "left" }}>
    ...
  </Column>
</Row>
```

```js
const gutter = "medium";
const columns = "5";
const columnSpan = "3";
const columnAlign = "left";

<Row gutter={gutter} columns={columns}>
  <Column columns={columns} columnSpan={columnSpan} columnAlign={columnAlign}>
    ...
  </Column>
</Row>;
```

```js
const rowProps = {
  gutter: "medium",
  columns: "5",
};

<Row {...rowProps}>
  <Column columns={columns} columnSpan={columnSpan} columnAlign={columnAlign}>
    ...
  </Column>
</Row>;
```

```js
const gutter = "medium";
const columns = "5";
const columnSpan = "3";
const columnAlign = "left";

<Row {...{ gutter, columns }}>
  <Column {...{ columns, columnSpan, columnAlign }}>...</Column>
</Row>;
```

```js
const foo = "medium";
const bar = "5";
const baz = "3";
const qux = "left";

<Row {...{ gutter: foo, columns: bar }}>
  <Column {...{ columns: bar, columnSpan: baz, columnAlign: qux }}>...</Column>
</Row>;
```

If there is a pattern that you use that is not transformed, please file a feature request.

## Usage

`npx carbon-codemod replace-row-column-with-grid <target>`

### Example

`npx carbon-codemod replace-row-column-with-grid src`
