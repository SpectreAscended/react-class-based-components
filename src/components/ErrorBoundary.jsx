import { Component } from 'react';

// If you want to build an error boundary it MUST be a class based component.  This componentDidCatch lifecycle method will be triggered whenever a child element throws an error.  We wrap our ErrorBoundary component around components which should be protected by this ErrorBoundary component.  We can wrap more than one component with this.

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    console.error(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
