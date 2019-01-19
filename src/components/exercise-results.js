import React, {Component} from 'react';
import './exercise-results.css';
import {connect} from 'react-redux';

class ExerciseResults extends Component {
  renderResult() {
    let sum;
    let exercise_results_array = this.props.exerciseResults;
    let calories_burned_array = exercise_results_array.map(cal => {
      return cal.nf_calories;
    });
    
    if (calories_burned_array.length > 0) {
      sum = calories_burned_array.reduce((acc, currentVal) => {
        return acc + currentVal;
      });

      return (
        <h3 className="cal-burned-sum">Total Calories Burned : {sum}</h3>
      )
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
  exerciseResults: state.exercise.exercise_results
});

export default connect(mapStateToProps)(ExerciseResults);