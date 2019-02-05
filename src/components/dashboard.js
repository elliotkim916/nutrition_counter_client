import React from 'react';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export class Dashboard extends React.Component {
  logOut(e) {
    e.preventDefault();
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    return (
      <div className="dashboard">
      <a 
        href = "/"
        className = "log-out"
        onClick = {(e) => this.logOut(e)}
      >
      Log Out
      </a>
        <h1>Welcome user!</h1>
      </div>
    )
  }
}