import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {beginNowReducer} from './reducers/begin-now';

const store = createStore(beginNowReducer, applyMiddleware(thunk));

export default store;