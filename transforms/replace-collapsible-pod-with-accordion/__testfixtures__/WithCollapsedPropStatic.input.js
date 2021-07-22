import Pod from "carbon-react/lib/components/pod";

const WithCollapsedTrue = ({ children }) => <Pod title="Title" collapsed={true}>{children}</Pod>;

const WithCollapsedLiteral = ({ children }) => <Pod title="Title" collapsed="collapsed">{children}</Pod>;
