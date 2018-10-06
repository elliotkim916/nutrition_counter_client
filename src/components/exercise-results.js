import React, {Component} from 'react';
import './exercise-results.css';
import {connect} from 'react-redux';

class ExerciseResults extends Component {
  render() {
    let exercise_results_array = this.props.exerciseResults;
    let exercise_result = '';
    console.log(exercise_results_array);

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
      </section>
    );
  }
}

const mapStateToProps = state => ({
  exerciseResults: state.exercise.exercise_results
});

export default connect(mapStateToProps)(ExerciseResults);