import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

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

  const displayName = Component.displayName || Component.name || 'Component';
  RequiresLogin.displayName = `RequiresLogin(${displayName})`;

  const mapStateToProps = (state, props) => ({
    authenticating: state.authReducer.loading,
    loggedIn: state.authReducer.currentUser !== null,
    error: state.authReducer.error
  });

  return connect(mapStateToProps)(RequiresLogin);
}