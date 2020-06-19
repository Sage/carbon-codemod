# deprecate-create

The `Create` component has been deprecated in favour of full width `Button`'s. This codemod will convert usages of the `Create` component to a `Button`.

```diff
- import Create from "carbon-react/lib/components/create";
+ import Button from "carbon-react/lib/components/button";

- <Create>Resource name</Create>
+ <Button buttonType=“dashed” iconType=“plus” iconPosition=“after” fullWidth>Resource name</Button>
```

This codemod accounts for the following patterns. Note that any existing props on `Create` will be maintained. If a `Button` import already exists in a file, a new one will not be added.

```js
<Create />;
```

```js
<Create className="test-class" onClick={callback} />
```

```js
<Create>Resource Name</Create>;
```

```js
<Create className="test-class" onClick={() => undefined}>Resource Name</Create>
```

If there is a pattern that you use that is not covered here, please file a feature request.

## Usage

`npx carbon-codemod deprecate-create <target>`