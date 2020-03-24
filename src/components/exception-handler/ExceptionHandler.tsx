import React from 'react';

type Props = {
  children: JSX.Element;
  fallback?: JSX.Element;
}

type State =  {
  caughtError: boolean;
}

export class ExceptionHandler extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { caughtError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ caughtError: true });
  }

  render() {
    if (this.state.caughtError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}
