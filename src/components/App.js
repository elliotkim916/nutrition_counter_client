import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import LandingPage from './landing-page';
import SearchPage from './search-page';

export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/nutrition-search" component={SearchPage}/>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
