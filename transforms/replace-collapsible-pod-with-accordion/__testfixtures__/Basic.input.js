import Pod from "carbon-react/lib/components/pod";

const Basic = ({ children }) => <Pod title="Title" collapsed>{children}</Pod>;

const WithStringValue = ({ children }) => <Pod title="Title" collapsed="collapsed">{children}</Pod>;

const WithBooleanValue = ({ children }) => <Pod title="Title" collapsed={true}>{children}</Pod>;

const WithCollapsedBasedOnProp = ({ children, open }) => <Pod title="Title" collapsed={open}>{children}</Pod>;

const WithoutTitleProp = ({ children }) => <Pod collapsed>{children}</Pod>;

const WithoutCollapsedProp = ({ children }) => <Pod title="Title">{children}</Pod>;
