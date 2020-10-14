# replace-prop-value

This universal codemod provides possibility to replace any prop value in any component

```js
import Component from "carbon-react/lib/components/component";
```
```diff
- <Component prop="something" />
+ <Component prop="something different" />
```

It's likely that props might be assigned in a different manners, therefore this codemod accounts for several prop patterns.

```js
<Component prop="something" />
```

```js
<Component prop={"something"} />
```

```js
const value = "something";

<Component prop={value} />
```

```js
const props = { prop: "something" };

<Component {...props} />
```

```js
<Component {...{ prop: "something" }} />
```

```js
const prop = "something";

<Component {...{ prop }} />
```

```js
const value = "something";

<Component {...{ prop: value }} />
```

If there is a pattern that you use that is not transformed, please file a feature request.

## Usage

`npx carbon-codemod replace-prop-value <target> <component-import-path> <prop> <old-value> <new-value>`

Note: To use a numeric value as a string as `old-value` or `new-value`, format it as `\"string\"` on the command line, i.e.: 

`npx carbon-codemod replace-prop-value src carbon-react/lib/components/tile padding \"2\" \"3\"`

### Examples

`npx carbon-codemod replace-prop-value src carbon-react/lib/components/tile padding 2 4`
`npx carbon-codemod replace-prop-value src carbon-react/lib/components/tile padding XL 10px`
