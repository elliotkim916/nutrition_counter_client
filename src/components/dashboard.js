import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchProtectedData} from '../actions/protected-data';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

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

export default connect()(Dashboard);