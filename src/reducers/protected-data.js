import {
  GET_NUTRITION_DATA_SUCCESS,
  GET_EXERCISE_DATA_SUCCESS,
  GET_DATA_ERROR,
  ADD_PROTECTED_DATA,
  DELETE_DATA_START,
  DELETE_NUTRITION_DATA_SUCCESS,
  DELETE_EXERCISE_DATA_SUCCESS,
  DELETE_DATA_ERROR,
  RESET_DELETE
} from '../actions/protected-data';
import { updateObject } from '../shared/utility';

const initialState = {
  nutritionData: '',
  exerciseData: '',
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

const addProtectedData = (state, action) => {
  return updateObject(state, {
      // Not directly altering state, can't do that in react/redux
      // Taking copy of all contents within state.protected_data & including action.addedProtectedData
      nutritionData: [...state.protected_data, action.addedProtectedData],
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

const deleteDataError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    deleteStart: false,
    deleteFinish: false
  })
}

const resetDelete = (state, action) => {
  return updateObject(state, {
    deleteStart: false,
    deleteFinish: false
  });
};

const getDataError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

export function protectedDataReducer(state=initialState, action) {
  switch(action.type) {
    case GET_NUTRITION_DATA_SUCCESS : return getNutritionDataSuccess(state, action);
    case GET_EXERCISE_DATA_SUCCESS : return getExerciseDataSuccess(state, action);
    case ADD_PROTECTED_DATA : return addProtectedData(state, action);
    case DELETE_DATA_START : return deleteDataStart(state, action);
    case DELETE_NUTRITION_DATA_SUCCESS : return deleteNutritionDataSuccess(state, action);
    case DELETE_EXERCISE_DATA_SUCCESS : return deleteExerciseDataSuccess(state, action);
    case DELETE_DATA_ERROR : return deleteDataError(state, action);
    case RESET_DELETE : return resetDelete(state, action);
    case GET_DATA_ERROR : return getDataError(state, action);
    default : return state;
  }
}