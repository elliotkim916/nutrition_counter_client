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
    console.log('action.data for fetchTest', action.data);
    console.log('state for fetchTest', state);
    // how is action.data an array?
    const fetchTest = Object.assign({}, state, {
      protected_data: action.data,
      loading: false,
      error: null
    });
    console.log('fetchTest is', fetchTest);
    return fetchTest;
  } else if (action.type === ADD_PROTECTED_DATA) {
    console.log('action for addTest', action);
    console.log('state for addTest', state);
    const addTest = Object.assign({}, state, {
      protected_data: state.protected_data.push(action.addedProtectedData),
      loading: false,
      error: null
    });
    console.log('addTest is', addTest);
    return addTest;
  } else if (action.type === DELETE_PROTECTED_DATA) {
    console.log('action for deleteTest', action);
    console.log('state for deleteTest', state);
    // Why are we using state.protected_data?
    const deleteTest = Object.assign({}, state, {
      protected_data: state.protected_data.filter(nutrition => nutrition._id !== action.id),
      loading: false,
      error: null
    });
    console.log('deleteTest is', deleteTest);
    return deleteTest;
  } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      loading: false,
    });
  } 
  return state;
}