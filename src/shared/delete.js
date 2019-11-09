import React from 'react';
import '../index.scss';

export const DeleteQuestion = props => {
  return (
    <div className="backdrop">
      <div className="backdrop-form">
        <h3>{props.question}</h3>
        <button 
          type="button" 
          className="login-btn" 
          onClick={() => props.dispatch(props.yesDelete(props.deleteId, props.option))}
        >
          Yes
        </button>
        <button 
          type="button" 
          className="login-btn" 
          onClick={() => props.dispatch(props.resetDelete())}
        >
          No
        </button>
      </div>
    </div> 
  );
};

export const DeleteSuccess = props => {
  return (
    <div className="backdrop">
      <div className="backdrop-form">
        <h3>{props.message}</h3>
        <button 
          type="button" 
          className="login-btn" 
          onClick={() => {
            props.dispatch(props.resetDelete());
            props.resetOption();
          }}
        >
          Okay
        </button>
      </div>
    </div> 
  );
};