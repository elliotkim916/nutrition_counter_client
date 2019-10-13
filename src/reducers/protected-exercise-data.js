import {
  FETCH_EXERCISE_DATA,
  FETCH_EXERCISE_ERROR,
  ADD_EXERCISE_DATA,
  DELETE_EXERCISE_DATA
} from '../actions/protected-exercise-data';
import { updateObject } from '../utility';

const initialState = {
  exerciseData : '',
  loading : false,
  error : null
};

const fetchExerciseData = (state, action) => {
  return updateObject(state, {
    exerciseData: action.data.sort((a, b) => a.created > b.created ? -1 : a.created < b.created ? 1 : 0),
    loading: false,
    error: null
  });
};

const addExerciseData = (state, action) => {
  return updateObject(state, {
    exerciseData: [...state.exerciseData, action.addedExerciseData],
    loading: false,
    error: null
  });
};

const deleteExerciseData = (state, action) => {
  return updateObject(state, {
    exerciseData: state.exerciseData.filter(exercise => exercise._id !== action.id),
    loading: false,
    error: null
  });
};

const fetchExerciseError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export function exerciseDataReducer(state=initialState, action) {
  switch(action.type) {
    case FETCH_EXERCISE_DATA : return fetchExerciseData(state, action);
    case ADD_EXERCISE_DATA : return addExerciseData(state, action);
    case DELETE_EXERCISE_DATA : return deleteExerciseData(state, action);
    case FETCH_EXERCISE_ERROR : return fetchExerciseError(state, action);
    default : return state;
  }
}
