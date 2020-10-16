import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
import AppWrapper from "carbon-react/lib/components/app-wrapper";
import FooWrapper from "carbon-react/lib/components/foo-wrapper";

export const ExpressionContainerFunctionDeclaration = (props) => {
  function content(props) {
    return (
      <FooWrapper> 
        { props.children }
      </FooWrapper> 
    );
  };

  return (
    <DialogFullScreen><AppWrapper>
      { content(props) }
      </AppWrapper></DialogFullScreen>
  );
}