import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
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
    <DialogFullScreen>
      { content(props) }
    </DialogFullScreen>
  );
}