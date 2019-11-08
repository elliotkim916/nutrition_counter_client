import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { deleteNutritionData, resetNutritionDelete } from '../../actions/protected-data';
import '../../index.scss';

class NutritionTotals extends React.Component {
  state = {
    deleteId: null
  }  

  render () {
    let nutritionTotals = '';

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
          {
            this.props.deleteStart ? 
            <div className="backdrop">
              <div className="backdrop-form">
                <h3>Are you sure you want to delete?</h3>
                <button 
                  type="button" 
                  className="login-btn" 
                  onClick={() => {
                    this.props.dispatch(deleteNutritionData(this.state.deleteId));
                    this.setState({deleteId: null});
                  }}
                >
                  Yes
                </button>
                <button 
                  type="button" 
                  className="login-btn" 
                  onClick={() => {
                    this.props.dispatch(resetNutritionDelete());
                    this.setState({deleteId: null});
                  }}
                >
                  No
                </button>
              </div>
            </div> : 
            null
          }
          {
            this.props.deleteFinish ? 
            <div className="backdrop">
              <div className="backdrop-form">
                <h3>Nutrition delete successful!</h3>
                <button type="button" className="login-btn" onClick={() => this.props.dispatch(resetNutritionDelete())}>Okay</button>
              </div>
            </div> : 
            null
          }
          {nutritionTotals}
        </React.Fragment>
      )
    }

    return (
      <div className='nutrition-totals-container'>
        <h3>Nutrition Totals</h3>
        {
          this.props.deleteStart ? 
          <div className="backdrop">
            <div className="backdrop-form">
              <h3>Are you sure you want to delete?</h3>
              <button 
                type="button" 
                className="login-btn" 
                onClick={() => {
                  this.props.dispatch(deleteNutritionData(this.state.deleteId));
                  this.setState({deleteId: null});
                }}
              >
                Yes
              </button>
              <button 
                type="button" 
                className="login-btn" 
                onClick={() => {
                  this.props.dispatch(resetNutritionDelete());
                  this.setState({deleteId: null});
                }}
              >
                No
              </button>
            </div>
          </div> : 
          null
        }
        {
          this.props.deleteFinish ? 
          <div className="backdrop">
            <div className="backdrop-form">
              <h3>Nutrition delete successful!</h3>
              <button type="button" className="login-btn" onClick={() => this.props.dispatch(resetNutritionDelete())}>Okay</button>
            </div>
          </div> : 
          null
        }
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