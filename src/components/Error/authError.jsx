import React from 'react';
import {connect} from 'react-redux';
import '../../index.scss';

const AuthError = props => {
  return (
    <div className="error-container">
      <div className="error-form">
        <h3 className="error-message">{props.authErrorMessage}</h3>
        <button 
          type="button" 
          className="login-btn" 
          onClick={() => props.dispatch(props.clearError())}
        >
          Okay
        </button>
      </div>
    </div> 
  );
}

export default connect()(AuthError);