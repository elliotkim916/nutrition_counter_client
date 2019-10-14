import React from 'react';
import {connect} from 'react-redux';
import {get_nutrition} from '../../actions/nutrition-search';
import requiresLogin from '../Login/requires-login';

export class NutritionSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_value : ''
    }
  }
  
  componentDidMount() {
    this.input.focus();
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
        <img src="https://img.icons8.com/dusk/64/000000/ingredients.png" alt="food" className="food-image"/>
        <p className="nutrition-header">Food</p>
        <form onSubmit = {(e) => this.calculateMeal(e)} className="nutrition-form">
          <label htmlFor="meal">Enter your meal, snack, or anything you consumed to see the total nutrition breakdown.</label><br/>
          <textarea
            id="meal" 
            type="text" 
            placeholder="1 cup mashed potatoes and 2 tbsp gravy"
            onChange={(e) => this.mealInput(e)}
            value={this.state.meal_value}
            ref={input => this.input = input}
            required
          >
          </textarea><br/>
          <button type="submit" className="calculate-btn">Calculate Meal</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nutritionResults: state.nutritionSearchReducer.nutrition
});

export default requiresLogin()(connect(mapStateToProps)(NutritionSearchPage));