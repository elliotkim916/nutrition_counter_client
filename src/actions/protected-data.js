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
export const deleteProtectedData = () => ({
  type: DELETE_PROTECTED_DATA
});

export const fetchProtectedData = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/protected`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  // why is it {data}? because we are using object destructuring , if we weren't object destructuring we would get 
  // .then(res => dispatch(fetchProtectedDataSuccess(res.data)))
  .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
  // why do some have { } and some dont?
  // That is ES6.  If I only need one line of code, dont need curly brackets.
  .catch(err => fetchProtectedDataError(err));
}

export const addProtectedData = (calories, fat, carbs, protein, sugar, sodium, username) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const username = getState().auth.currentUser.username;
  const data = JSON.stringify({
    calories: calories,
    fat: fat,
    carbs: carbs,
    protein: protein,
    sugar: sugar,
    sodium: sodium,
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
