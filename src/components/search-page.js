import React from 'react';
import {connect} from 'react-redux';
import './search-page.css';
import {get_nutrition} from '../actions/nutrition-search';
import {get_exercise} from '../actions/exercise-search';
import NutritionSearchResults from './nutrition-search-results';
import ExerciseResults from './exercise-results';

export class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_value: '',
      exercise_value: ''
    }
  }
  
  mealInput(e) {
    this.setState({meal_value: e.target.value});
  }

  calculateMeal(e) {
    e.preventDefault();
    this.props.dispatch(get_nutrition(this.state.meal_value));
    this.setState({meal_value: ''});
  }

  exerciseInput(e) {
    this.setState({exercise_value: e.target.value})
  }

  calculateActivity(e) {
    e.preventDefault();
    this.props.dispatch(get_exercise(this.state.exercise_value));
    this.setState({exercise_value: ''});
  }

  render() {
    return (
      <div className="search-page">
        <div className="nutrition-page">
          <h3>Nutrition Counter</h3>
          <form onSubmit = {(e) => this.calculateMeal(e)}>
            <label htmlFor="meal">Enter your meal, snack, or anything you consumed to see the total nutrition breakdown.</label><br/>
            <textarea
              id="meal" 
              type="text" 
              placeholder="1 cup mashed potatoes and 2 tbsp gravy"
              onChange={(e) => this.mealInput(e)}
              value={this.state.meal_value}
            >
            </textarea><br/>
            <button type="submit">Calculate Meal</button>
          </form>
          <NutritionSearchResults />
        </div>

        <div className="exercise-page">
          <form onSubmit={(e) => this.calculateActivity(e)}>
            <label htmlFor="exercise">Enter your workout.  It can be anything from 30 min of weight lifting, 1 hour of yoga, or a 2 hour walk!</label><br/>
            <textarea 
              id="exercise"
              type="textarea" 
              placeholder="ran 3 miles"
              onChange={(e) => this.exerciseInput(e)}
              value={this.state.exercise_value}
            >
            </textarea><br/>
            <button type="submit">Calculate Activity</button>
          </form>
          <ExerciseResults />
        </div>
      </div>
    );
  }
}

export default connect()(SearchPage);