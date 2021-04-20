# add-prop

This universal codemod provides possibility to add any prop to any component.

```diff
- <Component />
+ <Component newProp="info" />

```

## Usage

### Components imported as a default import:

`npx carbon-codemod add-prop <target> <component-import-path> <prop> <value>`

`npx carbon-codemod add-prop src carbon-react/lib/components/button newProp "info"`

### Components imported as a named import:

`npx carbon-codemod add-prop <target> <component-import-path> <prop> <value> -i <component-import-name>`

`npx carbon-codemod add-prop src carbon-react/lib/components/accordion newProp "info" -i Accordion`

## Examples

### String

`npx carbon-codemod add-prop src carbon-react/lib/components/button ml "16px"`

```diff
- <Button>Button</Button>
+ <Button ml="16px">Button</Button>
```

### Number

`npx carbon-codemod add-prop src carbon-react/lib/components/button ml 2`

```diff
- <Button>Button</Button>
+ <Button ml={2}>Button</Button>
```

### Boolean - True

`npx carbon-codemod add-prop src carbon-react/lib/components/button hasBorder true`

```diff
- <Button>Button</Button>
+ <Button hasBorder>Button</Button>
```

### Boolean - False

`npx carbon-codemod add-prop src carbon-react/lib/components/button hasBorder false`

```diff
- <Button>Button</Button>
+ <Button hasBorder={false}>Button</Button>
```
