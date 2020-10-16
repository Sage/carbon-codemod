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
    <DialogFullScreen><AppWrapper>
      { content(props) }
      { content2(props) }
      </AppWrapper></DialogFullScreen>
  );
}