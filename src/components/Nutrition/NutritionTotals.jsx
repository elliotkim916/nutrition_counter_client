import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteData, resetDelete } from '../../store/actions/protected-data';
import { DeleteSuccess, DeleteQuestion } from '../../shared/delete';
import '../../index.scss';

const NutritionTotals = React.memo(
  ({
    deleteStart,
    deleteFinish,
    dispatch,
    nutritionData,
    deleteNutrition,
    tab,
  }) => {
    const [deleteId, setDeleteId] = useState(null);
    const [option, setOption] = useState('');

    const deleteToStart =
      deleteStart && option === 'nutrition' ? (
        <DeleteQuestion
          question="Are you sure you want to delete this?"
          yesDelete={deleteData}
          resetDelete={resetDelete}
          dispatch={dispatch}
          deleteId={deleteId}
          option={option}
        />
      ) : null;

    const deleteSuccess =
      deleteFinish && option === 'nutrition' ? (
        <DeleteSuccess
          message="Nutrition delete successful!"
          dispatch={dispatch}
          resetDelete={resetDelete}
          resetOption={() => setOption(null)}
        />
      ) : null;

    let nutritionTotals = '';
    if (nutritionData) {
      nutritionTotals = nutritionData.map((value, index) => {
        return (
          <div key={index} className="nutrition_total">
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
                <span className="list-title">Carbohydrates : </span>{' '}
                {value.carbs} grams
              </li>
              <li>
                <span className="list-title">Sugar : </span> {value.sugar} grams
              </li>
              <li>
                <span className="list-title">Protein : </span> {value.protein}{' '}
                grams
              </li>
              <li>
                <span className="list-title">Sodium : </span> {value.sodium} mg
              </li>
            </ul>
            <button
              className="delete-btn"
              onClick={() => {
                setDeleteId(value._id);
                setOption('nutrition');
                deleteNutrition();
              }}
            >
              <span className="exit">x</span>
            </button>
            <div className="line"></div>
          </div>
        );
      });
    }

    // when in tab format
    if (tab) {
      return (
        <React.Fragment>
          {deleteToStart}
          {deleteSuccess}
          {nutritionTotals}
        </React.Fragment>
      );
    }

    return (
      <div className="nutrition-totals-container">
        <h3>Nutrition Totals</h3>
        {deleteStart}
        {deleteSuccess}
        {nutritionTotals}
      </div>
    );
  }
);

const mapStateToProps = (state) => ({
  nutritionData: state.protected.nutritionData,
  deleteFinish: state.protected.deleteFinish,
  deleteStart: state.protected.deleteStart,
});

export default connect(mapStateToProps)(NutritionTotals);
