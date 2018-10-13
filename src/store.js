import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {nutritionSearchReducer} from './reducers/nutrition-search';
import {exerciseSearchReducer} from './reducers/exercise-search';

const store = createStore(
  combineReducers({
    nutrition: nutritionSearchReducer,
    exercise: exerciseSearchReducer
  }),
  applyMiddleware(thunk)
);

export default store;