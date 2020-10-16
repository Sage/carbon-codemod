import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
import FooWrapper from "carbon-react/lib/components/app-wrapper";

export default ({ children }) => <FooWrapper><DialogFullScreen><FooWrapper>{ children }</FooWrapper></DialogFullScreen></FooWrapper>;
