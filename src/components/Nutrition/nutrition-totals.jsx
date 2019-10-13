import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

const NutritionTotals = props => {
  let nutritionTotals = '';

  if (props.protectedData) {
      nutritionTotals = props.protectedData.map((value, index) => {
        return (
          <div key = {index} className = "nutrition_total">
            <h3 className="date">{moment(value.created).format('dddd MMMM Do YYYY, h:mm a')}</h3>
            <ul>
              <li><span className="list-title">Foods : </span> {value.food_name}</li>
              <li><span className="list-title">Calories : </span> {value.calories} grams</li>
              <li><span className="list-title">Fat : </span> {value.fat} grams</li>
              <li><span className="list-title">Carbohydrates : </span> {value.carbs} grams</li>
              <li><span className="list-title">Sugar : </span> {value.sugar} grams</li>
              <li><span className="list-title">Protein : </span> {value.protein} grams</li>
              <li><span className="list-title">Sodium : </span> {value.sodium} mg</li>
            </ul>
            <button onClick = {e => this.onDelete(e, value._id)} className="delete-btn"><span className="exit">x</span></button>
            <div className="line"></div>
          </div>
        );
      });
  }

  // when in tab format
  if (props.tab) {
    return (
      <React.Fragment>
        {nutritionTotals}
      </React.Fragment>
    )
  }

  return (
    <div className='nutrition-totals-container'>
      <h3>Nutrition Totals</h3>
      {nutritionTotals}
    </div>
  )
}

const mapStateToProps = state => ({
  protectedData : state.protected.protected_data,
});

export default connect(mapStateToProps)(NutritionTotals);