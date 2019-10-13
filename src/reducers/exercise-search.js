import {
  EXERCISE_SEARCH_REQUEST,
  EXERCISE_SEARCH_SUCCESS,
  EXERCISE_SEARCH_ERROR
} from '../actions/exercise-search';
import { updateObject } from '../utility';

const initialState = {
  loading: false,
  exercise_results: [],
  error: null
};

const exerciseSearchRequest = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const exerciseSearchSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    exercise_results: action.exercise_data
  });
};

const exerciseSearchError = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

export function exerciseSearchReducer(state=initialState, action) {
  switch(action.type) {
    case EXERCISE_SEARCH_REQUEST : return exerciseSearchRequest(state, action);
    case EXERCISE_SEARCH_SUCCESS : return exerciseSearchSuccess(state, action);
    case EXERCISE_SEARCH_ERROR : return exerciseSearchError(state, action);
    default: return state;
  }
} 