import React from 'react';
import {connect} from 'react-redux';

const NutritionResultsTotals = props => {
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

  for (let i = 0; i < props.nutritionResults.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      let foodName = props.nutritionResults[i].food_name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
      typeof nutritionTotals[keys[j]] === 'string' ? 
      nutritionTotals[keys[j]] = nutritionTotals[keys[j]] += foodName + (props.nutritionResults[i + 1] ? ', ' : '') : 
      nutritionTotals[keys[j]] = Math.floor(nutritionTotals[keys[j]] += props.nutritionResults[i][keys[j]]);
      nutritionTotals['created'] = Date.now;
      j === keys.length - 1 ? add_count_of_j = j : console.log('j error');
    }     
  }

  if (add_count_of_j) {
    return (
      <div className= {!props.loading ? "nutrition-results-container fadeIn" : "nutrition-results-container"}>
        <form onSubmit = {(e) => props.onAdd(e, nutritionTotals)}>
        <h3>Nutrition Totals</h3>
          <ul className="nutrition-list">
            <li>{nutritionTotals.nf_calories} calories</li>
            <li>{nutritionTotals.nf_total_fat} grams of fat</li>
            <li>{nutritionTotals.nf_total_carbohydrate} grams of carbs</li>
            <li>{nutritionTotals.nf_protein} grams of protein</li>
            <li>{nutritionTotals.nf_sugars} grams of sugar</li>
            <li>{nutritionTotals.nf_sodium} mg of sodium</li>
          </ul>
          <button type="submit" className="save-btn">Save Nutrition</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
}

const mapStateToProps = state => ({
  nutritionResults: state.nutritionSearchReducer.nutrition,
  loading: state.nutritionSearchReducer.loading,
  username: state.authReducer.currentUser.username
});

export default connect(mapStateToProps)(NutritionResultsTotals);