import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
import AppWrapper from "carbon-react/lib/components/app-wrapper";
import FooWrapper from "carbon-react/lib/components/foo-wrapper";

export default (props) => {
  const content = (props) => (
    <FooWrapper> 
      { props.children }
    </FooWrapper> 
  );

  return (
    <DialogFullScreen><AppWrapper>
      { content }
      </AppWrapper></DialogFullScreen>
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
    <DialogFullScreen><AppWrapper>
      { content }
      </AppWrapper></DialogFullScreen>
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
    <DialogFullScreen><AppWrapper>
      { content }
      </AppWrapper></DialogFullScreen>
  );
}

export const ExpressionJSXContainer = (props) => {
  const content = (
    <FooWrapper>
      { props.children }
    </FooWrapper>
  );

  return (
    <DialogFullScreen><AppWrapper>
      { content }
      </AppWrapper></DialogFullScreen>
  );
}
