import {
  NUTRITION_SEARCH_REQUEST,
  NUTRITION_SEARCH_SUCCESS,
  NUTRITION_SEARCH_ERROR
} from '../actions/nutrition-search';

const initialState = {
  loading: false,
  nutrition: [],
  error: null
};

export function nutritionSearchReducer(state=initialState, action) {
  if (action.type === NUTRITION_SEARCH_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === NUTRITION_SEARCH_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      nutrition: action.nutrition,
      error: null
    });
  } else if (action.type === NUTRITION_SEARCH_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      nutrition: [],
      loading: false
    });
  }
  return state;
}