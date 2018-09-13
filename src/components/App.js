import React, { Component } from 'react';
import './App.css';
import LandingPage from './landing-page';
import NutritionSearchPage from './nutrition-search-page';
import ExerciseSearchPage from './exercise-search-page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_landing_page: true,
      show_nutrition_search_page: false,
      show_nutrition_results: false,
      show_exercise_search_page: false,
      show_exercise_results: false,
      stay_on_search_page: false
    }
  }

  toSearchPage() {
    this.setState({
      show_landing_page: false,
      show_nutrition_search_page: true,
      show_exercise_search_page: true
    });
  }

  render() {
    const connect = [];

    if (this.state.show_landing_page) {
      connect.push(<LandingPage toSearchPage={() => this.toSearchPage()} key="LandingPage"/>);
    } else if (this.state.show_nutrition_search_page && this.state.show_exercise_search_page) {
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

export default App;
