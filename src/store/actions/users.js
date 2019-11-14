import {API_BASE_URL} from '../../config';
import { postData } from '../../shared/utility';
import * as actionTypes from './actionTypes';

export const createUserRequest = () => ({
  type: actionTypes.CREATE_USER_REQUEST
});


export const createUserSuccess = user => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  user
});


export const createUserError = error => ({
  type: actionTypes.CREATE_USER_ERROR,
  error
});


export const clearCreateUserError = () => ({
  type: actionTypes.CLEAR_CREATE_USER_ERROR
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