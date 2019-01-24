import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {nutritionSearchReducer} from './reducers/nutrition-search';
import {exerciseSearchReducer} from './reducers/exercise-search';
import {protectedDataReducer} from './reducers/protected-data';
import {reducer as formReducer} from 'redux-form';
import authReducer from './reducers/auth';

const store = createStore(
  combineReducers({
    nutrition: nutritionSearchReducer,
    exercise: exerciseSearchReducer,
    form: formReducer,
    auth: authReducer,
    protected: protectedDataReducer
  }),
  applyMiddleware(thunk)
);

export default store;