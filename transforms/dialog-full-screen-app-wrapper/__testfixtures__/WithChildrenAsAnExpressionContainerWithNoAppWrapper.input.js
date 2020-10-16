import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
import FooWrapper from "carbon-react/lib/components/foo-wrapper";

export default (props) => {
  const content = (props) => (
    <FooWrapper> 
      { props.children }
    </FooWrapper> 
  );

  return (
    <DialogFullScreen>
      { content }
    </DialogFullScreen>
  );
}

export const ExpressionContainerVariableFunctionWithReturn = (props) => {
  const content = function(props) {
    return (
      <FooWrapper> 
        { props.children }
      </FooWrapper> 
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
      <FooWrapper> 
        { props.children }
      </FooWrapper> 
    );
  };

  return (
    <DialogFullScreen>
      { content }
    </DialogFullScreen>
  );
}

export const ExpressionJSXContainer = (props) => {
  const content = (
    <FooWrapper>
      { props.children }
    </FooWrapper>
  );

  return (
    <DialogFullScreen>
      { content }
    </DialogFullScreen>
  );
}
