import React from 'react';

const NutritionSaveTotals = ({
  loading,
  errorStatus,
  onAdd,
  nutritionTotals,
}) => {
  return (
    <div
      className={
        !loading && !errorStatus
          ? 'nutrition-results-container fadeIn'
          : 'nutrition-results-container'
      }
    >
      <form onSubmit={(e) => onAdd(e, nutritionTotals, 'nutrition')}>
        <h3>Nutrition Totals</h3>
        <ul className="nutrition-list">
          <li>{nutritionTotals.nf_calories} calories</li>
          <li>{nutritionTotals.nf_total_fat} grams of fat</li>
          <li>{nutritionTotals.nf_total_carbohydrate} grams of carbs</li>
          <li>{nutritionTotals.nf_protein} grams of protein</li>
          <li>{nutritionTotals.nf_sugars} grams of sugar</li>
          <li>{nutritionTotals.nf_sodium} mg of sodium</li>
        </ul>
        <button type="submit" className="save-btn">
          Save Nutrition
        </button>
      </form>
    </div>
  );
};

export default NutritionSaveTotals;
