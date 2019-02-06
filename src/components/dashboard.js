import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchProtectedData} from '../actions/protected-data';
import requiresLogin from './requires-login';
import SearchPage from './search-page';

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
        <h1>Welcome {this.props.username}</h1>
        <SearchPage/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));