# add-prop

This universal codemod provides possibility to add any prop to any component.

```diff
- <Component />
+ <Component newProp="info" />

```
## Usage

`npx carbon-codemod add-prop <target> <component-import-path> <prop> <value>`

### Examples

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