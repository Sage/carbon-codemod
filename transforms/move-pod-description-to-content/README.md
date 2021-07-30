# move-pod-description-to-content

The `description` prop of the `Pod` Component has been deprecated in favour of placing a customized `Typography` Component inside the `Pod` Content. This codemod removes all `description` prop instances and places a `Typography` inside the `Pod` Content or inside the `Accordion` content in case of collapsible `Pod`.

```diff
import Pod from "carbon-react/lib/components/pod";

+ import Typography from "carbon-react/lib/components/typography";

- <Pod title="Title" subtitle="subtitle" description="Description">pod content</Pod>
+ <Pod title="Title" subtitle="subtitle"><Typography as="div" fontSize="13px" lineHeight="normal">Description</Typography>pod content</Pod>
```

```diff
import Pod from "carbon-react/lib/components/pod";

+ import Typography from "carbon-react/lib/components/typography";

import { Accordion } from "carbon-react/lib/components/accordion";

- <Pod description="Description"><Accordion borders="none" title="Title" subtitle="subtitle">pod content</Accordion></Pod>
+ <Pod><Accordion borders="none" title="Title" subtitle="subtitle"><Typography as="div" fontSize="13px" lineHeight="normal">Description</Typography>pod content</Accordion></Pod>
```

It's likely that props might be assigned in a different manners, therefore this codemod accounts for several prop patterns.

```js
<Pod description="Description" />
```

```js
const description = "Description";

<Pod description={description} />;
```

```js
const props = { description: "Description" };

<Pod {...props} />;
```

```js
<Pod {...{ description: "Description" }} />
```

```js
const value = "Description";

<Pod {...{ description: value }} />;
```

If there is a pattern that you use that is not transformed, please file a feature request.

## Usage

`npx carbon-codemod move-pod-description-to-content <target>`

### Example

`npx carbon-codemod move-pod-description-to-content src`
