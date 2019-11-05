import {API_BASE_URL} from '../config.js';
import { getData, postData, removeData } from '../utility.js';


export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
  type: FETCH_PROTECTED_DATA_SUCCESS,
  data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
  type: FETCH_PROTECTED_DATA_ERROR,
  error
});

export const ADD_PROTECTED_DATA = 'ADD_PROTECTED_DATA';
export const addProtectedDataSuccess = addedProtectedData => ({
  type: ADD_PROTECTED_DATA,
  addedProtectedData
});

export const DELETE_PROTECTED_DATA = 'DELETE_PROTECTED_DATA';
export const deleteProtectedData = id => ({
  type: DELETE_PROTECTED_DATA,
  id
});

export const fetchProtectedData = () => (dispatch, getState) => {
  const username = getState().authReducer.currentUser.username;

  getData(
    `${API_BASE_URL}/nutrition/${username}`,
    res => {
      console.log('fetch protected data success', res);
      dispatch(fetchProtectedDataSuccess(res))
    },
    err => {
      console.log('fetch protected data fail', err);
      dispatch(fetchProtectedDataError(err))
    }   
  )
}

export const addProtectedData = (nutrition_object, date) => (dispatch, getState) => {
  const username = getState().authReducer.currentUser.username;
  const {food_name, nf_calories, nf_total_fat, nf_total_carbohydrate, nf_protein, nf_sugars, nf_sodium} = nutrition_object;
  const data = JSON.stringify({
    food_name : food_name, 
    calories : nf_calories,
    fat : nf_total_fat,
    carbs : nf_total_carbohydrate,
    protein : nf_protein,
    sugar : nf_sugars,
    sodium : nf_sodium,
    created : date,
    username : username
  });

  postData(
    `${API_BASE_URL}/nutrition/${username}`,
    data,
    res => {
      console.log('add protected data success', res)
      dispatch(addProtectedDataSuccess(res));
    },
    err => {
      console.log('add protected data fail', err);
      dispatch(fetchProtectedDataError(err));
    }
  )
}

export const deleteData = id => (dispatch, getState) => {
  removeData(
    `${API_BASE_URL}/nutrition/${id}`,
    res => {
      console.log('delete successful', res);
      dispatch(deleteProtectedData(id));
    },
    err => {
      console.log('delete fail', err);
      dispatch(fetchProtectedDataError(err));
    }
  );
}
