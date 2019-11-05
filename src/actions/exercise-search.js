import {EXERCISE_BASE_URL} from '../config';
import history from '../history';
import { postData } from '../utility';

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

export const get_exercise = exercise => dispatch => {
  const body = JSON.stringify({
    'query': exercise
  });

  dispatch(exerciseSearchRequest());
  postData(
    EXERCISE_BASE_URL,
    body,
    res => {
      console.log('exercise search success', res.exercises);
      dispatch(exerciseSearchSuccess(res.exercises));
      history.push('/exercise-results');
    },
    err => {
      console.log('exercise search fail', err);
      dispatch(exerciseSearchError(err));
      history.push('/exercise-results');
    }
  );
}