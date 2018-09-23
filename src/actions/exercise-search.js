import {
  EXERCISE_BASE_URL,
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

function fetch_exercise(exercise) {
  const headers = {
    'Content-Type': 'application/json',
    'x-app-id': `${APP_ID}`,
    'x-app-key': `${APP_KEY}`
  }

  const body = JSON.stringify({
    'query': exercise
  });

  return fetch (`${EXERCISE_BASE_URL}`, {
    method: 'POST',
    body: body,
    headers: headers
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json()
  }).then(data => {
    console.log(data);
  });
}

export const get_exercise = exercise => dispatch => {
  dispatch(exerciseSearchRequest())
  fetch_exercise(exercise).then(exercise => {
    dispatch(exerciseSearchSuccess(exercise))
  }).catch(error => {
    dispatch(exerciseSearchError(error));
  });
}