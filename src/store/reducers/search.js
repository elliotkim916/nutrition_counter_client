import {
  SEARCH_REQUEST,
  NUTRITION_SEARCH_SUCCESS,
  EXERCISE_SEARCH_SUCCESS,
  SEARCH_ERROR,
  CLEAR_SEARCH_ERROR
} from '../actions/search';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  nutrition: [],
  exercise: [],
  error: null
};

const searchRequest = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const nutritionSearchSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    nutrition: action.nutrition
  });
};

const exerciseSearchSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    exercise: action.exercise
  })
}

const searchError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const clearSearchError = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

export function searchReducer(state=initialState, action) {
  switch(action.type) {
    case SEARCH_REQUEST : return searchRequest(state, action);
    case NUTRITION_SEARCH_SUCCESS : return nutritionSearchSuccess(state, action);
    case EXERCISE_SEARCH_SUCCESS : return exerciseSearchSuccess(state, action);
    case SEARCH_ERROR : return searchError(state, action);
    case CLEAR_SEARCH_ERROR : return clearSearchError(state, action);
    default: return state;
  }
}