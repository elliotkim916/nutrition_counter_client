import { NUTRITIONIX_BASE_URL, EXERCISE_BASE_URL } from '../../config';
import history from '../../history';
import { postData } from '../../shared/utility';
import * as actionTypes from './actionTypes';

export const searchRequest = () => ({
  type: actionTypes.SEARCH_REQUEST
});

export const nutritionSearchSuccess = nutrition => ({
  type: actionTypes.NUTRITION_SEARCH_SUCCESS,
  nutrition
});

export const exerciseSearchSuccess = exercise => ({
  type: actionTypes.EXERCISE_SEARCH_SUCCESS,
  exercise
});

export const searchError = error => ({
  type: actionTypes.SEARCH_ERROR,
  error
});

export const clearSearchError = () => ({
  type: actionTypes.CLEAR_SEARCH_ERROR
});

export const searchFor = (searchValue, option) => dispatch => {
  let url, body;

  if (option === 'nutrition') {
    url = NUTRITIONIX_BASE_URL;
    body = JSON.stringify({
      'query': searchValue,
      'timezone': 'US/Western'
    });
  }

  if (option === 'exercise') {
    url = EXERCISE_BASE_URL;
    body = JSON.stringify({
      'query': searchValue
    });
  }

  dispatch(searchRequest());
  postData(
    url,
    body,
    res => {
      console.log('successful search response', res);
      if (option === 'nutrition') {
        dispatch(nutritionSearchSuccess(res.foods));
        history.push('/nutrition-results');
      }

      if (option === 'exercise') {
        if (res.exercises.length > 0) {
          dispatch(exerciseSearchSuccess(res.exercises));
        } else {
          dispatch(searchError('Search returned no results..'));
        }
        history.push('/exercise-results');
      }
    },
    err => {
      console.log('search error', err);
      dispatch(searchError(err));

      if (option === 'nutrition') {
        history.push('/nutrition-results');
      } else {
        history.push('/exercise-results');
      }
    }
  )
} 