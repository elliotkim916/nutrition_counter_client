import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import LandingPage from './landing-page';
import RegistrationPage from './registration-page';
import LoginPage from './login-page';
import Dashboard from './dashboard';
import NutritionSearchPage from './nutrition-search-page';
import ExerciseSearchPage from './exercise-search-page';
import NutritionResults from './nutrition-results';
import ExerciseResults from './exercise-results';
import {refreshAuthToken} from '../actions/auth';
import '../index.scss';

export class App extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    // we use this because we want to use the same refreshInterval variable everytime
    // we are replacing the existing interval with a new interval
    // without the this, we would have many intervals as you call the startPeriodicRefresh()
    this.refreshInterval = setInterval(() => 
      this.props.dispatch(refreshAuthToken()), 
      60 * 60 * 1000
      // one hour
    );
  }

  stopPeriodicRefresh() {
    // if this.refreshInterval doesn't exist, nothing happens
    if (!this.refreshInterval) {
      return;
    }

    // clearInterval along with setInterval are built in functions within JavaScript
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
       <Router history = {history}>
        <div className="App">
          <Route exact path = "/registration-page" component = {RegistrationPage} />
          <Route exact path = "/login-page" component = {LoginPage} />
          <Route exact path = "/" component = {LandingPage} />
          <Route exact path = "/dashboard" component = {Dashboard} />
          <Route exact path = "/nutrition-search" component = {NutritionSearchPage} />
          <Route exact path = "/exercise-search" component = {ExerciseSearchPage} />
          <Route exact path = "/nutrition-results" component = {NutritionResults} />
          <Route exact path = "/exercise-results" component = {ExerciseResults} />
        </div>
       </Router> 
    );
  } 
}

const mapStateToProps = state => ({
  hasAuthToken: state.authReducer.authToken !== null,
  loggedIn: state.authReducer.currentUser !== null
});

export default connect(mapStateToProps)(App);