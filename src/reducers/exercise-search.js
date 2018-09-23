import {
  EXERCISE_SEARCH_REQUEST,
  EXERCISE_SEARCH_SUCCESS,
  EXERCISE_SEARCH_ERROR
} from '../actions/exercise-search';

const initialState = {
  loading: false,
  exercise_results: [],
  error: null
};

export function exerciseSearchReducer(state=initialState, action) {
  if (action.type === EXERCISE_SEARCH_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === EXERCISE_SEARCH_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      results: action.exercise_results
    });
  } else if (action.type === EXERCISE_SEARCH_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
} 