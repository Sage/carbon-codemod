# message-remove-classic-theme

In order to simplify the `Message` api in carbon-react
* the `as` prop has been renamed to `variant`
* the `roundedCorners` prop has been removed

```diff
- <Message as="info" roundedCorners border={false}>My Message</Message>
+ <Message variant="info">My Message</Message>
```

If there is a pattern that you use that is not transformed, please file a feature request.

## Usage

`npx carbon-codemod message-remove-classic-theme <target>`
