import {BEGIN_NOW} from '../actions/begin-now';

const initialState = {
  show_landing_page: true,
  show_nutrition_search_page: false,
  show_exercise_search_page: false
}

export function beginNowReducer(state=initialState, action) {
  if (action.type === BEGIN_NOW) {
    return Object.assign({}, state, {
      show_landing_page: false,
      show_nutrition_search_page: true,
      show_exercise_search_page: true
    });
  }
  return state;
}