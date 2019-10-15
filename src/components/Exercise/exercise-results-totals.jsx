import React from 'react';
import {connect} from 'react-redux';

const ExerciseResultsTotals = props => {
  let exerciseTotals = {
    'name' : '',
    'nf_calories' : 0,
    'duration_min' : 0
  };
  let i_count;
  
  for (let i = 0; i < props.exerciseResults.length; i++) {
    let name = props.exerciseResults[i].name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    exerciseTotals.name = exerciseTotals.name += name + (props.exerciseResults[i + 1] ? ', ' : '');
    exerciseTotals.nf_calories = Math.floor(exerciseTotals.nf_calories += props.exerciseResults[i].nf_calories);
    exerciseTotals.duration_min = Math.floor(exerciseTotals.duration_min += props.exerciseResults[i].duration_min);
    i === props.exerciseResults.length - 1 ? i_count = i : console.log('i error');
  }

  let cssClass;
  if (!props.loading) {
    cssClass = "exercise-totals fadeIn"
  } else {
    cssClass = "exercise-totals"
  }
  
  if (i_count >= 0) {
    return (
      <div className = {cssClass}>
        <form onSubmit = {(e) => this.onAdd(e, exerciseTotals.name, exerciseTotals.nf_calories, exerciseTotals.duration_min, this.props.username, Date.now)}>
          <h4>Total Calories Burned : {exerciseTotals.nf_calories}</h4>
          <h4>Total Duration : {exerciseTotals.duration_min} minutes</h4>
          <button type = "submit" className="save-btn">Save Exercise</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
}

const mapStateToProps = state => ({
  exerciseResults: state.exerciseSearchReducer.exercise_results,
  loading: state.exerciseSearchReducer.loading,
});

export default connect(mapStateToProps)(ExerciseResultsTotals);