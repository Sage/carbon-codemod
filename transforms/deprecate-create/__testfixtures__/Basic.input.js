import Create from "carbon-react/lib/components/create";
export default () => <Create />;
export const withProps = () => <Create className="test-class" onClick={() => undefined} />;
