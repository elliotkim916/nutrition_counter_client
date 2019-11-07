import React from 'react';
import '../../index.scss';

const Loading = props => {
  return (
    <div className="loading-container">
      <h3 className="loading-header">{props.loadingMessage}</h3>
      <div className="loader"></div> 
    </div>
  );
}

export default Loading;