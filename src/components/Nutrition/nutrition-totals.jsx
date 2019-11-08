import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { deleteNutritionData, resetNutritionDelete } from '../../actions/protected-data';
import { DeleteSuccess, DeleteQuestion } from '../../shared/delete';
import '../../index.scss';

class NutritionTotals extends React.Component {
  state = {
    deleteId: null
  }

  render () {
    let nutritionTotals = '';
    let deleteStart = (
      this.props.deleteStart ? 
      <DeleteQuestion 
        question='Are you sure you want to delete this?'
        yesDelete={deleteNutritionData}
        resetDelete={resetNutritionDelete}  
        dispatch={this.props.dispatch}
        deleteId={this.state.deleteId}
      /> :
      null
    );
    let deleteSuccess = (
      this.props.deleteFinish ? 
      <DeleteSuccess 
        message='Nutrition delete successful!' 
        dispatch={this.props.dispatch} 
        resetDelete={resetNutritionDelete}
      /> :
      null
    )

    if (this.props.protectedData) {
        nutritionTotals = this.props.protectedData.map((value, index) => {
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
              <button 
                className="delete-btn"
                onClick = {() => {
                  this.setState({deleteId: value._id});
                  this.props.deleteNutrition()}
                }
              >
                <span className="exit">x</span>
              </button>
              <div className="line"></div>
            </div>
          );
        });
    }
  
    // when in tab format
    if (this.props.tab) {
      return (
        <React.Fragment>
          {deleteStart}
          {deleteSuccess}
          {nutritionTotals}
        </React.Fragment>
      )
    }

    return (
      <div className='nutrition-totals-container'>
        <h3>Nutrition Totals</h3>
        {deleteStart}
        {deleteSuccess}
        {nutritionTotals}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  protectedData : state.protected.protected_data,
  deleteFinish : state.protected.deleteFinish,
  deleteStart: state.protected.deleteStart
});

export default connect(mapStateToProps)(NutritionTotals);