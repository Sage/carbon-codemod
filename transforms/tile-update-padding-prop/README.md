# tile-update-padding-prop

In order to accomodate the `styled-system` spacing api being added to Carbon components, the `padding` prop on `Tile` has been replaced with `p`. 

Currently `padding` accepts the values `XS`, `S`, `M`, `L` and `XL` which map to paddings of `8px` up to `40px`. This codemod will replace these with the `styled-system` equivalent. I.e. for `padding="XS"` this will be `p={1}`, both of which map to `8px`.

```diff
- <Tile padding="XS">Content</Tile>
+ <Tile p={1}>Content</Tile>
```

If there is a pattern that you use that is not transformed, please file a feature request.

## Usage 

`npx carbon-codemod tile-update-padding-prop <target>`
