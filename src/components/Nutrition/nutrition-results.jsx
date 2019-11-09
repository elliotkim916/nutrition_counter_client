import React, {Component} from 'react';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';
import '../../index.scss';
import NutritionSearchPage from '../Nutrition/nutrition-search-page';
import NutritionResultsTotals from '../Nutrition/nutrition-results-totals';
import ExerciseSearchPage from '../Exercise/exercise-search-page';
import {connect} from 'react-redux';
import {addProtectedData} from '../../actions/protected-data';
import requiresLogin from '../Login/requires-login';
import Loading from '../Loading/loading';
import Error from '../Error/error';

export class NutritionResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaving: false
    };

    this.onAdd = this.onAdd.bind(this);
  }

  logOut() {
    this.setState({leaving: true});
    const nutritionSearchResults = this.refs.nutritionSearchResults;
    nutritionSearchResults.addEventListener('animationend', e => {
      if (e.animationName === 'opacity_out') {
        this.props.dispatch(clearAuth());
        clearAuthToken();
        this.props.history.push('/login-page');
      } else {
        return;
      }
    });
  }

  toDashboard() {
    this.setState({leaving: true});
    const nutritionSearchResults = this.refs.nutritionSearchResults;
    nutritionSearchResults.addEventListener('animationend', e => {
      if (e.animationName === 'opacity_out') {
        this.props.history.push('/dashboard');
      } else {
        return;
      }
    });
  }

  onAdd(e, nutritionTotals, option) {
    e.preventDefault();
    this.props.dispatch(addProtectedData(nutritionTotals, option));
    window.alert('You have just saved your nutrition!');
  }

  render() {
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
      <section className = {`nutrition-search-results ${this.state.leaving ? "opacity-out" : ""}`} ref="nutritionSearchResults">
        <div className="shape">
          <span onClick={() => this.toDashboard()} tabIndex="1" className="go-home-btn">Home</span>
          <span onClick={() => this.logOut()} tabIndex="2" className="logout-btn">Log Out</span><br/>
          <h1 className="title-header">Nutrition Counter</h1>
          <NutritionSearchPage/>
          <ExerciseSearchPage/><br/>
        </div>

        <ul className = {!this.props.loading ? "nutrition-results fadeIn" : "nutrition-results"}>
          {nutrition_result}
        </ul>
        <NutritionResultsTotals onAdd={this.onAdd}/>
        {
          this.props.loading && !this.props.nutritionError ?
          <Loading/> :
          null
        }
        {
          this.props.nutritionError ? 
          <Error loading={this.props.loading} /> : 
          null
        }
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
