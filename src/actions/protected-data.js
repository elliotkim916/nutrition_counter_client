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

export const fetchProtectedData = () => (getState, dispatch) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/protected`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  // why is it {data} ? because we are using object destructuring , if we weren't object destructuring we would get 
  // .then(res => dispatch(fetchProtectedDataSuccess(res.data)))
  .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
  // why do some have { } and some dont?
  .catch(err => {
    fetchProtectedDataError(err)
  });
}

