import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { deleteData, resetDelete } from '../../store/actions/protected-data';
import { DeleteSuccess, DeleteQuestion } from '../../shared/delete';
import '../../index.scss';

class NutritionTotals extends React.Component {
  state = {
    deleteId: null,
    option: null
  }

  render () {
    const deleteStart = (
      this.props.deleteStart && this.state.option === 'nutrition' ? 
      <DeleteQuestion 
        question='Are you sure you want to delete this?'
        yesDelete={deleteData}
        resetDelete={resetDelete}  
        dispatch={this.props.dispatch}
        deleteId={this.state.deleteId}
        option={this.state.option}
      /> :
      null
    );

    const deleteSuccess = (
      this.props.deleteFinish && this.state.option === 'nutrition' ? 
      <DeleteSuccess 
        message='Nutrition delete successful!' 
        dispatch={this.props.dispatch} 
        resetDelete={resetDelete}
        resetOption={() => this.setState({option: null})}
      /> :
      null
    );

    let nutritionTotals = '';
    if (this.props.nutritionData) {
        nutritionTotals = this.props.nutritionData.map((value, index) => {
          return (
            <div key = {index} className = "nutrition_total">
              <ul className="date">
                <li>{moment(value.created).format('dddd, MMMM Do YYYY')}</li>
                <li>{moment(value.created).format('h:mm a')}</li>
              </ul>
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
                  this.setState({deleteId: value._id, option: 'nutrition'});
                  this.props.deleteNutrition();
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
  nutritionData : state.protected.nutritionData,
  deleteFinish : state.protected.deleteFinish,
  deleteStart: state.protected.deleteStart
});

export default connect(mapStateToProps)(NutritionTotals);