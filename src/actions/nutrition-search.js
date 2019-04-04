import {
  NUTRITIONIX_BASE_URL,
  APP_ID,
  APP_KEY
} from '../config';
import history from '../history';

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

function fetch_nutrition(meal) {
  const headers = {
    'Content-Type': 'application/json',
    'x-app-id': `${APP_ID}`,
    'x-app-key': `${APP_KEY}`
  }

  const body = JSON.stringify({
    'query': meal,
    'timezone': 'US/Western'
  });

  return fetch(`${NUTRITIONIX_BASE_URL}`, {
    method: 'POST',
    body: body,
    headers: headers
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(data => data.foods);
}

export const get_nutrition = meal => dispatch => {
  dispatch(nutrtionSearchRequest());
  fetch_nutrition(meal)
  .then(meal => dispatch(nutritionSearchSuccess(meal)))
  .then(() => history.push('/nutrition-results'))
  .catch(error => dispatch(nutritionSearchError(error)))
  .then(() => history.push('/nutrition-results'));
} 