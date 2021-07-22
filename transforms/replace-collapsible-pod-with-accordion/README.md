# replace-collapsible-pod-with-accordion

The `collapsed` prop of the Pod component has been deprecated in favour of placing an Accordion inside the Pod Content. This codemod removes all `collapsed` prop instances and places an `Accordion` inside the Pod Content. Title prop will be also moved to replicate previous functionality.

```diff
import Pod from "carbon-react/lib/components/pod";

+ import Accordion from "carbon-react/lib/components/accordion";

- <Pod title="Title" collapsed>pod content</Pod>
+ <Pod><Accordion borders="none" expanded title="Title">pod content</Accordion></Pod>
```

It's likely that props might be assigned in a different manners, therefore this codemod accounts for several prop patterns.

```js
<Pod prop="collapsed" title="Title" />
```

```js
const collapsed = true;
const title = "Title";

<Pod collapsed={collapsed} title={title} />;
```

```js
const props = { prop: "collapsed", title: "Title" };

<Pod {...props} />;
```

```js
<Pod {...{ prop: "collapsed", title: "Title" }} />
```

```js
const value = "collapsed";

<Pod {...{ prop: value }} />;
```

If there is a pattern that you use that is not transformed, please file a feature request.

## Usage

`npx carbon-codemod replace-collapsible-pod-with-accordion <target>`

### Example

`npx carbon-codemod replace-collapsible-pod-with-accordion`
