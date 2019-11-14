import {API_BASE_URL} from '../../config';
import jwtDecode from 'jwt-decode';
import {saveAuthToken, clearAuthToken} from '../../shared/local-storage';
import { postData } from '../../shared/utility';
import * as actionTypes from './actionTypes';

export const setAuthToken = authToken => ({
  type: actionTypes.SET_AUTH_TOKEN,
  authToken
});

export const clearAuth = () => ({
  type: actionTypes.CLEAR_AUTH
});

export const authRequest = () => ({
  type: actionTypes.AUTH_REQUEST
});

export const authSuccess = currentUser => ({
  type: actionTypes.AUTH_SUCCESS,
  currentUser
});

export const authError = error => ({
  type: actionTypes.AUTH_ERROR,
  error
});

export const clearAuthError = () => ({
  type: actionTypes.CLEAR_AUTH_ERROR
});

const storeAuthInfo = (authToken, dispatch) => {
  // decode turns JWT to object with id, user info, etc
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.user));
  saveAuthToken(authToken);
}

export const login = (username, password) => dispatch => {
  const data = JSON.stringify({username, password});

  dispatch(authRequest());
  postData(
    `${API_BASE_URL}/auth/login`,
    data,
    res => {
      console.log('login successful', res);
      const {authToken} = res;
      storeAuthInfo(authToken, dispatch);
    },
    err => {
      console.log('login fail', err);
      dispatch(authError(err));
    }
  );
}

export const refreshAuthToken = () => (dispatch, getState) => {
  let currentToken;

  dispatch(authRequest());
  postData(
    `${API_BASE_URL}/auth/refresh`,
    null,
    res => {
      console.log('refresh token successful', res);
      const {authToken} = res;
      currentToken = authToken;
      storeAuthInfo(currentToken, dispatch);
    },
    err => {
      console.log('refresh token fail', err);
      dispatch(authError(err));
      dispatch(clearAuth());
      clearAuthToken(currentToken);
    }
  );
}