import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR
} from '../actions/auth';
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
    case SET_AUTH_TOKEN : return setAuthToken(state, action);
    case CLEAR_AUTH : return clearAuth(state, action);
    case AUTH_REQUEST : return authRequest(state, action);
    case AUTH_SUCCESS : return authSuccess(state, action);
    case AUTH_ERROR : return authError(state, action);
    case CLEAR_AUTH_ERROR : return clearAuthError(state, action);
    default : return state;
  }
}