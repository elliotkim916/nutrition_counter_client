import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import LandingPage from './landing-page';
import NutritionSearchPage from './nutrition-search-page';
import ExerciseSearchPage from './exercise-search-page';
import NutritionSearchResults from './nutrition-search-results';
import ExerciseResults from './exercise-results';

export class App extends Component {
  render() {
    const connect = [];

    if (this.props.start.show_landing_page) {
      connect.push(<LandingPage key="LandingPage"/>);
    } else if (this.props.start.show_nutrition_search_page && this.props.start.show_exercise_search_page) {
      connect.push(
        <NutritionSearchPage key="NutritionSearchPage"/>,
        <NutritionSearchResults key="NutritionSearchResults"/>, 
        <ExerciseSearchPage key="ExerciseSearchPage"/>,
        <ExerciseResults key="ExerciseResults"/>
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
  start: state.begin
});

export default connect(mapStateToProps)(App);
