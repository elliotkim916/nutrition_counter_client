import React from 'react';
import '../../index.scss';

const Loading = () => {
  return (
    <div className="loading-container">
      <h3 className="loading-header">Loading ...</h3>
      <div className="loader"></div> 
    </div>
  );
}

export default Loading;