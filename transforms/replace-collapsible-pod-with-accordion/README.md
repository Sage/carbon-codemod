# replace-collapsible-pod-with-accordion

The `collapsed` prop of the Pod component has been deprecated in favour of placing an Accordion inside the Pod Content. This codemod removes all `collapsed` prop instances and places an `Accordion` with the `expanded` prop inside the Pod Content. Title and subtitle props will be also moved to replicate previous functionality.

```diff
import Pod from "carbon-react/lib/components/pod";

+ import { Accordion } from "carbon-react/lib/components/accordion";

- <Pod title="Title" subtitle="subtitle" collapsed>pod content</Pod>
+ <Pod><Accordion borders="none" title="Title" subtitle="subtitle">pod content</Accordion></Pod>
```

It's likely that props might be assigned in a different manners, therefore this codemod accounts for several prop patterns.

```js
<Pod collapsed title="Title" subtitle="subtitle" />
```

```js
const collapsed = true;
const title = "Title";

<Pod collapsed={collapsed} title={title} subtitle={subtitle} />;
```

```js
const props = {
  collapsed: true,
  title: "Title",
  subtitle: "subtitle"
};

<Pod {...props} />;
```

```js
<Pod {...{ collapsed: true, title: "Title", subtitle: "subtitle" }} />
```

```js
const value = true;

<Pod {...{ collapsed: value }} />;
```

If there is a pattern that you use that is not transformed, please file a feature request.

## Usage

`npx carbon-codemod replace-collapsible-pod-with-accordion <target>`

### Example

`npx carbon-codemod replace-collapsible-pod-with-accordion src`
