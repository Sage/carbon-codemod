import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
import AppWrapper from "carbon-react/lib/components/app-wrapper";

export default ({ children }) => <DialogFullScreen><AppWrapper>{ children }</AppWrapper></DialogFullScreen>;

export const dialogToBeUpdated = ({ children }) => <DialogFullScreen><AppWrapper>{ children }</AppWrapper></DialogFullScreen>;

export const dialogSelfClosed = ({ children }) => <DialogFullScreen { ...{ children } }/>;

export const dialogWithinDialog = ({ children }) => <DialogFullScreen><AppWrapper><DialogFullScreen><AppWrapper>{ children }</AppWrapper></DialogFullScreen></AppWrapper></DialogFullScreen>;

const content = (children) => (
  <div>
    { children }
  </div>
);

export const Test = ({ children }) => <DialogFullScreen><AppWrapper>{ content(children) }</AppWrapper></DialogFullScreen>;
