import React, {Component} from 'react';
import './exercise-results.css';
import {connect} from 'react-redux';

export class ExerciseResults extends Component {
  onAdd(e, cal, dur, username, date) {
    e.preventDefault();
    // Need to add code that will dispatch my async action that will make POST request to server
  }

  renderResult() {
    let calorieSum;
    let durationSum;
    let exercise_results_array = this.props.exerciseResults;
    let calories_burned_array = exercise_results_array.map(cal => {
      return cal.nf_calories;
    });
    let total_duration_array = exercise_results_array.map(val => {
      return val.duration_min;
    });
    
    if (calories_burned_array.length && total_duration_array.length > 0) {
      calorieSum = calories_burned_array.reduce((acc, currentVal) => {
        return Math.floor(acc + currentVal);
      });
      durationSum = total_duration_array.reduce((acc, currentVal) => {
        return Math.floor(acc + currentVal);
      });

      return (
        <div className = "exercise-totals">
          <form
            // onSubmit = {(e) => this.onAdd(e, cal, dur, this.props.username, Date.now)}
          >
            <h3>Total Calories Burned : {calorieSum}</h3>
            <h3>Total Duration : {durationSum}</h3>
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
        {this.renderResult()}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  exerciseResults: state.exercise.exercise_results,
  username: state.auth.currentUser.username
});

export default connect(mapStateToProps)(ExerciseResults);