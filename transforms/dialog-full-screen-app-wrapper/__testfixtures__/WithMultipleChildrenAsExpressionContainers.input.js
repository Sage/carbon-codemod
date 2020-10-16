import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
import AppWrapper from "carbon-react/lib/components/app-wrapper";

export default (props) => {
  const content = (props) => (
    <AppWrapper>
      { props.children }
    </AppWrapper> 
  );

  const content2 = (props) => (
    <AppWrapper>
      { props.children }
    </AppWrapper> 
  );

  return (
    <DialogFullScreen>
      { content(props) }
      { content2(props) }
    </DialogFullScreen>
  );
}