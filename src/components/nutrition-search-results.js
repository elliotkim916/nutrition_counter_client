import React, {Component} from 'react';
import './nutrition-search-results.css';
import {connect} from 'react-redux';

class NutritionSearchResults extends Component {
  onSubmit(e) {
    e.preventDefault();
    console.log('clicked');
    console.log(this.props.nutritionResults);
  }

  renderResult() {
    let sum;
    let nutrition_results_array = this.props.nutritionResults;
    
    let total_calories = nutrition_results_array.map(cal => {
      return cal.nf_calories;
    });
  
    if (total_calories.length > 0) {
      sum = total_calories.reduce((acc, currentVal) => {
        return acc + currentVal;
      });    

      return (
        <h3 className="calories-sum">Total Calories Consumed: {sum}</h3>  
      );
    } else {
      console.log('unable to render total calories');
    }
  }

  renderSubmitButton() {
    const resultsArray = this.props.nutritionResults;
    if (resultsArray.length > 0) {
      return (
        <button type="submit" className="save-btn">SAVE NUTRITION</button>
      );
    } else {
      console.log('unable to render submit button');
    }
  }

  render() {
    let nutrition_results_array = this.props.nutritionResults;
    let nutrition_result = '';  
    
    nutrition_result = nutrition_results_array.map((result, index) => 
      <li key={index} className="nutrition-list-item">
        <h3 className="food-name">{result.food_name.charAt(0).toUpperCase() + result.food_name.slice(1)}</h3>
        <img src={`${result.photo.thumb}`} className="food-image" alt="food item"/>
        <ul className="nutrition-facts">
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
      <section className="nutrition-search-results">
        <form className="nutrition-form" onSubmit={(e) => this.onSubmit(e)}>
          <ul className="nutrition-results">
            {nutrition_result}
          </ul>
          {this.renderResult()}
          {this.renderSubmitButton()}
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  nutritionResults: state.nutrition.nutrition
});

export default connect(mapStateToProps)(NutritionSearchResults);
