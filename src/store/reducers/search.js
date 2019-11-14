import * as actionTypes from '../actions/actionTypes';
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
    case actionTypes.SEARCH_REQUEST : return searchRequest(state, action);
    case actionTypes.NUTRITION_SEARCH_SUCCESS : return nutritionSearchSuccess(state, action);
    case actionTypes.EXERCISE_SEARCH_SUCCESS : return exerciseSearchSuccess(state, action);
    case actionTypes.SEARCH_ERROR : return searchError(state, action);
    case actionTypes.CLEAR_SEARCH_ERROR : return clearSearchError(state, action);
    default: return state;
  }
}