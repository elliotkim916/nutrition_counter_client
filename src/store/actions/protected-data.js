import {API_BASE_URL} from '../../config.js';
import { getData, postData, removeData } from '../../shared/utility';
import * as actionTypes from './actionTypes';

// all actions associated with getting nutrition/exercise data
export const getNutritionDataSuccess = data => ({
  type: actionTypes.GET_NUTRITION_DATA_SUCCESS,
  data
});

export const getExerciseDataSuccess = data => ({
  type: actionTypes.GET_EXERCISE_DATA_SUCCESS,
  data
});

export const getDataError = error => ({
  type: actionTypes.GET_DATA_ERROR,
  error
});

export const getProtectedData = (option) => (dispatch, getState) => {
  const username = getState().authReducer.currentUser.username;

  getData(
    `${API_BASE_URL}/${option}/${username}`,
    res => {
      console.log('get protected data success', res);
      if (option === 'nutrition') {
        dispatch(getNutritionDataSuccess(res));
      }

      if (option === 'exercise') {
        dispatch(getExerciseDataSuccess(res));
      }
    },
    err => {
      console.log('fetch protected data fail', err);
      dispatch(getDataError(err))
    }   
  )
}

// all actions associated with adding new exercise/nutrition data
export const addNutritionDataSuccess = nutritionData => ({
  type: actionTypes.ADD_NUTRITION_DATA_SUCCESS,
  nutritionData
});

export const addExerciseDataSuccess = exerciseData => ({
  type: actionTypes.ADD_EXERCISE_DATA_SUCCESS,
  exerciseData
});

export const addDataError = error => ({
  type: actionTypes.ADD_DATA_ERROR,
  error
});

export const clearError = () => ({
  type: actionTypes.CLEAR_ERROR,
  error: null
})

export const addProtectedData = (totals, option) => (dispatch, getState) => {
  const username = getState().authReducer.currentUser.username;
  let data;
  
  if (option === 'nutrition') {
    const {food_name, nf_calories, nf_total_fat, nf_total_carbohydrate, nf_protein, nf_sugars, nf_sodium, created} = totals;
    data = JSON.stringify({
      food_name : food_name, 
      calories : nf_calories,
      fat : nf_total_fat,
      carbs : nf_total_carbohydrate,
      protein : nf_protein,
      sugar : nf_sugars,
      sodium : nf_sodium,
      created : created,
      username : username
    });
  }

  if (option === 'exercise') {
    const {name, nf_calories, duration_min, created} = totals;
    data = JSON.stringify({
      exerciseName : name,
      caloriesBurned : nf_calories,
      duration : duration_min,
      username : username,
      created : created
    });
  }
  
  postData(
    `${API_BASE_URL}/${option}/${username}`,
    data,
    res => {
      console.log('add protected data success', res);
      if (option === 'nutrition') {
        dispatch(addNutritionDataSuccess(res));
      }

      if (option === 'exercise') {
        dispatch(addExerciseDataSuccess(res));
      }
    },
    err => {
      console.log('add protected data fail', err);
      dispatch(addDataError(err));
    }
  )
}

// all actions associated with deleting nutrition/exercise data
export const deleteDataStart = () => ({
  type: actionTypes.DELETE_DATA_START
});

export const deleteNutritionDataSuccess = id => ({
  type: actionTypes.DELETE_NUTRITION_DATA_SUCCESS,
  id
});

export const deleteExerciseDataSuccess = id => ({
  type: actionTypes.DELETE_EXERCISE_DATA_SUCCESS,
  id
});

export const deleteDataError = error => ({
  type: actionTypes.DELETE_DATA_ERROR,
  error
})

export const resetDelete = () => ({
  type: actionTypes.RESET_DELETE
});

export const deleteData = (id, option) => (dispatch, getState) => {
  removeData(
    `${API_BASE_URL}/${option}/${id}`,
    res => {
      console.log('delete successful', res);

      if (option === 'nutrition') {
        dispatch(deleteNutritionDataSuccess(id));
      }
    
      if (option === 'exercise') {
        dispatch(deleteExerciseDataSuccess(id));
      }
    },
    err => {
      console.log('delete fail', err);
      dispatch(deleteDataError(err));
    }
  );
}
