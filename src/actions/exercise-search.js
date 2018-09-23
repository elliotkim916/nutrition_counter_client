import {
  NUTRITIONIX_BASE_URL,
  APP_ID,
  APP_KEY
} from '../config';

export const EXERCISE_SEARCH_REQUEST = 'EXERCISE_SEARCH_REQUEST';
export const exerciseSearchRequest = () => ({
  type: EXERCISE_SEARCH_REQUEST
});

export const EXERCISE_SEARCH_SUCCESS = 'EXERCISE_SEARCH_SUCCESS';
export const exerciseSearchSuccess = exercise_data => ({
  type: EXERCISE_SEARCH_SUCCESS,
  exercise_data
});

export const EXERCISE_SEARCH_ERROR = 'EXERCISE_SEARCH_ERROR';
export const exerciseSearchError = error => ({
  type: EXERCISE_SEARCH_ERROR,
  error
});