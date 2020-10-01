# remove-prop

This universal codemod provides possibility to remove any prop from any component

```diff
- <Component old="info" />
+ <Component />
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

`npx carbon-codemod remove-prop <target> <component-import-path> <prop>`

### Example

`npx carbon-codemod remove-prop src carbon-react/lib/components/button buttonType`

```js
import Button from "carbon-react/lib/components/button";
```
```diff
- <Button buttonType="primary>Button</Button>
+ <Button>Button</Button>
```