import {API_BASE_URL} from '../config';
import jwtDecode from 'jwt-decode';
import {saveAuthToken, clearAuthToken} from '../local-storage';
import { postData } from '../utility';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
  type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
  type: AUTH_ERROR,
  error
});

export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';
export const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR
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