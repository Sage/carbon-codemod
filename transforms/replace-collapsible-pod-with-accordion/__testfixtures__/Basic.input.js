import Pod from "carbon-react/lib/components/pod";

const Basic = ({ children }) => <Pod title="Title" subtitle="subtitle" collapsed>{children}</Pod>;

const WithBooleanValue = ({ children }) => <Pod title="Title" subtitle="subtitle" collapsed={true}>{children}</Pod>;

const WithCollapsedBasedOnProp = ({ children, closed }) => <Pod title="Title" subtitle="subtitle" collapsed={closed}>{children}</Pod>;

const WithCollapsedSetToFalse = ({ children }) => <Pod title="Title" subtitle="subtitle" collapsed={false}>{children}</Pod>;

const WithTitlePassed = ({ children, title }) => <Pod title={title} subtitle="subtitle" collapsed>{children}</Pod>;

const WithoutTitleProp = ({ children }) => <Pod collapsed>{children}</Pod>;

const WithoutCollapsedProp = ({ children }) => <Pod title="Title" subtitle="subtitle">{children}</Pod>;
