# message-rename-as-to-variant

In order to simplify the `Message` api in carbon-react, the `as` prop has been renamed to `variant`.

```diff
- <Message as="info">My Message</Button>
+ <Message variant="info">My Message</Button>
```

If there is a pattern that you use that is not transformed, please file a feature request.

## Usage

`npx carbon-codemod message-rename-as-to-variant <target>`
