import React, {Component} from 'react';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';
import NutritionSearchPage from '../Nutrition/nutrition-search-page';
import ExerciseSearchPage from './exercise-search-page';
import ExerciseResultsTotals from './exercise-results-totals';
import {connect} from 'react-redux';
import {addExercise} from '../../actions/protected-exercise-data';
import requiresLogin from '../Login/requires-login';
import '../../index.scss';

export class ExerciseResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaving: false
    };
  }

  logOut() {
    this.setState({leaving: true});
    const exerciseSearchResults = this.refs.exerciseResultsSection;
    exerciseSearchResults.addEventListener('animationend', e => {
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
    const exerciseSearchResults = this.refs.exerciseResultsSection;
    exerciseSearchResults.addEventListener('animationend', e => {
      if (e.animationName === 'opacity_out') {
        this.props.history.push('/dashboard');
      } else {
        return;
      }
    });
  }
  
  onAdd(e, cal, dur, username, date) {
    e.preventDefault();
    this.props.dispatch(addExercise(cal, dur, username, date));
    window.alert('You have just saved your exercise!');
  }

  render() {
    let error;
    if (this.props.exerciseResults.length === 0) {
      error = (
        <div className="error-msg">
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

    let exercise_results_array = this.props.exerciseResults;
    let exercise_result = '';
    exercise_result = exercise_results_array.map((result, index) => 
      <li key={index} className="exercise-list-item">
        <h3 className="exercise-name">{result.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h3>
        <p className="calories-burned"><span>Estimated Calories Burned :</span> {Math.floor(result.nf_calories)}</p>
        <p className="MET"><span>MET :</span> {result.met}</p>
        <p className="exercise-duration"><span>Duration :</span> {result.duration_min} min</p>
      </li>
    );
   
    return (
      <section className={`exercise-results-section ${this.state.leaving ? "opacity-out" : ""}`} ref="exerciseResultsSection">
        <div className="shape">
          <span onClick={() => this.toDashboard()} tabIndex="1" className="go-home-btn">Home</span>
          <span onClick={() => this.logOut()} tabIndex="2" className="logout-btn">Log Out</span><br/>
          <h1 className="title-header">Nutrition Counter</h1>
          <NutritionSearchPage/>
          <ExerciseSearchPage/><br/>
        </div>

        <ul className={!this.props.loading ? "exercise-results fadeIn" : "exercise-results"}>
          {exercise_result}
        </ul>
        <ExerciseResultsTotals/>
        {loading}
        {error}
      </section>
    );
  }
}


const mapStateToProps = state => ({
  loading: state.exerciseSearchReducer.loading,
  exerciseResults: state.exerciseSearchReducer.exercise_results,
  username: state.authReducer.currentUser.username
});

export default requiresLogin()(connect(mapStateToProps)(ExerciseResults));