import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {beginNowReducer} from './reducers/begin-now';
import {nutritionSearchReducer} from './reducers/nutrition-search';
import {exerciseSearchReducer} from './reducers/exercise-search';

const store = createStore(
  combineReducers({
    begin: beginNowReducer, 
    nutrition: nutritionSearchReducer,
    exercise: exerciseSearchReducer
  }),
  applyMiddleware(thunk)
);

export default store;