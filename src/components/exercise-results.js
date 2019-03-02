import React, {Component} from 'react';
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
      let name = exercise_results_array[i].name.charAt(0).toUpperCase() + exercise_results_array[i].name.slice(1);
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
        <h3 className="exercise-name">{result.name.charAt(0).toUpperCase() + result.name.slice(1)}</h3>
        <p className="calories-burned">Estimated Calories Burned : {Math.floor(result.nf_calories)}</p>
        <p className="MET">MET : {result.met}</p>
        <p className="exercise-duration">Duration : {result.duration_min} min</p>
      </li>
    );

    return (
      <section className="exercise-results-section">
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