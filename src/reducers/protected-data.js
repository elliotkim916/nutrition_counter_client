import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR,
  ADD_PROTECTED_DATA
} from '../actions/protected-data';

const initialState = {
  protected_data: [],
  loading: false,
  error: null
}

export function protectedDataReducer(state=initialState, action) {
  console.log(state);
  if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
    return Object.assign({}, state, {
      protected_data: action.data,
      loading: false,
      error: null
    });
  } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      loading: false,
    });
  } else if (action.type === ADD_PROTECTED_DATA) {
    return Object.assign({}, state, {
      protected_data: state.protected_data.push(action.addedProtectedData),
      loading: false,
      error: null
    });
  }
  return state;
}