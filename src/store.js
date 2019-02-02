import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {nutritionSearchReducer} from './reducers/nutrition-search';
import {exerciseSearchReducer} from './reducers/exercise-search';
import {protectedDataReducer} from './reducers/protected-data';
import {reducer as formReducer} from 'redux-form';
import authReducer from './reducers/auth';
import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';

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

// With the JWT stored, for persistance to work is to reload the token when the application loads
// this is done in the store
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;