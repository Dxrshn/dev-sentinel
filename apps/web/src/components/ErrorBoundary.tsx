"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="text-lg font-semibold text-red-900">Something went wrong</div>
          <p className="mt-2 text-sm text-red-700">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <button
            className="mt-4 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm text-red-700 hover:bg-red-100"
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
