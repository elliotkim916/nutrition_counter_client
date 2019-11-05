import {API_BASE_URL} from '../config.js';
import {normalizeResponseErrors} from './utils.js';
import { getData } from '../utility.js';

export const FETCH_EXERCISE_DATA = 'FETCH_EXERCISE_DATA';
export const fetchExerciseData = data => ({
  type : FETCH_EXERCISE_DATA,
  data
});

export const FETCH_EXERCISE_ERROR = 'FETCH_EXERCISE_ERROR';
export const fetchExerciseError = error => ({
  type : FETCH_EXERCISE_ERROR,
  error
});

export const ADD_EXERCISE_DATA = 'ADD_EXERCISE_DATA';
export const addExerciseData = addedExerciseData => ({
  type : ADD_EXERCISE_DATA,
  addedExerciseData
});

export const DELETE_EXERCISE_DATA = 'DELETE_EXERCISE_DATA';
export const deleteExerciseData = id => ({
  type : DELETE_EXERCISE_DATA,
  id
});

export const getExercise = () => (dispatch, getState) => {
  const username = getState().authReducer.currentUser.username;
  
  getData(
    `${API_BASE_URL}/exercise/${username}`,
    res => {
      console.log('fetch exericse data success', res);
      dispatch(fetchExerciseData(res));
    },
    err => {
      console.log('fetch exercise data error', err);
      dispatch(fetchExerciseError(err));
    }
  )
};

export const addExercise = (name, calories, duration, username, date) => (dispatch, getState) => {
  const authToken = getState().authReducer.authToken;
  const body = JSON.stringify({
    exerciseName : name,
    caloriesBurned : calories,
    duration : duration,
    username : username,
    created : date
  });
  const headers = {
    'Authorization' : `Bearer ${authToken}`,
    'Content-Type' : 'application/json'
  };

  return fetch(`${API_BASE_URL}/exercise/${username}`, {
    headers: headers,
    body : body,
    method : 'POST'
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(addExerciseData(data)))
  .catch(err => dispatch(fetchExerciseError(err)))
};

export const deleteExercise = id => (dispatch, getState) => {
  const authToken = getState().authReducer.authToken;
  const headers = {
    'Authorization' : `Bearer ${authToken}`,
    'Content-Type' : 'application/json'
  };

  return fetch(`${API_BASE_URL}/exercise/${id}`, {
    headers : headers,
    method : 'DELETE'
  })
  .then(() => dispatch(deleteExerciseData(id)))
  .catch(err => dispatch(fetchExerciseError(err)))
}