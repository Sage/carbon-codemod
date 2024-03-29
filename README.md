# carbon-codemod [![npm](https://img.shields.io/npm/v/carbon-codemod.svg)](https://www.npmjs.com/package/carbon-codemod)

This is a collection of codemods that help you upgrade to a new version of `carbon-react`.
The release notes of `carbon-react` will indicate which codemod you should use.

## Usage

```
npx carbon-codemod <name-of-codemod> <target>
```

- [`add-prop`](./transforms/add-prop)
- [`button-destructive`](./transforms/button-destructive)
- [`deprecate-create`](./transforms/deprecate-create)
- [`dialog-full-screen-app-wrapper`](./transforms/dialog-full-screen-app-wrapper)
- [`message-remove-classic-theme`](./transforms/message-remove-classic-theme)
- [`move-experimental-components`](./transforms/move-experimental-components)
- [`move-pod-description-to-content`](./transforms/move-pod-description-to-content)
- [`remove-prop`](./transforms/remove-prop)
- [`rename-prop`](./transforms/rename-prop)
- [`replace-collapsible-pod-with-accordion`](./transforms/replace-collapsible-pod-with-accordion)
- [`replace-flash-with-toast`](./transforms/replace-flash-with-toast)
- [`replace-prop-value`](./transforms/replace-prop-value)
- [`replace-row-column-with-grid`](./transforms/replace-row-column-with-grid)
- [`tile-update-padding-prop`](./transforms/tile-update-padding-prop)

Note that `<target>` is worked out relative to the current working directory.

Make sure that the codemod is not being run in a folder containing a `package.json` file,
as it may fail reporting missing dependencies.

For TypeScript codebase conversion use the `--typescript` option:

```
npx carbon-codemod <name-of-codemod> <target> --typescript
```

List of codemods with TypeScript support:

- [`message-remove-classic-theme`](./transforms/message-remove-classic-theme)
- [`move-experimental-components`](./transforms/move-experimental-components)
- [`rename-prop`](./transforms/rename-prop)
- [`remove-prop`](./transforms/remove-prop)
- [`replace-row-column-with-grid`](./transforms/replace-row-column-with-grid)


## Development

`carbon-codemod` is a wrapper around [`jscodeshift`](https://github.com/facebook/jscodeshift).

### Running locally

- `npm link`
- `cd my-other-project`
- `npm link carbon-codemod`
- `npx carbon-codemod <name-of-codemod> <target>`

### Debugging

To debug the CLI

- `node --inspect-brk ./bin/carbon-codemod`
- Open the command palette and select "> Debug: Attach to Node Process (preview)"
- You can add addition arguments as required e.g. `node --inspect-brk ./bin/carbon-codemod --version`

It's also possible to debug the tests

- Open the spec file
- Use `Run Current Spec` in the "Run" pane
- You can use the "Debug Console" to interact with the debugger

You can use [astexplorer.net](https://astexplorer.net/) to help understand the existing structure of files. You should use the following settings:

- parser: `esprima` for js or `@babel/parser` for TypeScript
- transform: `jscodeshift`

### Transformation Status

The return value of the function determines the status of the transformation:

| Status     | Condition                                                          | Successful         |
| ---------- | ------------------------------------------------------------------ | ------------------ |
| ok         | A string is returned and it is different from passed source        | :white_check_mark: |
| skipped    | If nothing is returned, the file is not supposed to be transformed | :white_check_mark: |
| unmodified | If a string is returned but it's the same as the source            | :x:                |
| error      | If the transform throws an Exception                               | :x:                |

### Testing

- `npm test`
- It's important to test that each codemod is idempotent.
- Use `defineTest` to write new tests, this will create a fixture test and an idempotent test.
- A codemod should convert both javascript and TypeScript projects.

### Releasing

- This project publishes using [`semantic-release`](https://semantic-release.gitbook.io/semantic-release/).
- It follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
- When a pull request is merged to master Github Actions will run `semantic-release`.
- `semantic-release` will decide, based on the commits that have been merged, if a new release
  is required.
- If a new release is required, a new version will be published to [npm](https://www.npmjs.com/package/carbon-codemod) and [GitHub releases](https://github.com/Sage/carbon-codemod/releases).
