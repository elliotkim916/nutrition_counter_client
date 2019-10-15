import React from 'react';
import '../../index.scss';

const Error = props => {
  return (
    <div className={!props.loading ? "error-msg fadeIn" : "error-msg"}>
      <img src="https://img.icons8.com/clouds/100/000000/sad.png" alt="sad face"></img><br/>
      <h3 className="error-header">Sorry, no results were found.<br/> Try another search!</h3>
    </div>
  );
}

export default Error;