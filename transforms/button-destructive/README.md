# button-destructive

In order to add secondary and tertiary buttons to carbon-react, the `destructive` type has been replaced with a dedicated prop.

```diff
- <Button type="destructive">My Button</Button>
+ <Button type="primary" destructive>My Button</Button>
```

It's likely that Button has significant usage, therefore this codemod accounts for several prop patterns.

```js
<Button type="destructive">My Button</Button>
```

```js
<Button type={"destructive"}>My Button</Button>
```

```js
<Button type={buttonType}>My Button</Button>
```

```js
<Button {...props}>My Button</Button>
```

```js
<Button {...{ type: "destructive" }}>My Button</Button>
```

```js
<Button {...{ type }}>My Button</Button>
```

```js
<Button {...{ type: buttonType }}>My Button</Button>
```

If there is a pattern that you use that is not covered here, please file a feature request.

## Usage

`npx carbon-codemod button-destructive <target>`
