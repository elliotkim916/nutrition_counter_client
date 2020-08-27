import React from 'react';

const ExerciseSaveTotals = React.memo(({ cssClass, exerciseTotals, onAdd }) => {
  return (
    <div className={cssClass}>
      <form onSubmit={(e) => onAdd(e, exerciseTotals, 'exercise')}>
        <h4>Total Calories Burned : {exerciseTotals.nf_calories}</h4>
        <h4>Total Duration : {exerciseTotals.duration_min} minutes</h4>
        <button type="submit" className="save-btn">
          Save Exercise
        </button>
      </form>
    </div>
  );
});

export default ExerciseSaveTotals;
