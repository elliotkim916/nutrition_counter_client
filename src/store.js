import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {nutritionSearchReducer} from './reducers/nutrition-search';
import {exerciseSearchReducer} from './reducers/exercise-search';
import {reducer as formReducer} from 'redux-form';

const store = createStore(
  combineReducers({
    nutrition: nutritionSearchReducer,
    exercise: exerciseSearchReducer,
    form: formReducer
  }),
  applyMiddleware(thunk)
);

export default store;