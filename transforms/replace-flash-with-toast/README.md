# replace-flash-with-toast

The `Flash` component has been deprecated in favour of `Toast` component. This codemod converts all `Flash` instances to `Toast`

```diff
- import Flash from "carbon-react/lib/components/flash";
+ import Toast from "carbon-react/lib/components/toast";

- <Flash message="hello" />
+ <Toast variant="success" isCenter>hello</Toast>
```

It's likely that props might be assigned in a different manners, therefore this codemod accounts for several prop patterns.

```js
<Flash prop="something" />
```

```js
<Flash prop={"something"} />
```

```js
const value = "something";

<Flash prop={value} />;
```

```js
const props = { prop: "something" };

<Flash {...props} />;
```

```js
<Flash {...{ prop: "something" }} />
```

```js
const prop = "something";

<Flash {...{ prop }} />;
```

```js
const value = "something";

<Flash {...{ prop: value }} />;
```

If there is a pattern that you use that is not transformed, please file a feature request.

## Usage

`npx carbon-codemod replace-flash-with-toast <target>`

### Example

`npx carbon-codemod replace-prop-value src`
