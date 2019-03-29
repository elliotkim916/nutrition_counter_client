import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchProtectedData, deleteData} from '../actions/protected-data';
import {getExercise, deleteExercise} from '../actions/protected-exercise-data';
import requiresLogin from './requires-login';
import NutritionSearchPage from './nutrition-search-page';
import ExerciseSearchPage from './exercise-search-page';
import moment from 'moment';
import '../stylesheets/components/_dashboard.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
    this.props.dispatch(getExercise());
  }

  logOut(e) {
    e.preventDefault();
    this.props.dispatch(clearAuth());
    clearAuthToken();
    this.props.history.push('/login-page');
  }

  onDelete(e, id) {
    e.preventDefault();
    const result = window.confirm('Are you sure you want to delete?  If so, click OK');
    if (result) {
      this.props.dispatch(deleteData(id));
    }
  }

  deleteExercise(e, id) {
    e.preventDefault();
    const result = window.confirm('Are you sure you want to delete?  If so, click OK');
    if (result) {
      this.props.dispatch(deleteExercise(id));
    }
  }

  render() {
    let nutrition_array = this.props.protectedData;
    let nutrition_totals = '';
    if (nutrition_array) {
      nutrition_totals = nutrition_array.map((value, index) => {
        return (
          <li key = {index} className = "nutrition_total">
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
          </li>
        );
      });
    }

    let exercise_array = this.props.exerciseData;
    let exercise_totals = '';
    if (exercise_array) {
      exercise_totals = exercise_array.map((value, index) => {
        return (
          <li key = {index} className = "exercise_total">
            <h3 className="date">{moment(value.created).format('dddd MMMM Do YYYY, h:mm a')}</h3>
            <ul>
              <li><span className="list-title">Exercise Name :</span> {value.exerciseName}</li>
              <li><span className="list-title">Calories Burned :</span> {value.caloriesBurned}</li>
              <li><span className="list-title">Duration of workout :</span> {value.duration} minutes</li>
            </ul>
            <button onClick = {e => this.deleteExercise(e, value._id)} className="delete-btn"><span className="exit">x</span></button>
            <div className="line"></div>
          </li>
        );
      });
    }

      return (
        <div className="dashboard">
          <div className="shape">
            <a 
              className = "log-out"
              onClick = {(e) => this.logOut(e)}
            >
            Log Out
            </a><br/>
            <h1 className="title-header">Nutrition Counter</h1>
            <NutritionSearchPage/>
            <ExerciseSearchPage/><br/>
          </div>
          <h1 className="welcome-header">Welcome {this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}</h1>
          <div className="totals-container">
            <div className = {this.props.protectedData.length > 0 ? 'nutrition-totals-container' : 'invisible'}>
              <h3>Nutrition Totals</h3>
              {nutrition_totals}
            </div>
            <div className = {this.props.protectedData.length > 0 ? 'exercise-totals-container' : 'invisible'}>
              <h3>Exercise Totals</h3>
              {exercise_totals}  
            </div><br/>
          </div>

          <div className = {this.props.protectedData.length > 0 ? 'nutrition-totals-container' : 'invisible'}>
            <Tabs>
              <TabList>
                <Tab>Nutrition Totals</Tab>
                <Tab>Exercise Totals</Tab>
              </TabList>
        
              <TabPanel>
                <div>  
                  {nutrition_totals}
                </div>
              </TabPanel>
              <TabPanel>
                <div>  
                  {exercise_totals}  
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = state => ({
  exerciseData : state.exerciseDataReducer.exerciseData, 
  protectedData : state.protected.protected_data,
  username : state.authReducer.currentUser.username
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));