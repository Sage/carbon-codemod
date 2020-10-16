import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
import AppWrapper from "carbon-react/lib/components/app-wrapper";

export default ({ children }) => <AppWrapper><DialogFullScreen><AppWrapper>{ children }</AppWrapper></DialogFullScreen></AppWrapper>;
