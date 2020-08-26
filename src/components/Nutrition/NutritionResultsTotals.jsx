import React from 'react';
import { connect } from 'react-redux';
import NutritionSaveTotals from './NutritionSaveTotals';

const NutritionResultsTotals = ({
  nutritionResults,
  loading,
  onAdd,
  errorStatus,
}) => {
  let nutritionTotals = {
    food_name: '',
    nf_calories: 0,
    nf_total_fat: 0,
    nf_total_carbohydrate: 0,
    nf_protein: 0,
    nf_sugars: 0,
    nf_sodium: 0,
  };
  let keys = Object.keys(nutritionTotals);
  let add_count_of_j;

  for (let i = 0; i < nutritionResults.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      let foodName = nutritionResults[i].food_name
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

      typeof nutritionTotals[keys[j]] === 'string'
        ? (nutritionTotals[keys[j]] = nutritionTotals[keys[j]] +=
            foodName + (nutritionResults[i + 1] ? ', ' : ''))
        : (nutritionTotals[keys[j]] = Math.floor(
            (nutritionTotals[keys[j]] += nutritionResults[i][keys[j]])
          ));

      nutritionTotals['created'] = Date.now;

      j === keys.length - 1 ? (add_count_of_j = j) : console.log('j error');
    }
  }

  if (add_count_of_j) {
    return (
      <NutritionSaveTotals
        loading={loading}
        errorStatus={errorStatus}
        onAdd={onAdd}
        nutritionTotals={nutritionTotals}
      />
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  nutritionResults: state.searchReducer.nutrition,
  loading: state.searchReducer.loading,
});

export default connect(mapStateToProps)(NutritionResultsTotals);
