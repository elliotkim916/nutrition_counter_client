import {API_BASE_URL} from '../config.js';
import { getData, postData, removeData } from '../utility.js';

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
      console.log('fetch exercise data success', res);
      dispatch(fetchExerciseData(res));
    },
    err => {
      console.log('fetch exercise data error', err);
      dispatch(fetchExerciseError(err));
    }
  )
};

export const addExercise = exerciseTotals => (dispatch, getState) => {
  const {name, nf_calories, duration_min, created} = exerciseTotals;
  const username = getState().authReducer.currentUser.username;
  const data = JSON.stringify({
    exerciseName : name,
    caloriesBurned : nf_calories,
    duration : duration_min,
    username : username,
    created : created
  });

  postData(
    `${API_BASE_URL}/exercise/${username}`,
    data,
    res => {
      console.log('add exercise success', res);
      dispatch(addExerciseData(res));
    },
    err => {
      console.log('add exercise fail', err);
      dispatch(fetchExerciseError(err));
    }
  );
};

export const deleteExercise = id => (dispatch, getState) => {
  removeData(
    `${API_BASE_URL}/exercise/${id}`,
    res => {
      console.log('delete exercise success', res);
      dispatch(deleteExerciseData(id));
    },
    err => {
      console.log('delete exercise fail', err);
      dispatch(fetchExerciseError(err));
    }
  );
};