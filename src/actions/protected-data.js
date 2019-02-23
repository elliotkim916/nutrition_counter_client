import {API_BASE_URL} from '../config.js';
import {normalizeResponseErrors} from './utils';

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
  const authToken = getState().authReducer.authToken;
  const username = getState().authReducer.currentUser.username;
  return fetch(`${API_BASE_URL}/nutrition/${username}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  // why is it {data}? because we are using object destructuring , if we weren't object destructuring we would get 
  // .then(res => dispatch(fetchProtectedDataSuccess(res.data)))
  .then(data => dispatch(fetchProtectedDataSuccess(data)))
  .catch(err => fetchProtectedDataError(err));
}

// order of dispatch, getState is important because in redux thunk, the second parameter in the async action,
// the first parameter is for dispatch, and the second is for getState
export const addProtectedData = (nutrition_object, username, date) => (dispatch, getState) => {
  // why when doing object destructuring, do the keys have to match my actual object?
  const {nf_calories, nf_total_fat, nf_total_carbohydrate, nf_protein, nf_sugars, nf_sodium} = nutrition_object;
  const authToken = getState().authReducer.authToken;
  const data = JSON.stringify({
    calories: nf_calories,
    fat: nf_total_fat,
    carbs: nf_total_carbohydrate,
    protein: nf_protein,
    sugar: nf_sugars,
    sodium: nf_sodium,
    created: date,
    username: username
  });
  const headers = {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': `application/json`
  };
 
  return fetch(`${API_BASE_URL}/nutrition/${username}`, {
    headers,
    method: 'POST',
    body: data
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(addProtectedDataSuccess(data)))
  .catch(err => dispatch(fetchProtectedDataError(err)));
}

export const deleteData = id => (dispatch, getState) => {
  const authToken = getState().authReducer.authToken;
  const headers = {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': `application/json`
  };

  return fetch(`${API_BASE_URL}/nutrition/${id}`, {
    headers,
    method: 'DELETE'
  })
  .then(() => dispatch(deleteProtectedData(id)))
  .catch(err => dispatch(fetchProtectedDataError(err)))
}
