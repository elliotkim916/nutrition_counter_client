import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  CLEAR_CREATE_USER_ERROR
} from '../actions/users';
import { updateObject } from '../../shared/utility';

const initialState = {
  user: null,
  loading: false,
  error: null
}

const createUserRequest = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const createUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    user: action.user
  });
};

const createUserError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const clearCreateUserError = (state, action) => {
  return updateObject(state, {
    error: null
  });
};

export function createUser(state=initialState, action) {
  switch(action.type) {
    case CREATE_USER_REQUEST : return createUserRequest(state, action);
    case CREATE_USER_SUCCESS : return createUserSuccess(state, action);
    case CREATE_USER_ERROR : return createUserError(state, action);
    case CLEAR_CREATE_USER_ERROR : return clearCreateUserError(state, action);
    default: return state;
  }
}