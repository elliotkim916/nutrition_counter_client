import {
  FETCH_EXERCISE_DATA,
  FETCH_EXERCISE_ERROR,
  ADD_EXERCISE_DATA,
  DELETE_EXERCISE_DATA
} from '../actions/protected-exercise-data';

const initialState = {
  exerciseData : '',
  loading : false,
  error : null
};

export function exerciseDataReducer(state=initialState, action) {
  if (action.type === FETCH_EXERCISE_DATA) {
    return Object.assign({}, state, {
      exerciseData : action.data,
      loading : false,
      error : null
    });
  } else if (action.type === ADD_EXERCISE_DATA) {
    return Object.assign({}, state, {
      exerciseData : [...state.exerciseData, action.addedExerciseData],
      loading : false,
      error : null
    });
  } else if (action.type === DELETE_EXERCISE_DATA) {
    return Object.assign({}, state, {
      exerciseData : state.exerciseData.filter(exercise => exercise._id !== action.id),
      loading : false,
      error : null
    })
  } else if (action.type === FETCH_EXERCISE_ERROR) {
    return Object.assign({}, state, {
      error : action.error,
      loading : false
    });
  }
  return state;
}
