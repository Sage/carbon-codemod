# move-experimental-components

Components which previously were imported from experimental folder are no longer experimental. This codemod helps with conversion of their import paths

```diff
- import Textbox from "carbon-react/lib/__experimental__/components/textbox";
+ import Textbox from "carbon-react/lib/components/textbox";
```

## Usage

`npx carbon-codemod move-experimental-components <target>`

### Example

`npx carbon-codemod move-experimental-components src`
