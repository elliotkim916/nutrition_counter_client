import React, {Component} from 'react';
import NutritionSearchPage from './nutrition-search-page';
import ExerciseSearchPage from './exercise-search-page';
import './exercise-results.css';
import {connect} from 'react-redux';
import {addExercise} from '../actions/protected-exercise-data';

export class ExerciseResults extends Component {
  onAdd(e, cal, dur, username, date) {
    e.preventDefault();
    this.props.dispatch(addExercise(cal, dur, username, date));
    window.alert('You have just saved your exercise!');
  }

  renderTotals() {
    let exercise_results_array = this.props.exerciseResults;
    let exerciseTotals = {
      'name' : '',
      'nf_calories' : 0,
      'duration_min' : 0
    };
    let i_count;
    
    for (let i = 0; i < exercise_results_array.length; i++) {
      let name = exercise_results_array[i].name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
      exerciseTotals.name = exerciseTotals.name += name + (exercise_results_array[i + 1] ? ', ' : '');
      exerciseTotals.nf_calories = Math.floor(exerciseTotals.nf_calories += exercise_results_array[i].nf_calories);
      exerciseTotals.duration_min = Math.floor(exerciseTotals.duration_min += exercise_results_array[i].duration_min);
      i === exercise_results_array.length - 1 ? i_count = i : console.log('i error');
    }
  
    if (i_count >= 0) {
      return (
        <div className = "exercise-totals">
          <form onSubmit = {(e) => this.onAdd(e, exerciseTotals.name, exerciseTotals.nf_calories, exerciseTotals.duration_min, this.props.username, Date.now)}>
            <h3>Total Calories Burned : {exerciseTotals.nf_calories}</h3>
            <h3>Total Duration : {exerciseTotals.duration_min} minutes</h3>
            <button type = "submit">Save Exercise</button>
          </form>
        </div>
      );
    }
  }

  render() {
    let exercise_results_array = this.props.exerciseResults;
    let exercise_result = '';

    exercise_result = exercise_results_array.map((result, index) => 
      <li key={index} className="exercise-list-item">
        <h3 className="exercise-name">{result.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h3>
        <p className="calories-burned">Estimated Calories Burned : {Math.floor(result.nf_calories)}</p>
        <p className="MET">MET : {result.met}</p>
        <p className="exercise-duration">Duration : {result.duration_min} min</p>
      </li>
    );

    return (
      <section className="exercise-results-section">
        <div className="shape">
          <p onClick={() => this.props.history.push('/dashboard')} className="go-home-btn">Home</p>
          <p onClick={() => this.logOut()} className="logout-btn">Log Out</p><br/>
          <h1 className="title-header">Nutrition Counter</h1>
          <NutritionSearchPage/>
          <ExerciseSearchPage/><br/>
        </div>
        
        <ul className="exercise-results">
          {exercise_result}
        </ul>
        {this.renderTotals()}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  exerciseResults: state.exerciseSearchReducer.exercise_results,
  username: state.authReducer.currentUser.username
});

export default connect(mapStateToProps)(ExerciseResults);