import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import {nutritionSearchReducer} from './reducers/nutrition-search';
import {exerciseSearchReducer} from './reducers/exercise-search';
import {protectedDataReducer} from './reducers/protected-data';
import {exerciseDataReducer} from './reducers/protected-exercise-data';
import {createUser} from './reducers/users';
import {reducer as formReducer} from 'redux-form';
import authReducer from './reducers/auth';
import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    nutritionSearchReducer : nutritionSearchReducer,
    exerciseSearchReducer : exerciseSearchReducer,
    authReducer : authReducer,
    form : formReducer,
    protected : protectedDataReducer,
    exerciseDataReducer : exerciseDataReducer,
    createUser : createUser
  }),
  composeEnhancers(applyMiddleware(thunk))
);

// With the JWT stored, for persistance to work is to reload the token when the application loads
// this is done in the store
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;