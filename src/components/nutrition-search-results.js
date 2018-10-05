import React, {Component} from 'react';
import './nutrition-search-results.css';
import {connect} from 'react-redux';

class NutritionSearchResults extends Component {
  render() {
    let nutrition_results_array = this.props.nutritionResults;
    let nutrition_result = '';
    console.log(nutrition_results_array);

    nutrition_result = nutrition_results_array.map((result, index) => 
      <li key={index} className="nutrition-list-item">
        <h3 className="food-name">{result.food_name.charAt(0).toUpperCase() + result.food_name.slice(1)}</h3>
        <img src={`${result.photo.thumb}`} className="food-image" alt="food item"/>
        <ul className="nutrition-facts">
          <li>Calories : {result.nf_calories}</li>
          <li>Total Fat : {result.nf_total_fat}g</li>
          <li>Saturated Fat : {result.nf_saturated_fat}g</li>
          <li>Cholesterol : {result.nf_cholesterol}mg</li>
          <li>Sodium : {result.nf_sodium}mg</li>
          <li>Potassium : {result.nf_potassium}mg</li>
          <li>Carbohydrates : {result.nf_total_carbohydrate}g</li>
          <li>Dietary Fiber : {result.nf_dietary_fiber}g</li>
          <li>Sugars : {result.nf_sugars}g</li>
          <li>Protein : {result.nf_protein}g</li>
        </ul>
      </li>
    );

    return (
      <section className="nutrition-search-results">
        <ul className="nutrition-results">
          {nutrition_result}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  nutritionResults: state.nutrition.nutrition
});

export default connect(mapStateToProps)(NutritionSearchResults);
