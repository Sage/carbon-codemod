# carbon-codemod [![Travis Status](https://travis-ci.org/Sage/carbon-codemod.svg?branch=master)](https://travis-ci.org/Sage/carbon-codemod) [![npm](https://img.shields.io/npm/v/carbon-codemod.svg)](https://www.npmjs.com/package/carbon-codemod)

This is a collection of codemods that help you upgrade to a new version of `carbon-react`.
The release notes of `carbon-react` will indicate which codemod you should use.

## Usage

```
npx carbon-codemod <name-of-codemod> <target>
```

- [`button-destructive`](./transforms/button-destructive)
- [`deprecate-create`](./transforms/deprecate-create)
- [`message-rename-as-to-variant`](./transforms/message-rename-as-to-variant)

Note that `<target>` is worked out relative to the current working directory.

## Development

`carbon-codemod` is a wrapper around [`jscodeshift`](https://github.com/facebook/jscodeshift).

### Running locally

- `npm link`
- `cd my-other-project`
- `npm link carbon-codemod`
- `npx carbon-codemod <name-of-codemod> <target>`

### Debugging

- `node --inspect-brk ./bin/carbon-codemod`

You can use [astexplorer.net](https://astexplorer.net/) to help understand the existing structure of files. You should use the following settings:

- parser: `esprima`
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

### Releasing

- This project publishes using [`semantic-release`](https://semantic-release.gitbook.io/semantic-release/).
- It follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
- When a pull request is merged to master [Travis CI](https://travis-ci.org/Sage/carbon-codemod) will run `semantic-release`.
- `semantic-release` will decide, based on the commits that have been merged, if a new release
  is required.
- If a new release is required, a new version will be published to [npm](https://www.npmjs.com/package/carbon-codemod) and [GitHub releases](https://github.com/Sage/carbon-codemod/releases).
