import { combineReducers } from 'redux';
import { someActionToReducer, otherActionToReducer } from '../actions';

/**
 * Helper function for mapping reducer function to their type.
 * */
function applyReducers(reducers, state, action) {
  if (Object.prototype.hasOwnProperty.call(reducers, action.type)) {
    return reducers[action.type](state, action);
  }
  return state;
}

export const combinedReducers = {
  someAction: (state = {}, action) => applyReducers(someActionToReducer, state, action),
  otherAction: (state = {}, action) => applyReducers(otherActionToReducer, state, action),
};

const exampleApp = combineReducers(combinedReducers);

export default exampleApp;
