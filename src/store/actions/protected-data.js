import {API_BASE_URL} from '../../config.js';
import { getData, postData, removeData } from '../../shared/utility';

// all actions associated with getting nutrition/exercise data
export const GET_NUTRITION_DATA_SUCCESS = 'GET_NUTRITION_DATA_SUCCESS';
export const getNutritionDataSuccess = data => ({
  type: GET_NUTRITION_DATA_SUCCESS,
  data
});

export const GET_EXERCISE_DATA_SUCCESS = 'GET_EXERCISE_DATA_SUCCESS';
export const getExerciseDataSuccess = data => ({
  type: GET_EXERCISE_DATA_SUCCESS,
  data
});

export const GET_DATA_ERROR = 'GET_DATA_ERROR';
export const getDataError = error => ({
  type: GET_DATA_ERROR,
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
export const ADD_NUTRITION_DATA_SUCCESS = 'ADD_NUTRITION_DATA_SUCCESS';
export const addNutritionDataSuccess = nutritionData => ({
  type: ADD_NUTRITION_DATA_SUCCESS,
  nutritionData
});

export const ADD_EXERCISE_DATA_SUCCESS = 'ADD_EXERCISE_DATA_SUCCESS';
export const addExerciseDataSuccess = exerciseData => ({
  type: ADD_EXERCISE_DATA_SUCCESS,
  exerciseData
});

export const ADD_DATA_ERROR = 'ADD_DATA_ERROR';
export const addDataError = error => ({
  type: ADD_DATA_ERROR,
  error
});

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const clearError = () => ({
  type: CLEAR_ERROR,
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
export const DELETE_DATA_START = 'DELETE_DATA_START';
export const deleteDataStart = () => ({
  type: DELETE_DATA_START
});

export const DELETE_NUTRITION_DATA_SUCCESS = 'DELETE_NUTRITION_DATA_SUCCESS';
export const deleteNutritionDataSuccess = id => ({
  type: DELETE_NUTRITION_DATA_SUCCESS,
  id
});

export const DELETE_EXERCISE_DATA_SUCCESS = 'DELETE_EXERCISE_DATA_SUCCESS';
export const deleteExerciseDataSuccess = id => ({
  type: DELETE_EXERCISE_DATA_SUCCESS,
  id
});

export const DELETE_DATA_ERROR = 'DELETE_DATA_ERROR';
export const deleteDataError = error => ({
  type: DELETE_DATA_ERROR,
  error
})

export const RESET_DELETE = 'RESET_DELETE';
export const resetDelete = () => ({
  type: RESET_DELETE
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
