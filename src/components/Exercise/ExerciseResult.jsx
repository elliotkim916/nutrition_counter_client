import React from 'react';

const ExerciseResult = ({ result }) => {
  return (
    <li className="exercise-list-item">
      <h3 className="exercise-name">
        {result.name
          .toLowerCase()
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}
      </h3>
      <p className="calories-burned">
        <span>Estimated Calories Burned :</span>{' '}
        {Math.floor(result.nf_calories)}
      </p>
      <p className="MET">
        <span>MET :</span> {result.met}
      </p>
      <p className="exercise-duration">
        <span>Duration :</span> {result.duration_min} min
      </p>
    </li>
  );
};

export default ExerciseResult;
