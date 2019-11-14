import React from 'react';
import '../index.scss';

export const AddSuccess = props => {
  return (
    <div className="backdrop">
      <div className="backdrop-form">
        <h3>{props.message}</h3>
        <button 
          type="button" 
          className="login-btn" 
          onClick={() => props.clearAddSuccess()}
        >
          Okay
        </button>
      </div>
    </div>
  );
};