import {NUTRITIONIX_BASE_URL} from '../config';
import history from '../history';
import { postData } from '../utility';

export const NUTRITION_SEARCH_REQUEST = 'NUTRITION_SEARCH_REQUEST';
export const nutrtionSearchRequest = () => ({
  type: NUTRITION_SEARCH_REQUEST
});

export const NUTRITION_SEARCH_SUCCESS = 'NUTRITION_SEARCH_SUCCESS';
export const nutritionSearchSuccess = nutrition => ({
  type: NUTRITION_SEARCH_SUCCESS,
  nutrition
});

export const NUTRITION_SEARCH_ERROR = 'NUTRITION_SEARCH_ERROR';
export const nutritionSearchError = error => ({
  type: NUTRITION_SEARCH_ERROR,
  error
});

export const get_nutrition = meal => dispatch => {
  const body = JSON.stringify({
    'query': meal,
    'timezone': 'US/Western'
  });

  dispatch(nutrtionSearchRequest());
  postData(
    NUTRITIONIX_BASE_URL,
    body,
    res => {
      console.log('nutrition search response', res);
      dispatch(nutritionSearchSuccess(res.foods));
      history.push('/nutrition-results');
    },
    err => {
      console.log('nutrition search error', err);
      dispatch(nutritionSearchError(err));
      history.push('/nutrition-results');
    }
  )
} 