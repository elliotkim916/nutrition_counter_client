import React from 'react';
import { connect } from 'react-redux';
import ExerciseSaveTotals from './ExerciseSaveTotals';

const ExerciseResultsTotals = ({
  exerciseResults,
  onAdd,
  loading,
  exerciseError,
}) => {
  const exerciseTotals = {
    name: '',
    nf_calories: 0,
    duration_min: 0,
    created: '',
  };
  let i_count;

  for (let i = 0; i < exerciseResults.length; i++) {
    let name = exerciseResults[i].name
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    exerciseTotals['name'] = name + (exerciseResults[i + 1] ? ', ' : '');
    exerciseTotals['nf_calories'] = exerciseTotals['nf_calories'] += Math.floor(
      exerciseResults[i].nf_calories
    );
    exerciseTotals['duration_min'] = exerciseTotals[
      'duration_min'
    ] += Math.floor(exerciseResults[i].duration_min);
    exerciseTotals['created'] = Date.now;
    i === exerciseResults.length - 1 ? (i_count = i) : console.log('i error');
  }

  let cssClass;
  if (!loading && exerciseError === null) {
    cssClass = 'exercise-totals fadeIn';
  } else {
    cssClass = 'exercise-totals';
  }

  if (i_count >= 0) {
    return (
      <ExerciseSaveTotals
        cssClass={cssClass}
        exerciseTotals={exerciseTotals}
        onAdd={onAdd}
      />
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  exerciseResults: state.searchReducer.exercise,
  loading: state.searchReducer.loading,
});

export default connect(mapStateToProps)(ExerciseResultsTotals);
