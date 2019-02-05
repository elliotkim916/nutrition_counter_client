import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import LandingPage from './landing-page';
import SearchPage from './search-page';
import RegistrationPage from './registration-page';
import {refreshAuthToken} from '../actions/auth';
// import Practice from './practice';
// import ApiCall from './apicall-practice';

export class App extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }

  componentWillMount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(() => 
      this.props.dispatch(refreshAuthToken()), 
      60 * 60 * 1000
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
       <Router history={history}>
        <div className="App">
          <Route exact path="/registration-page" component={RegistrationPage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/nutrition-search" component={SearchPage}/>
        </div>
       </Router> 
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(App);