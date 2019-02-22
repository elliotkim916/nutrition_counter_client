import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR,
  ADD_PROTECTED_DATA,
  DELETE_PROTECTED_DATA
} from '../actions/protected-data';

const initialState = {
  protected_data: '',
  loading: false,
  error: null
}

// state is immutable in react/redux
// directly modifying vs making a copy
export function protectedDataReducer(state=initialState, action) {
  if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {  
    return Object.assign({}, state, {
      protected_data: action.data,
      loading: false,
      error: null
    });
  } else if (action.type === ADD_PROTECTED_DATA) {
    console.log(state);
    return Object.assign({}, state, {
      protected_data: [...state.protected_data, action.addedProtectedData],
      loading: false,
      error: null
    });
  } else if (action.type === DELETE_PROTECTED_DATA) {
    // Why are we using state.protected_data?
    return Object.assign({}, state, {
      protected_data: state.protected_data.filter(nutrition => nutrition._id !== action.id),
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