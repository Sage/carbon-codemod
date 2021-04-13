# rename-prop

This universal codemod provides possibility to replace any prop with a new one in any component

```diff
- <Component old="info" />
+ <Component new="info" />
```

It's likely that props might be assigned in a different manners, therefore this codemod accounts for several prop patterns.

```js
<Component old="old" />
```

```js
<Component old={"old"} />
```

```js
<Component old={old} />
```

```js
<Component {...props} />
```

```js
<Component {...{ old: "old" }} />
```

```js
<Component {...{ old }} />
```

```js
<Component {...{ old: oldType }} />
```

If there is a pattern that you use that is not transformed, please file a feature request.

## Usage

### Components imported as a default import:

`npx carbon-codemod rename-prop <target> <component-import-path> <old-prop> <new-prop>`

`npx carbon-codemod rename-prop src carbon-react/lib/components/button oldProp newProp`

### Components imported as a named import:

`npx carbon-codemod rename-prop <target> <component-import-path> <old-prop> <new-prop> -i <component-import-name>`

`npx carbon-codemod rename-prop src carbon-react/lib/components/accordion oldProp newProp -i Accordion`

## Example

`npx carbon-codemod rename-prop src carbon-react/lib/components/button buttonType variant`

```js
import Button from "carbon-react/lib/components/button";
```

```diff
- <Button buttonType="primary>Button</Button>
+ <Button variant="primary">Button</Button>
```
