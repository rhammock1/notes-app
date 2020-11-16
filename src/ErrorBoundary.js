import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? (
      <div>
        <h2>Something went wrong boss! Couldn't render the results</h2>
      </div>
    ) : this.props.children
  }

  
}
ErrorBoundary.propTypes = {
    children: PropTypes.array
  }

export default ErrorBoundary;