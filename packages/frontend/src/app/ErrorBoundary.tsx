import React, { Component } from 'react';
import type { ReactNode } from 'react';

interface FallbackProps {
  onReset: () => void;
  errorMessage?: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ReactElement<FallbackProps>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return React.isValidElement(this.props.fallback) ? (
        React.cloneElement(this.props.fallback, {
          onReset: this.resetError,
          errorMessage: this.state.error?.message,
        })
      ) : (
        <h1>Что-то пошло не так.</h1>
      );
    }
    return this.props.children;
  }
}
