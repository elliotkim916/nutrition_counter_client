import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

const ExerciseTotals = props => {
  let exerciseTotals = '';

  if (props.exerciseData) {
    exerciseTotals = props.exerciseData.map((value, index) => 
      <div key = {index} className = "exercise_total">
        <h3 className="date">{moment(value.created).format('dddd MMMM Do YYYY, h:mm a')}</h3>
        <ul>
          <li><span className="list-title">Exercise Name :</span> {value.exerciseName}</li>
          <li><span className="list-title">Calories Burned :</span> {value.caloriesBurned}</li>
          <li><span className="list-title">Duration of workout :</span> {value.duration} minutes</li>
        </ul>
        <button onClick = {e => props.deleteExercise(e, value._id)} className="delete-btn"><span className="exit">x</span></button>
        <div className="line"></div>
    </div>
    );
  }

  if (props.tab) {
    return (
      <React.Fragment>
        {exerciseTotals}
      </React.Fragment>
    );
  }

  return (
    <div className='exercise-totals-container'>
      <h3>Exercise Totals</h3>
      {exerciseTotals}
    </div>
  );
}

const mapStateToProps = state => ({
  exerciseData : state.exerciseDataReducer.exerciseData
});

export default connect(mapStateToProps)(ExerciseTotals);
