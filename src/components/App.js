import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import LandingPage from './landing-page';
import NutritionSearchPage from './nutrition-search-page';
import ExerciseSearchPage from './exercise-search-page';

export class App extends Component {
  render() {
    console.log(this.props);
    const connect = [];

    if (this.props.start.show_landing_page) {
      connect.push(<LandingPage key="LandingPage"/>);
    } else if (this.props.start.show_nutrition_search_page && this.props.start.show_exercise_search_page) {
      connect.push(
        <NutritionSearchPage key="NutritionSearchPage"/>, 
        <ExerciseSearchPage key="ExerciseSearchPage"/>
      );
    } else {
      console.log('error');
    }

    return (
      <div className="App">
        {connect}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  start: state.begin,
  nutrition: state.nutrition
});

export default connect(mapStateToProps)(App);
