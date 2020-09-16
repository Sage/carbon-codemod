# message-remove-rounded-corners

In order to simplify the `Message` api in carbon-react, the `roundedCorners` prop has been removed.

```diff
- <Message roundedCorners>My Message</Button>
+ <Message>My Message</Button>
```

If there is a pattern that you use that is not transformed, please file a feature request.

## Usage

`npx carbon-codemod message-remove-rounded-corners <target>`
