import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR,
  ADD_PROTECTED_DATA,
  DELETE_NUTRITION_DATA_START,
  DELETE_NUTRITION_DATA_SUCCESS,
  DELETE_NUTRITION_DATA_ERROR,
  RESET_NUTRITION_DELETE
} from '../actions/protected-data';
import { updateObject } from '../utility';

const initialState = {
  protected_data: '',
  deleteStart: false,
  deleteFinish: false,
  loading: false,
  error: null
}

const fetchProtectedDataSuccess = (state, action) => {
  return updateObject(state, {
    protected_data: action.data.sort((a, b) => a.created > b.created ? -1 : a.created < b.created ? 1 : 0),
    loading: false,
    error: null
  });
};

const addProtectedData = (state, action) => {
  return updateObject(state, {
      // Not directly altering state, can't do that in react/redux
      // Taking copy of all contents within state.protected_data & including action.addedProtectedData
      protected_data: [...state.protected_data, action.addedProtectedData],
      loading: false,
      error: null
  });
};

const deleteNutritionDataStart = (state, action) => {
  return updateObject(state, {
    deleteStart: true,
    deleteFinish: false
  });
};

const deleteNutritionDataSuccess = (state, action) => {
  return updateObject(state, {
    protected_data: state.protected_data.filter(nutrition => nutrition._id !== action.id),
    deleteStart: false,
    deleteFinish: true,
    loading: false,
    error: null
  });
};

const deleteNutritionDataError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    deleteStart: false,
    deleteFinish: false
  })
}

const resetNutritionDelete = (state, action) => {
  return updateObject(state, {
    deleteStart: false,
    deleteFinish: false
  });
};

const fetchProtectedDataError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

export function protectedDataReducer(state=initialState, action) {
  switch(action.type) {
    case FETCH_PROTECTED_DATA_SUCCESS : return fetchProtectedDataSuccess(state, action);
    case ADD_PROTECTED_DATA : return addProtectedData(state, action);
    case DELETE_NUTRITION_DATA_START : return deleteNutritionDataStart(state, action);
    case DELETE_NUTRITION_DATA_SUCCESS : return deleteNutritionDataSuccess(state, action);
    case DELETE_NUTRITION_DATA_ERROR : return deleteNutritionDataError(state, action);
    case RESET_NUTRITION_DELETE : return resetNutritionDelete(state, action);
    case FETCH_PROTECTED_DATA_ERROR : return fetchProtectedDataError(state, action);
    default : return state;
  }
}