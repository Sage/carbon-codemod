# button-destructive

In order to add secondary and tertiary buttons to carbon-react, the `destructive` buttonType has been replaced with a dedicated prop.

```diff
- <Button buttonType="destructive">My Button</Button>
+ <Button buttonType="primary" destructive>My Button</Button>
```

It's likely that Button has significant usage, therefore this codemod accounts for several prop patterns.

```js
<Button buttonType="destructive">My Button</Button>
```

```js
<Button buttonType={"destructive"}>My Button</Button>
```

```js
<Button buttonType={buttonType}>My Button</Button>
```

```js
<Button {...props}>My Button</Button>
```

```js
<Button {...{ buttonType: "destructive" }}>My Button</Button>
```

```js
<Button {...{ buttonType }}>My Button</Button>
```

```js
<Button {...{ buttonType: type }}>My Button</Button>
```

If there is a pattern that you use that is not covered here, please file a feature request.

## Usage

`npx carbon-codemod button-destructive <target>`
