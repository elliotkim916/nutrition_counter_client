import React from 'react';
import moment from 'moment';
import '../../index.scss';

const NutritionDashboardListItem = React.memo(
  ({ value, updateIdAndOption, deleteNutrition }) => {
    return (
      <div className="nutrition_total">
        <ul className="date">
          <li>{moment(value.created).format('dddd, MMMM Do YYYY')}</li>
          <li>{moment(value.created).format('h:mm a')}</li>
        </ul>
        <ul>
          <li>
            <span className="list-title">Foods : </span> {value.food_name}
          </li>
          <li>
            <span className="list-title">Calories : </span> {value.calories}{' '}
            grams
          </li>
          <li>
            <span className="list-title">Fat : </span> {value.fat} grams
          </li>
          <li>
            <span className="list-title">Carbohydrates : </span> {value.carbs}{' '}
            grams
          </li>
          <li>
            <span className="list-title">Sugar : </span> {value.sugar} grams
          </li>
          <li>
            <span className="list-title">Protein : </span> {value.protein} grams
          </li>
          <li>
            <span className="list-title">Sodium : </span> {value.sodium} mg
          </li>
        </ul>
        <button
          className="delete-btn"
          onClick={() => {
            updateIdAndOption(value._id, 'nutrition');
            deleteNutrition();
          }}
        >
          <span className="exit">x</span>
        </button>
        <div className="line"></div>
      </div>
    );
  }
);

export default NutritionDashboardListItem;
