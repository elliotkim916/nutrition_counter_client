import React from 'react';
import {connect} from 'react-redux';

const ExerciseResultsTotals = props => {
  const exerciseTotals = {};
  let i_count;
  
  for (let i = 0; i < props.exerciseResults.length; i++) {
    let name = props.exerciseResults[i].name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    exerciseTotals['name'] = name + (props.exerciseResults[i + 1] ? ', ' : '');
    exerciseTotals['nf_calories'] = Math.floor(props.exerciseResults[i].nf_calories);
    exerciseTotals['duration_min'] = Math.floor(props.exerciseResults[i].duration_min);
    exerciseTotals['created'] = Date.now;
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
        <form onSubmit = {(e) => props.onAdd(e, exerciseTotals)}>
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