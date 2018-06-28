import { createHashHistory } from 'history';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import usersReducer from './usersReducer';

export const history = createHashHistory();

export const store = createStore(
  connectRouter(history)(combineReducers({ usersReducer })),
  // eslint-disable-next-line
  compose(applyMiddleware(thunk, routerMiddleware(history)) , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);
