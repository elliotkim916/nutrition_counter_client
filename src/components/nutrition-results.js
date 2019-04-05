import React, {Component} from 'react';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import '../stylesheets/components/_results-page.scss';
import NutritionSearchPage from './nutrition-search-page';
import ExerciseSearchPage from './exercise-search-page';
import {connect} from 'react-redux';
import {addProtectedData} from '../actions/protected-data';
import requiresLogin from './requires-login';

export class NutritionResults extends Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
    this.props.history.push('/login-page');
  }

  onAdd(e, nutritionObject, username, date) {
    e.preventDefault();
    this.props.dispatch(addProtectedData(nutritionObject, username, date));
    window.alert('You have just saved your nutrition!');
  }

  renderTotals() {
    let nutrition_results_array = this.props.nutritionResults;
    let nutritionTotals = {
      'food_name': '',
      'nf_calories': 0,
      'nf_total_fat': 0,
      'nf_total_carbohydrate': 0,
      'nf_protein': 0,
      'nf_sugars': 0,
      'nf_sodium': 0
    };
    let keys = Object.keys(nutritionTotals);
    let add_count_of_j;

    for (let i = 0; i < nutrition_results_array.length; i++) {
      for (let j = 0; j < keys.length; j++) {
        let foodName = nutrition_results_array[i].food_name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        typeof nutritionTotals[keys[j]] === 'string' ? 
        nutritionTotals[keys[j]] = nutritionTotals[keys[j]] += foodName + (nutrition_results_array[i + 1] ? ', ' : '') : 
        nutritionTotals[keys[j]] = Math.floor(nutritionTotals[keys[j]] += nutrition_results_array[i][keys[j]]);
        j === keys.length - 1 ? add_count_of_j = j : console.log('j error');
      }     
    }

    if (add_count_of_j) {
      return (
        <div className= {!this.props.loading ? "nutrition-results-container fadeIn" : "nutrition-results-container"}>
          <form onSubmit = {(e) => this.onAdd(e, nutritionTotals, this.props.username, Date.now)}>
          <h3>Nutrition Totals</h3>
            <ul className="nutrition-list">
              <li>{nutritionTotals.nf_calories} calories</li>
              <li>{nutritionTotals.nf_total_fat} grams of fat</li>
              <li>{nutritionTotals.nf_total_carbohydrate} grams of carbs</li>
              <li>{nutritionTotals.nf_protein} grams of protein</li>
              <li>{nutritionTotals.nf_sugars} grams of sugar</li>
              <li>{nutritionTotals.nf_sodium} mg of sodium</li>
            </ul>
            <button type="submit" className="save-btn">Save Nutrition</button>
          </form>
        </div>
      );
    }
  }

  render() {
    let error;
    if (this.props.nutritionError) {
      error = (
        <div className={!this.props.loading ? "error-msg fadeIn" : "error-msg"}>
          <img src="https://img.icons8.com/clouds/100/000000/sad.png" alt="sad face"></img><br/>
          <h3 className="error-header">Sorry, no results were found.<br/> Try another search!</h3>
        </div>
      );
    } 

    let loading;
    if (this.props.loading) {
      loading = (
        <div className="loading-container">
          <h3 className="loading-header">Loading ...</h3>
          <div className="loader"></div> 
        </div>
      );
    } 

    let nutrition_results_array = this.props.nutritionResults;
    let nutrition_result = '';  
    nutrition_result = nutrition_results_array.map((result, index) => 
      <li key = {index} className="nutrition-list-item">
        <h3 className = "food-name">{result.food_name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h3>
        <img src = {`${result.photo.thumb}`} className = "result-image" alt = "food item"/>
        <ul className = "nutrition-facts">
          <li><span>Calories : </span>{result.nf_calories === null ? 0 : result.nf_calories}</li>
          <li><span>Total Fat : </span>{result.nf_total_fat === null ? 0 : result.nf_total_fat}g</li>
          <li><span>Saturated Fat : </span>{result.nf_saturated_fat === null ? 0 : result.nf_saturated_fat}g</li>
          <li><span>Cholesterol : </span>{result.nf_cholesterol === null ? 0 : result.nf_cholesterol}mg</li>
          <li><span>Sodium : </span>{result.nf_sodium === null ? 0 : result.nf_sodium}mg</li>
          <li><span>Potassium : </span>{result.nf_potassium === null ? 0 : result.nf_potassium}mg</li>
          <li><span>Carbohydrates : </span>{result.nf_total_carbohydrate === null ? 0 : result.nf_total_carbohydrate}g</li>
          <li><span>Dietary Fiber : </span>{result.nf_dietary_fiber === null ? 0 : result.nf_dietary_fiber}g</li>
          <li><span>Sugars : </span>{result.nf_sugars === null ? 0 : result.nf_sugars}g</li>
          <li><span>Protein : </span>{result.nf_protein === null ? 0 : result.nf_protein}g</li>
        </ul>
      </li>
    );
    
    return (
      // callback function automatically binds the this.onSubmit method to this particular component 
      // a href doesnt work because a tags refresh the browser, which means the state will be empty while this.props.history.push does not
      <section className = "nutrition-search-results">
        <div className="shape">
          <span onClick={() => this.props.history.push('/dashboard')} tabIndex="1" className="go-home-btn">Home</span>
          <span onClick={() => this.logOut()} tabIndex="2" className="logout-btn">Log Out</span><br/>
          <h1 className="title-header">Nutrition Counter</h1>
          <NutritionSearchPage/>
          <ExerciseSearchPage/><br/>
        </div>

        <ul className = {!this.props.loading ? "nutrition-results fadeIn" : "nutrition-results"}>
          {nutrition_result}
        </ul>
        {this.renderTotals()}
        {loading}
        {error}
      </section>
    );
  }
}

  


const mapStateToProps = state => ({
  loading: state.nutritionSearchReducer.loading,
  nutritionError: state.nutritionSearchReducer.error,
  nutritionResults: state.nutritionSearchReducer.nutrition,
  username: state.authReducer.currentUser.username
});

export default requiresLogin()(connect(mapStateToProps)(NutritionResults));
