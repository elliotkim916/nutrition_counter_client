import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

// A Higher-order component - used to add behavior to existing components by wrapping them in an outer component
// HOC's are tools to facilitate code reuse amongst unrelated components

// a function that returns another function that returns the wrapping React component RequiresLogin
export default () => Component => {
  function RequiresLogin(props) {
    const {authenticating, loggedIn, error, ...passThroughProps} = props;
    if (authenticating) {
      return <div>Logging in...</div>;
    } else if (!loggedIn || error) {
      return <Redirect to='/' />;
    }
    return <Component {...passThroughProps} />;
  }

  const mapStateToProps = (state, props) => ({
    authenticating: state.auth.loading,
    loggedIn: state.auth.currentUser !== null,
    error: state.auth.error
  });

  return connect(mapStateToProps)(RequiresLogin);
}