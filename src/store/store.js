import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {searchReducer} from './reducers/search';
import {protectedDataReducer} from './reducers/protected-data';
import {createUser} from './reducers/users';
import authReducer from './reducers/auth';
import {loadAuthToken} from '../local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    searchReducer : searchReducer,
    authReducer : authReducer,
    protected : protectedDataReducer,
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