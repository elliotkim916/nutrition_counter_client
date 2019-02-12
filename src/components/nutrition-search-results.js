import React, {Component} from 'react';
import './nutrition-search-results.css';
import {connect} from 'react-redux';

class NutritionSearchResults extends Component {
  onSubmit(e) {
    e.preventDefault();
    console.log('clicked');
    console.log(this.props.nutritionResults);
  }

  // renderTotalCalories() {
  //   let sum;
  //   let nutrition_results_array = this.props.nutritionResults;
  //   let total_calories = nutrition_results_array.map(cal => {
  //     return cal.nf_calories;
  //   });
  
  //   if (total_calories.length > 0) {
  //     sum = total_calories.reduce((acc, currentVal) => {
  //       return Math.floor(acc + currentVal);
  //     });    

  //     return (
  //       <h3 className="calories-sum">Total Calories Consumed: {sum}</h3>  
  //     );
  //   } else {
  //     console.log('Unable to render total calories');
  //   }
  // }

  renderTotals() {
    let nutrition_results_array = this.props.nutritionResults;
    console.log(nutrition_results_array);
    let calories = [];
    let fat = [];
    let carbs = [];
    let sugar = [];
    let sodium = [];
    let protein = [];

    for (let i = 0; i < nutrition_results_array.length; i++) {
      nutrition_results_array[i].nf_calories ? calories.push(nutrition_results_array[i].nf_calories) : console.log('calorie fail');
      nutrition_results_array[i].nf_total_carbohydrate ? carbs.push(nutrition_results_array[i].nf_total_carbohydrate) : console.log('carb fail');
      nutrition_results_array[i].nf_sodium ? sodium.push(nutrition_results_array[i].nf_sodium) : console.log('sodium fail');
      nutrition_results_array[i].nf_sugars ? sugar.push(nutrition_results_array[i].nf_sugars) : console.log('sugar fail');
      nutrition_results_array[i].nf_total_fat ? fat.push(nutrition_results_array[i].nf_total_fat) : console.log('fat fail');
      nutrition_results_array[i].nf_protein ? protein.push(nutrition_results_array[i].nf_protein) : console.log('protein fail');
    }
    
    if (calories.length && fat.length && carbs.length && sugar.length && sodium.length > 0 && protein.length > 0) {
      let total_calories = calories.reduce((acc, currentVal) => {
        return Math.floor(acc + currentVal);
      });
      
      let total_fat = fat.reduce((acc, currentVal) => {
        return Math.floor(acc + currentVal);
      });

      let total_carbs = carbs.reduce((acc, currentVal) => {
        return Math.floor(acc + currentVal);
      });

      let total_protein = protein.reduce((acc, currentVal) => {
        return Math.floor(acc + currentVal);
      });

      let total_sugar = sugar.reduce((acc, currentVal) => {
        return Math.floor(acc + currentVal);
      });

      let total_sodium = sodium.reduce((acc, currentVal) => {
        return Math.floor(acc + currentVal);
      });

      return (
        <div>
          <h3>Nutrition Totals</h3>
          <ul>
            <li>{total_calories} calories</li>
            <li>{total_fat} grams of fat</li>
            <li>{total_carbs} grams of carbohydrates</li>
            <li>{total_protein} grams of protein</li>
            <li>{total_sugar} grams of sugar</li>
            <li>{total_sodium} mg of sodium</li>
          </ul>
        </div>
      );
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
        {/* callback function automatically binds the this.onSubmit method to this particular component */}
          <ul className="nutrition-results">
            {nutrition_result}
          </ul>
          {/* {this.renderTotalCalories()} */}
          {this.renderTotals()}
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
