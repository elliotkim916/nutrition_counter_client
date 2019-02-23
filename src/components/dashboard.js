import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchProtectedData, deleteData} from '../actions/protected-data';
import requiresLogin from './requires-login';
import NutritionSearchPage from './nutrition-search-page';
import ExerciseSearchPage from './exercise-search-page';

const listStyle = {
  listStyleType : 'none'
};

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  logOut(e) {
    e.preventDefault();
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  onDelete(e, id) {
    e.preventDefault();
    const result = window.confirm('Are you sure you want to delete?  If so, click OK');
    if (result) {
      this.props.dispatch(deleteData(id));
    }
  }

  render() {
    let nutrition_array = this.props.protectedData;
    let nutrition_totals = '';
    if (nutrition_array) {
      nutrition_totals = nutrition_array.map((value, index) => {
        return (
          <li style = {listStyle} key = {index} className = "nutrition_total">
            <ul>
              <li>Date : {value.created}</li>
              <li>Calories : {value.calories} grams</li>
              <li>Fat : {value.fat} grams</li>
              <li>Carbohydrates : {value.carbs} grams</li>
              <li>Sugar : {value.sugar} grams</li>
              <li>Protein : {value.protein} grams</li>
              <li>Sodium : {value.sodium} mg</li>
            </ul>
            <button onClick = {e => this.onDelete(e, value._id)}>Delete</button>
          </li>
        );
      });
    }

    return (
      <div className="dashboard">
        <a 
          href = "/"
          className = "log-out"
          onClick = {(e) => this.logOut(e)}
        >
        Log Out
        </a>
        <h1>Welcome {this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}</h1>
        {nutrition_totals}
        <NutritionSearchPage/>
        <ExerciseSearchPage/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  protectedData: state.protected.protected_data,
  username: state.authReducer.currentUser.username
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));