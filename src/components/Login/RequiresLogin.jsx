import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default () => (Component) => {
  function RequiresLogin(props) {
    const { authenticating, loggedIn, error, ...passThroughProps } = props;
    if (authenticating) {
      return <Loading loadingMessage="Logging in.." />;
    } else if (!loggedIn || error) {
      return <Redirect to="/" />;
    }
    return <Component {...passThroughProps} />;
  }

  const mapStateToProps = (state, props) => ({
    authenticating: state.authReducer.loading,
    loggedIn: state.authReducer.currentUser !== null,
    error: state.authReducer.error,
  });

  return connect(mapStateToProps)(RequiresLogin);
};
