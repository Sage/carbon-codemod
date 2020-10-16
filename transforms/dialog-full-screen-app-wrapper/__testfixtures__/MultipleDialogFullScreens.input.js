import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
import AppWrapper from "carbon-react/lib/components/app-wrapper";

export default ({ children }) => <DialogFullScreen><AppWrapper>{ children }</AppWrapper></DialogFullScreen>;

export const dialogToBeUpdated = ({ children }) => <DialogFullScreen>{ children }</DialogFullScreen>;

export const dialogSelfClosed = ({ children }) => <DialogFullScreen { ...{ children } }/>;

export const dialogWithinDialog = ({ children }) => <DialogFullScreen><DialogFullScreen>{ children }</DialogFullScreen></DialogFullScreen>;

const content = (children) => (
  <div>
    { children }
  </div>
);

export const Test = ({ children }) => <DialogFullScreen>{ content(children) }</DialogFullScreen>;
