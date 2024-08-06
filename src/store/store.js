import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import postReducer from './reducers/postReducer';

const reducer = combineReducers({
  posts: postReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;
