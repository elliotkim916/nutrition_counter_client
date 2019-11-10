import {
  NUTRITION_SEARCH_REQUEST,
  NUTRITION_SEARCH_SUCCESS,
  NUTRITION_SEARCH_ERROR,
  CLEAR_SEARCH_ERROR
} from '../actions/nutrition-search';
import { updateObject } from '../shared/utility';

const initialState = {
  loading: false,
  nutrition: [],
  error: null
};

const nutritionSearchRequest = (state, action) => {
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

const nutritionSearchError = (state, action) => {
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

export function nutritionSearchReducer(state=initialState, action) {
  switch(action.type) {
    case NUTRITION_SEARCH_REQUEST : return nutritionSearchRequest(state, action);
    case NUTRITION_SEARCH_SUCCESS : return nutritionSearchSuccess(state, action);
    case NUTRITION_SEARCH_ERROR : return nutritionSearchError(state, action);
    case CLEAR_SEARCH_ERROR : return clearSearchError(state, action);
    default: return state;
  }
}