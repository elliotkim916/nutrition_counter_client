import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import history from './history';
import LandingPage from './components/Landing/LandingPage';
import RegistrationPage from './components/Registration/registration-page';
import LoginPage from './components/Login/login-page';
import Dashboard from './components/Dashboard/Dashboard';
import NutritionSearchPage from './components/Nutrition/nutrition-search-page';
import ExerciseSearchPage from './components/Exercise/exercise-search-page';
import NutritionResults from './components/Nutrition/nutrition-results';
import ExerciseResults from './components/Exercise/exercise-results';
import { refreshAuthToken } from './store/actions/auth';
import './index.scss';

class App extends Component {
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
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
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
          <Route exact path="/login-page" component={LoginPage} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/nutrition-search"
            component={NutritionSearchPage}
          />
          <Route exact path="/exercise-search" component={ExerciseSearchPage} />
          <Route exact path="/nutrition-results" component={NutritionResults} />
          <Route exact path="/exercise-results" component={ExerciseResults} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  hasAuthToken: state.authReducer.authToken !== null,
  loggedIn: state.authReducer.currentUser !== null,
});

export default connect(mapStateToProps)(App);
