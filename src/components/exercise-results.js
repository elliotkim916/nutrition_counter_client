import React, {Component} from 'react';
import './exercise-results.css';
import {connect} from 'react-redux';

export class ExerciseResults extends Component {
  onAdd(e, cal, dur, username, date) {
    e.preventDefault();
    // Need to add code that will dispatch my async action that will make POST request to server
  }

  renderTotals() {
    let exercise_results_array = this.props.exerciseResults;
    let exerciseTotals = {
      'nf_calories' : 0,
      'duration_min' : 0
    };
    
    for (let i = 0; i < exercise_results_array.length; i++) {
      exerciseTotals.nf_calories = Math.floor(exerciseTotals.nf_calories += exercise_results_array[i].nf_calories);
      exerciseTotals.duration_min = Math.floor(exerciseTotals.duration_min += exercise_results_array[i].duration_min);
    }

    return (
      <div className = "exercise-totals">
        <form
          // onSubmit = {(e) => this.onAdd(e, cal, dur, this.props.username, Date.now)}
        >
          <h3>Total Calories Burned : {exerciseTotals.nf_calories}</h3>
          <h3>Total Duration : {exerciseTotals.duration_min} minutes</h3>
          <button type = "submit">Save Exercise</button>
        </form>
      </div>
    );
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
  exerciseResults: state.exercise.exercise_results,
  username: state.auth.currentUser.username
});

export default connect(mapStateToProps)(ExerciseResults);