import React from 'react';
import {connect} from 'react-redux';
import './nutrition-search-page.css';
import {get_nutrition} from '../actions/nutrition-search';
import requiresLogin from './requires-login';

export class NutritionSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_value : ''
    }
  }
  
  mealInput(e) {
    this.setState({meal_value : e.target.value});
  }
  
  calculateMeal(e) {
    e.preventDefault();
    this.props.dispatch(get_nutrition(this.state.meal_value));
    this.setState({meal_value : ''});
  }
  
  render() {
    return (
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
      </div>
    );
  }
}

export default requiresLogin()(connect()(NutritionSearchPage));