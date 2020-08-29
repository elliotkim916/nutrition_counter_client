import React from 'react';
import moment from 'moment';

const ExerciseDashboardListItem = React.memo(
  ({ value, deleteExercise, updateIdAndOption }) => {
    return (
      <div className="exercise_total">
        <ul className="date">
          <li>{moment(value.created).format('dddd, MMMM Do YYYY')}</li>
          <li>{moment(value.created).format('h:mm a')}</li>
        </ul>
        <ul>
          <li>
            <span className="list-title">Exercise Name :</span>{' '}
            {value.exerciseName}
          </li>
          <li>
            <span className="list-title">Calories Burned :</span>{' '}
            {value.caloriesBurned}
          </li>
          <li>
            <span className="list-title">Duration of workout :</span>{' '}
            {value.duration} minutes
          </li>
        </ul>
        <button
          onClick={() => {
            updateIdAndOption(value._id, 'exercise');
            deleteExercise();
          }}
          className="delete-btn"
        >
          <span className="exit">x</span>
        </button>
        <div className="line"></div>
      </div>
    );
  }
);

export default ExerciseDashboardListItem;
