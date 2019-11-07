import {API_BASE_URL} from '../config';
import { postData } from '../utility';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const createUserRequest = () => ({
  type: CREATE_USER_REQUEST
});

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const createUserSuccess = user => ({
  type: CREATE_USER_SUCCESS,
  user
});

export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const createUserError = error => ({
  type: CREATE_USER_ERROR,
  error
});

export const CLEAR_CREATE_USER_ERROR = 'CLEAR_CREATE_USER_ERROR';
export const clearCreateUserError = () => ({
  type: CLEAR_CREATE_USER_ERROR
});

export const registerUser = user => dispatch => {
  dispatch(createUserRequest());
  postData(
    `${API_BASE_URL}/users`,
    JSON.stringify(user),
    res => {
      console.log('register user successful', res);
      dispatch(createUserSuccess(res));
    },
    err => {
      const {code, reason, message, location} = err.data;
      console.log('register user fail', code, reason, message, location);
      dispatch(createUserError(err));
    }
  );
};