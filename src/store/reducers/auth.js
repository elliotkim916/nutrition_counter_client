import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  authToken: null,
  currentUser: null,
  loading: false,
  error: null
};

const setAuthToken = (state, action) => {
  return updateObject(state, {
    authToken: action.authToken,
    loading: false,
    error: null
  });
};

const clearAuth = (state, action) => {
  return updateObject(state, {
    authToken: null,
    currentUser: null
  });
};

const authRequest = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null   
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    currentUser: action.currentUser,
    error: null
  });
};

const authError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const clearAuthError = (state, action) => {
  return updateObject(state, {
    error: null
  });
};

export default function authReducer(state=initialState, action) {
  switch(action.type) {
    case actionTypes.SET_AUTH_TOKEN : return setAuthToken(state, action);
    case actionTypes.CLEAR_AUTH : return clearAuth(state, action);
    case actionTypes.AUTH_REQUEST : return authRequest(state, action);
    case actionTypes.AUTH_SUCCESS : return authSuccess(state, action);
    case actionTypes.AUTH_ERROR : return authError(state, action);
    case actionTypes.CLEAR_AUTH_ERROR : return clearAuthError(state, action);
    default : return state;
  }
}