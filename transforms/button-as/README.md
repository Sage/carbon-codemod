# button-as

In order simplify the button interface the `as` prop has been removed. This codemod will convert the `as` prop to `buttonType`.

```diff
- <Button as="primary">My Button</Button>
+ <Button buttonType="primary">My Button</Button>
```

It's likely that Button has significant usage, therefore this codemod accounts for several prop patterns.

```js
<Button as="primary">My Button</Button>
```

```js
<Button as={"primary"}>My Button</Button>
```

```js
<Button as={buttonType}>My Button</Button>
```

```js
<Button {...props}>My Button</Button>
```

```js
<Button {...{ as: "primary" }}>My Button</Button>
```

```js
<Button {...{ as }}>My Button</Button>
```

```js
<Button {...{ as: type }}>My Button</Button>
```

If there is a pattern that you use that is not covered here, please file a feature request.

## Usage

`npx carbon-codemod button-as <target>`
