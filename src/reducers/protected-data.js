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

export function protectedDataReducer(state=initialState, action) {
  if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {  
    return Object.assign({}, state, {
      protected_data: action.data.sort((a, b) => a.created > b.created ? -1 : a.created < b.created ? 1 : 0),
      loading: false,
      error: null
    });
  } else if (action.type === ADD_PROTECTED_DATA) {
    return Object.assign({}, state, {
      // Not directly altering state, can't do that in react/redux
      // Taking copy of all contents within state.protected_data & including action.addedProtectedData
      protected_data: [...state.protected_data, action.addedProtectedData],
      loading: false,
      error: null
    });
  } else if (action.type === DELETE_PROTECTED_DATA) {
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