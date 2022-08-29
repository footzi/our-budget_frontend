import { Alert, Typography } from 'antd';
import React from 'react';

import { ErrorBoundaryProps, ErrorBoundaryState } from './interfaces';

export class ErrorBoundary extends React.Component<
  React.PropsWithRef<React.PropsWithChildren<ErrorBoundaryProps>>,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { isError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { isError: true, message: error.message };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
  }

  render() {
    const { isError, message } = this.state;

    if (isError) {
      return (
        <Alert
          message="Упс:( Произошла ошибка"
          description={<Typography.Text type="secondary">Текст ошибки : {message}</Typography.Text>}
          type="error"
          closable
          showIcon
        />
      );
    }

    return this.props.children;
  }
}
