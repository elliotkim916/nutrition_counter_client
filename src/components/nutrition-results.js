import React, {Component} from 'react';
import './nutrition-results.css';
import NutritionSearchPage from './nutrition-search-page';
import ExerciseSearchPage from './exercise-search-page';
import {connect} from 'react-redux';
import {addProtectedData} from '../actions/protected-data';
import requiresLogin from './requires-login';

export class NutritionResults extends Component {
  onAdd(e, nutritionObject, username, date) {
    e.preventDefault();
    this.props.dispatch(addProtectedData(nutritionObject, username, date));
    window.alert('You have just saved your nutrition!');
  }

  renderTotals() {
    let nutrition_results_array = this.props.nutritionResults;
    let nutritionTotals = {
      'food_name': '',
      'nf_calories': 0,
      'nf_total_fat': 0,
      'nf_total_carbohydrate': 0,
      'nf_protein': 0,
      'nf_sugars': 0,
      'nf_sodium': 0
    };
    let keys = Object.keys(nutritionTotals);
    let add_count_of_j;

    for (let i = 0; i < nutrition_results_array.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        let foodName = nutrition_results_array[i].food_name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        typeof nutritionTotals[keys[j]] === 'string' ? 
        nutritionTotals[keys[j]] = nutritionTotals[keys[j]] += foodName + (nutrition_results_array[i + 1] ? ', ' : '') : 
        nutritionTotals[keys[j]] = Math.floor(nutritionTotals[keys[j]] += nutrition_results_array[i][keys[j]]);
        j === keys.length - 1 ? add_count_of_j = j : console.log('j error');
      }     
    }

    if (add_count_of_j) {
      return (
        <div>
          <form onSubmit = {(e) => this.onAdd(e, nutritionTotals, this.props.username, Date.now)}>
          <h3>Nutrition Totals</h3>
            <ul>
              <li>{nutritionTotals.nf_calories} calories</li>
              <li>{nutritionTotals.nf_total_fat} grams of fat</li>
              <li>{nutritionTotals.nf_total_carbohydrate} grams of carbohydrates</li>
              <li>{nutritionTotals.nf_protein} grams of protein</li>
              <li>{nutritionTotals.nf_sugars} grams of sugar</li>
              <li>{nutritionTotals.nf_sodium} mg of sodium</li>
            </ul>
            <button type="submit">Save Nutrition</button>
          </form>
        </div>
      );
    }
  }

  render() {
    let nutrition_results_array = this.props.nutritionResults;
    let nutrition_result = '';  
    
    nutrition_result = nutrition_results_array.map((result, index) => 
      <li key = {index} className="nutrition-list-item">
        <h3 className = "food-name">{result.food_name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h3>
        <img src = {`${result.photo.thumb}`} className = "food-image" alt = "food item"/>
        <ul className = "nutrition-facts">
          <li>Calories : {result.nf_calories === null ? 0 : result.nf_calories}</li>
          <li>Total Fat : {result.nf_total_fat === null ? 0 : result.nf_total_fat}g</li>
          <li>Saturated Fat : {result.nf_saturated_fat === null ? 0 : result.nf_saturated_fat}g</li>
          <li>Cholesterol : {result.nf_cholesterol === null ? 0 : result.nf_cholesterol}mg</li>
          <li>Sodium : {result.nf_sodium === null ? 0 : result.nf_sodium}mg</li>
          <li>Potassium : {result.nf_potassium === null ? 0 : result.nf_potassium}mg</li>
          <li>Carbohydrates : {result.nf_total_carbohydrate === null ? 0 : result.nf_total_carbohydrate}g</li>
          <li>Dietary Fiber : {result.nf_dietary_fiber === null ? 0 : result.nf_dietary_fiber}g</li>
          <li>Sugars : {result.nf_sugars === null ? 0 : result.nf_sugars}g</li>
          <li>Protein : {result.nf_protein === null ? 0 : result.nf_protein}g</li>
        </ul>
      </li>
    );
    
    return (
      // callback function automatically binds the this.onSubmit method to this particular component 
      <section className = "nutrition-search-results">
        <NutritionSearchPage/>
        <ul className = "nutrition-results">
          {nutrition_result}
        </ul>
        {this.renderTotals()}
        <ExerciseSearchPage/>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  showData: state.nutritionSearchReducer.showData,
  nutritionResults: state.nutritionSearchReducer.nutrition,
  username: state.authReducer.currentUser.username
});

export default requiresLogin()(connect(mapStateToProps)(NutritionResults));
