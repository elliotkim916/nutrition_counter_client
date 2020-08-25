import React from 'react';
import { connect } from 'react-redux';
import '../../index.scss';

const Error = ({ errorMessage, dispatch, clearError }) => {
  return (
    <div className="backdrop">
      <div className="backdrop-form">
        <img
          src="https://img.icons8.com/clouds/100/000000/sad.png"
          alt="sad face"
        ></img>
        <br />
        <h3 className="error-message">{errorMessage}</h3>
        <button
          type="button"
          className="login-btn"
          onClick={() => dispatch(clearError())}
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default connect()(React.memo(Error));
