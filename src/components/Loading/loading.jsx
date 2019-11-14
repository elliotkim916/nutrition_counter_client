import React from 'react';
import '../../index.scss';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = props => {
  return (
    <div className="backdrop">
      <div className="backdrop-form">
        <h3 className="loading-header">{props.loadingMessage}</h3>
        <ClipLoader size={100} sizeUnit={"px"}/>
      </div>
    </div>
  );
}

export default Loading;