import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  nutritionData: null,
  exerciseData: null,
  addSuccess: false,
  deleteStart: false,
  deleteFinish: false,
  loading: false,
  error: null
}

const getNutritionDataSuccess = (state, action) => {
  return updateObject(state, {
    nutritionData: action.data.sort((a, b) => a.created > b.created ? -1 : a.created < b.created ? 1 : 0),
    loading: false,
    error: null
  });
};

const getExerciseDataSuccess = (state, action) => {
  return updateObject(state, {
    exerciseData: action.data.sort((a, b) => a.created > b.created ? -1 : a.created < b.created ? 1 : 0),
    loading: false,
    error: null
  })
}

const addNutritionData = (state, action) => {
  return updateObject(state, {
      nutritionData: [...state.protected_data, action.addedProtectedData],
      loading: false,
      error: null
  });
};

const addExerciseData = (state, action) => {
  return updateObject(state, {
    exerciseData: [...state.exerciseData, action.exerciseData],
    loading: false,
    error: null
  });
};

const deleteDataStart = (state, action) => {
  return updateObject(state, {
    deleteStart: true,
    deleteFinish: false
  });
};

const deleteNutritionDataSuccess = (state, action) => {
  return updateObject(state, {
    nutritionData: state.nutritionData.filter(nutrition => nutrition._id !== action.id),
    deleteStart: false,
    deleteFinish: true,
    loading: false,
    error: null
  });
};

const deleteExerciseDataSuccess = (state, action) => {
  return updateObject(state, {
    exerciseData: state.exerciseData.filter(exercise => exercise._id !== action.id),
    deleteStart: false,
    deleteFinish: true,
    loading: false,
    error: null
  });
}

const resetDelete = (state, action) => {
  return updateObject(state, {
    deleteStart: false,
    deleteFinish: false
  });
};

const dataError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    deleteStart: false,
    deleteFinish: false
  });
};

const clearError = (state, action) => {
  return updateObject(state, {
    error: null
  });
};

export function protectedDataReducer(state=initialState, action) {
  switch(action.type) {
    case actionTypes.GET_NUTRITION_DATA_SUCCESS : return getNutritionDataSuccess(state, action);
    case actionTypes.GET_EXERCISE_DATA_SUCCESS : return getExerciseDataSuccess(state, action);
    case actionTypes.ADD_NUTRITION_DATA_SUCCESS : return addNutritionData(state, action);
    case actionTypes.ADD_EXERCISE_DATA_SUCCESS : return addExerciseData(state, action);
    case actionTypes.ADD_DATA_ERROR : return dataError(state, action);
    case actionTypes.DELETE_DATA_START : return deleteDataStart(state, action);
    case actionTypes.DELETE_NUTRITION_DATA_SUCCESS : return deleteNutritionDataSuccess(state, action);
    case actionTypes.DELETE_EXERCISE_DATA_SUCCESS : return deleteExerciseDataSuccess(state, action);
    case actionTypes.DELETE_DATA_ERROR : return dataError(state, action);
    case actionTypes.RESET_DELETE : return resetDelete(state, action);
    case actionTypes.GET_DATA_ERROR : return dataError(state, action);
    case actionTypes.CLEAR_ERROR : return clearError(state, action);
    default : return state;
  }
}