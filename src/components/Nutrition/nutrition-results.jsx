import React, {Component} from 'react';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';
import NutritionSearchPage from '../Nutrition/nutrition-search-page';
import NutritionResultsTotals from '../Nutrition/nutrition-results-totals';
import ExerciseSearchPage from '../Exercise/exercise-search-page';
import {connect} from 'react-redux';
import {addProtectedData, clearError} from '../../actions/protected-data';
import {clearSearchError} from '../../actions/nutrition-search';
import {AddSuccess} from '../../shared/add';
import requiresLogin from '../Login/requires-login';
import Loading from '../Loading/loading';
import Error from '../Error/error';
import '../../index.scss';

export class NutritionResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaving: false,
      addSuccess: false
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
    this.setState({addSuccess: true});
  }

  nutritionTotal(nutrition) {
    if (nutrition === null) {
      return 0;
    } else {
      return nutrition;
    }
  }

  render() {
    let nutrition_result = this.props.nutritionResults.map((result, index) => 
      <li key = {index} className="nutrition-list-item">
        <h3 className = "food-name">{result.food_name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h3>
        <img src = {`${result.photo.thumb}`} className = "result-image" alt = "food item"/>
        <ul className = "nutrition-facts">
          <li><span>Calories : </span>{this.nutritionTotal(result.nf_calories)}</li>
          <li><span>Total Fat : </span>{this.nutritionTotal(result.nf_total_fat)}g</li>
          <li><span>Saturated Fat : </span>{this.nutritionTotal(result.nf_saturated_fat)}g</li>
          <li><span>Cholesterol : </span>{this.nutritionTotal(result.nf_cholesterol)}mg</li>
          <li><span>Sodium : </span>{this.nutritionTotal(result.nf_sodium)}mg</li>
          <li><span>Potassium : </span>{this.nutritionTotal(result.nf_potassium)}mg</li>
          <li><span>Carbohydrates : </span>{this.nutritionTotal(result.nf_total_carbohydrate)}g</li>
          <li><span>Dietary Fiber : </span>{this.nutritionTotal(result.nf_dietary_fiber)}g</li>
          <li><span>Sugars : </span>{this.nutritionTotal(result.nf_sugars)}g</li>
          <li><span>Protein : </span>{this.nutritionTotal(result.nf_protein)}g</li>
        </ul>
      </li>
    );

    let addSuccess, addError, loading, searchError;
    if (this.state.addSuccess) {
      addSuccess = (
        <AddSuccess 
          message='You have successfully saved your nutrition!' 
          clearAddSuccess={() => this.setState({addSuccess: false})}
        />
      );
    } else {
      addSuccess = null;
    }

    if (this.props.addError) {
      addError = (
        <Error
          errorMessage='Sorry, your nutrition was unable to be saved..'
          clearError={clearError}
        /> 
      );
    } else {
      addError = null;
    }

    if (this.props.loading && !this.props.nutritionError) {
      loading = <Loading message='Nutrition result loading..' />;
    } else {
      loading = null;
    }

    if (this.props.nutritionError) {
      searchError = (
        <Error 
          errorMessage='Sorry, no results were found..'
          clearError={clearSearchError}
        /> 
      );
    } else {
      searchError = null;
    }

    return (
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

        {addSuccess}
        {addError}
        {loading}
        {searchError}
      </section>
    );
  }
}

  


const mapStateToProps = state => ({
  loading: state.nutritionSearchReducer.loading,
  nutritionError: state.nutritionSearchReducer.error,
  nutritionResults: state.nutritionSearchReducer.nutrition,
  username: state.authReducer.currentUser.username,
  addError: state.protected.error
});

export default requiresLogin()(connect(mapStateToProps)(NutritionResults));
