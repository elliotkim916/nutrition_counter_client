import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR
} from '../actions/protected-data';

const initialState = {
  loading: false,
  error: null,
  protected_data: ''
}

export default function protectedDataReducer(state=initialState, action) {
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
  }
  return state;
}