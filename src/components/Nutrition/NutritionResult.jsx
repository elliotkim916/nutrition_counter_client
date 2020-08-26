import React from 'react';

const NutritionResult = ({ index, result }) => {
  const nutritionTotal = (nutrition) => (nutrition === null ? 0 : nutrition);

  return (
    <li key={index} className="nutrition-list-item">
      <h3 className="food-name">
        {result.food_name
          .toLowerCase()
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}
      </h3>
      <img
        src={`${result.photo.thumb}`}
        className="result-image"
        alt="food item"
      />
      <ul className="nutrition-facts">
        <li>
          <span>Calories : </span>
          {nutritionTotal(result.nf_calories)}
        </li>
        <li>
          <span>Total Fat : </span>
          {nutritionTotal(result.nf_total_fat)}g
        </li>
        <li>
          <span>Saturated Fat : </span>
          {nutritionTotal(result.nf_saturated_fat)}g
        </li>
        <li>
          <span>Cholesterol : </span>
          {nutritionTotal(result.nf_cholesterol)}mg
        </li>
        <li>
          <span>Sodium : </span>
          {nutritionTotal(result.nf_sodium)}mg
        </li>
        <li>
          <span>Potassium : </span>
          {nutritionTotal(result.nf_potassium)}mg
        </li>
        <li>
          <span>Carbohydrates : </span>
          {nutritionTotal(result.nf_total_carbohydrate)}g
        </li>
        <li>
          <span>Dietary Fiber : </span>
          {nutritionTotal(result.nf_dietary_fiber)}g
        </li>
        <li>
          <span>Sugars : </span>
          {nutritionTotal(result.nf_sugars)}g
        </li>
        <li>
          <span>Protein : </span>
          {nutritionTotal(result.nf_protein)}g
        </li>
      </ul>
    </li>
  );
};

export default NutritionResult;
