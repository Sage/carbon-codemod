import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
import AppWrapper from "carbon-react/lib/components/app-wrapper";

export default (props) => {
  const content = (props) => (
    <AppWrapper> 
      { props.children }
    </AppWrapper> 
  );

  return (
    <DialogFullScreen> 
      { content }
    </DialogFullScreen>
  );
}

export const ExpressionContainerWithReturn = (props) => {
  const content = function(props) {
    return (
      <AppWrapper> 
        { props.children }
      </AppWrapper> 
    );
  };

  return (
    <DialogFullScreen> 
      { content }
    </DialogFullScreen>
  );
}

export const ExpressionContainerWithArrowAndReturn = (props) => {
  const content = (props) => {
    return (
      <AppWrapper> 
        { props.children }
      </AppWrapper> 
    );
  };

  return (
    <DialogFullScreen> 
      { content }
    </DialogFullScreen>
  );
}
