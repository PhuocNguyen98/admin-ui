import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import postReducer from './reducers/postReducer';
import customerReducer from './reducers/customerReducer';

const reducer = combineReducers({
  posts: postReducer,
  customer: customerReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
